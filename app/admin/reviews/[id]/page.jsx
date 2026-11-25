"use client";

import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { adminApi, naira, useAdminSession, when } from "@/components/admin/adminClient";
import { AdminShell, HoldStatus, Loading, NameCheck } from "@/components/admin/AdminShell";

function Facts({ pairs }) {
  return (
    <dl className="ad-facts">
      {pairs.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value === null || value === undefined || value === "" ? "—" : value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Notes({ text }) {
  const lines = (text || "").split("\n").filter((l) => l.trim()).reverse();
  if (!lines.length) return <p className="ad-empty">No notes yet.</p>;
  return (
    <ol className="ad-notes">
      {lines.map((line, i) => {
        const match = /^\[([^\]]+)\]\s*(.*)$/.exec(line);
        return (
          <li key={i}>
            <span className="ad-muted">{match ? when(match[1]) : ""}</span>
            {match ? match[2] : line}
          </li>
        );
      })}
    </ol>
  );
}

/** One action: a text box and a button. React escapes everything typed or loaded. */
function Action({ title, hint, placeholder, button, tone = "", required = true, confirmText, onRun }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    const ok = await onRun(text.trim());
    setBusy(false);
    if (ok) setText("");
  }
  return (
    <form className="ad-action" onSubmit={submit}>
      <label>
        {title}
        <textarea rows={2} value={text} placeholder={placeholder} required={required}
                  onChange={(e) => setText(e.target.value)} />
      </label>
      <button type="submit" className={`ba-btn ba-btn--sm ${tone}`} disabled={busy}>{busy ? "Saving..." : button}</button>
      {hint && <p className="ad-hint">{hint}</p>}
    </form>
  );
}

export default function CasePage({ params }) {
  const { id } = use(params);
  const holdId = /^\d+$/.test(id) ? id : null;
  const { session, signOut, guard } = useAdminSession();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!holdId) { setError("That case does not exist."); return; }
    try {
      setFile(await adminApi(`admin/aml/holds/${holdId}`));
      setError("");
    } catch (err) {
      if (!guard(err)) setError(err.message);
    }
  }, [holdId, guard]);

  useEffect(() => { if (session) load(); }, [session, load]);

  function run(path, body, done) {
    return async () => {
      setNotice("");
      try {
        await adminApi(path, { method: "POST", body });
        setNotice(done);
        await load();
        return true;
      } catch (err) {
        if (!guard(err)) setError(err.message);
        return false;
      }
    };
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(file?.rubiesEscalation || "");
      setNotice("Copied. Paste it into your email to Rubies.");
    } catch {
      setNotice("Copy did not work. Select the text and copy it.");
    }
  }

  if (!session) return <Loading label="Checking your sign-in..." />;

  const hold = file?.hold || {};
  const customer = file?.customer || {};
  const wallet = file?.wallet || {};
  const open = hold.status === "ACTIVE" || hold.status === "ESCALATED";
  const frozen = wallet.status === "FROZEN";
  const mailto = `mailto:support@rubies.ng?subject=${encodeURIComponent(
    `Wisemonie payment review: account ${wallet.accountNumber || hold.userId || ""}`)}&body=${encodeURIComponent(file?.rubiesEscalation || "")}`;

  return (
    <AdminShell session={session} onSignOut={signOut}>
      <Link href="/admin/reviews" className="ad-back">← All reviews</Link>
      {error && <div className="ba-error">{error}</div>}
      {notice && <div className="ad-info">{notice}</div>}
      {!file && !error && <Loading />}

      {file && (
        <>
          <div className="ad-head">
            <div>
              <h1>{customer.name || `User ${hold.userId}`} · Hold #{hold.id}</h1>
              <p className="ad-muted">
                Opened {when(hold.startedAt)} · {naira(hold.inflowTotal24h)} received in 24h against a {naira(hold.thresholdUsed)} threshold
              </p>
            </div>
            <div className="ad-badges">
              <HoldStatus row={{ ...hold, walletStatus: wallet.status }} />
              <NameCheck result={hold.nameCheck} />
            </div>
          </div>

          <div className="ad-grid3">
            <section className="ad-card">
              <h2>Customer</h2>
              <Facts pairs={[["Name", customer.name], ["Email", customer.email], ["Phone", customer.phone],
                ["User id", customer.userId], ["Signed up", when(customer.signedUpAt)]]} />
            </section>
            <section className="ad-card">
              <h2>Wallet</h2>
              <Facts pairs={[["Account", wallet.accountNumber], ["Balance", naira(wallet.balance)],
                ["Status", wallet.status], ["Opened", when(wallet.openedAt)]]} />
            </section>
            <section className="ad-card">
              <h2>Hold</h2>
              <Facts pairs={[
                ["Sent so far", `${naira(hold.outflowUsed)} of ${naira(hold.outflowCap)}`],
                ["Customer contact", hold.customerContactedAt ? when(hold.customerContactedAt) : "Not yet"],
                ["Escalated", hold.escalatedAt ? when(hold.escalatedAt) : "No"],
                ["Rubies told", hold.rubiesNotifiedAt ? when(hold.rubiesNotifiedAt) : "No"],
                ["Released", hold.releasedAt ? `${when(hold.releasedAt)} by ${hold.releasedBy || "—"}` : "No"],
                ["Release reason", hold.releaseReason]]} />
            </section>
          </div>

          <section className="ad-card">
            <h2>Credits on this hold</h2>
            <div className="ba-table-wrap">
              <table className="ba-table ad-table">
                <thead>
                  <tr><th>Received</th><th className="num">Amount</th><th>Sender</th><th>Bank</th><th>Account</th><th>Name check</th><th>Reference</th></tr>
                </thead>
                <tbody>
                  {(file.credits || []).map((c) => (
                    <tr key={c.id}>
                      <td className="ad-nowrap">{when(c.receivedAt)}</td>
                      <td className="num">{naira(c.amount)}</td>
                      <td>{c.senderName || "—"}{c.internal && <span className="ad-sub">Wisemonie customer</span>}</td>
                      <td>{c.senderBank || "—"}</td>
                      <td>{c.senderAccount || "—"}</td>
                      <td><NameCheck result={c.nameCheck} /></td>
                      <td>{c.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="ad-grid2">
            <section className="ad-card">
              <h2>Actions</h2>
              {open && (
                <Action title="Customer got in touch" placeholder="What they said, and any evidence they sent"
                        button="Record contact" hint="Stops the 24-hour silence escalation."
                        onRun={(note) => run(`admin/aml/holds/${hold.id}/contact`, { note }, "Contact recorded.")()} />
              )}
              <Action title="Note" button="Add note"
                      onRun={(note) => run(`admin/aml/holds/${hold.id}/note`, { note }, "Note added.")()} />
              {open && (
                <Action title="Release the hold" button="Release" tone="ba-btn--primary"
                        placeholder="Why it is safe: who sent it, what evidence you checked"
                        hint="Their usual limits come back and they are told the review is complete."
                        confirmText={`Release the hold for ${customer.name || "this customer"}? Their usual limits come back straight away.`}
                        onRun={(reason) => run(`admin/aml/holds/${hold.id}/release`, { reason }, "Hold released. The customer has been told.")()} />
              )}
              {open && hold.status !== "ESCALATED" && (
                <Action title="Escalate to Rubies" button="Escalate" tone="ad-btn-warn" required={false}
                        placeholder="Optional note" hint="The hold stays on. Then tell Rubies and mark it told."
                        confirmText="Mark this case as escalated? The hold stays on."
                        onRun={(note) => run(`admin/aml/holds/${hold.id}/escalate`, { note }, "Escalated. Now tell Rubies.")()} />
              )}
              {hold.status === "ESCALATED" && !hold.rubiesNotifiedAt && (
                <Action title="Rubies has been told" button="Mark Rubies told" tone="ba-btn--primary" required={false}
                        placeholder="Optional: who you emailed, ticket number"
                        hint="Takes the case off the Tell Rubies list. The hold stays."
                        onRun={(note) => run(`admin/aml/holds/${hold.id}/rubies-informed`, { note }, "Marked as told.")()} />
              )}
              <Action title={frozen ? "Unfreeze the wallet" : "Freeze the wallet"} button={frozen ? "Unfreeze" : "Freeze"}
                      tone={frozen ? "" : "ba-btn--danger"} placeholder="Reason"
                      hint={frozen ? "Transfers can leave again. Any open hold still applies."
                        : "Nothing can leave the wallet until it is unfrozen. Money can still come in."}
                      confirmText={frozen ? "Unfreeze this wallet?" : "Freeze this wallet? Nothing can leave until someone unfreezes it."}
                      onRun={(reason) => run(`admin/aml/users/${hold.userId}/${frozen ? "unfreeze" : "freeze"}`,
                        { reason }, frozen ? "Wallet unfrozen." : "Wallet frozen.")()} />
            </section>

            <div>
              <section className="ad-card">
                <h2>For Rubies</h2>
                <p className="ad-hint">Send to support@rubies.ng. Never share it with the customer.</p>
                <pre className="ad-pre">{file.rubiesEscalation}</pre>
                <div className="ad-row-buttons">
                  <button type="button" className="ba-btn ba-btn--sm" onClick={copyText}>Copy</button>
                  <a className="ba-btn ba-btn--sm" href={mailto}>Open in email</a>
                </div>
              </section>
              <section className="ad-card">
                <h2>History</h2>
                <Notes text={hold.notes} />
              </section>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
