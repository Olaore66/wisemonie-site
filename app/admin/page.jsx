"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { adminApi, age, naira, useAdminSession, when } from "@/components/admin/adminClient";
import { AdminShell, Badge, Loading, NameCheck } from "@/components/admin/AdminShell";

const REFRESH_MS = 60000;

function Tile({ label, count, tone, href }) {
  return (
    <a className={`ad-tile ad-tile--${count ? tone : "calm"}`} href={href}>
      <span className="ad-tile__count">{count ?? "—"}</span>
      <span className="ad-tile__label">{label}</span>
    </a>
  );
}

function HoldRows({ rows, extra, empty }) {
  if (!rows?.length) return <p className="ad-empty">{empty}</p>;
  return (
    <ul className="ad-rows">
      {rows.map((row) => (
        <li key={row.id}>
          <Link href={`/admin/reviews/${row.id}`} className="ad-row">
            <span className="ad-row__main">
              <strong>{row.customerName || `User ${row.userId}`}</strong>
              <span className="ad-muted">{naira(row.inflowTotal24h)} in 24h · held {age(row.hoursOpen)}</span>
            </span>
            <span className="ad-row__side">
              <NameCheck result={row.nameCheck} />
              {extra && extra(row)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function AdminDashboard() {
  const { session, signOut, guard } = useAdminSession();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(null);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await adminApi("admin/aml/todos"));
      setError("");
    } catch (err) {
      if (!guard(err)) setError(err.message);
    }
  }, [guard]);

  useEffect(() => {
    if (!session) return undefined;
    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => clearInterval(timer);
  }, [session, load]);

  async function retryWallet(row) {
    setRetrying(row.userId);
    setNotice("");
    try {
      const result = await adminApi(`admin/aml/wallets/${row.userId}/retry`, { method: "POST" });
      setNotice(`Wallet opened for ${row.customerName || `user ${row.userId}`}: ${result.accountNumber}.`);
      await load();
    } catch (err) {
      if (!guard(err)) setNotice(`Still failing: ${err.message}`);
    } finally {
      setRetrying(null);
    }
  }

  if (!session) return <Loading label="Checking your sign-in..." />;
  const counts = data?.counts || {};

  return (
    <AdminShell session={session} onSignOut={signOut}>
      <div className="ad-head">
        <div>
          <h1>To-dos</h1>
          <p className="ad-muted">Payment reviews and wallets that need someone. Refreshes every minute.</p>
        </div>
        <button type="button" className="ba-btn ba-btn--sm" onClick={load}>Refresh</button>
      </div>

      {error && <div className="ba-error">{error}</div>}
      {notice && <div className="ad-info">{notice}</div>}
      {!data && !error && <Loading />}

      {data && (
        <>
          <div className="ad-tiles">
            <Tile label="Tell Rubies" count={counts.informRubies} tone="danger" href="#tell-rubies" />
            <Tile label="Decide now" count={counts.reviewNow} tone="warn" href="#decide" />
            <Tile label="Waiting on customer" count={counts.waitingOnCustomer} tone="info" href="#waiting" />
            <Tile label="Wallets to fix" count={counts.walletsToFix} tone="warn" href="#wallets" />
            <Tile label="Frozen wallets" count={counts.frozenWallets} tone="info" href="#frozen" />
          </div>

          <div className="ad-columns">
            <section className="ad-card" id="tell-rubies">
              <h2>Tell Rubies</h2>
              <p className="ad-hint">Escalated cases. Send Rubies the case text, then mark it told.</p>
              <HoldRows rows={data.informRubies} empty="Nothing to send to Rubies."
                        extra={(row) => <Badge tone="danger">{row.escalatedAt ? `Escalated ${when(row.escalatedAt)}` : "Escalated"}</Badge>} />
            </section>

            <section className="ad-card" id="decide">
              <h2>Decide now</h2>
              <p className="ad-hint">The customer got in touch. Check their evidence, then release or escalate.</p>
              <HoldRows rows={data.reviewNow} empty="No cases waiting for a decision."
                        extra={(row) => <Badge tone="ok">Contacted {when(row.customerContactedAt)}</Badge>} />
            </section>

            <section className="ad-card" id="waiting">
              <h2>Waiting on customer</h2>
              <p className="ad-hint">No word yet. These escalate on their own when the time runs out.</p>
              <HoldRows rows={data.waitingOnCustomer} empty="No one to wait on."
                        extra={(row) => (
                          <Badge tone={row.hoursUntilEscalation <= 4 ? "warn" : "plain"}>
                            {row.hoursUntilEscalation}h left
                          </Badge>
                        )} />
            </section>

            <section className="ad-card" id="wallets">
              <h2>Wallets to fix</h2>
              <p className="ad-hint">Verified BVN, but the bank keeps refusing to open the account. Fix the cause, then try again.</p>
              {!data.walletsToFix?.length ? (
                <p className="ad-empty">No failed wallet openings.</p>
              ) : (
                <ul className="ad-rows">
                  {data.walletsToFix.map((row) => (
                    <li key={row.userId} className="ad-row ad-row--static">
                      <span className="ad-row__main">
                        <strong>{row.customerName || `User ${row.userId}`}</strong>
                        <span className="ad-muted">{row.email}</span>
                        <span className="ad-reason">{row.lastError || "Reason not recorded"}</span>
                      </span>
                      <span className="ad-row__side">
                        <Badge tone={row.attempts >= 5 ? "danger" : "warn"}>{row.attempts} tries</Badge>
                        <button type="button" className="ba-btn ba-btn--sm" disabled={retrying === row.userId}
                                onClick={() => retryWallet(row)}>
                          {retrying === row.userId ? "Trying..." : "Try again"}
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="ad-card" id="frozen">
              <h2>Frozen wallets</h2>
              <p className="ad-hint">Nothing can leave these until someone unfreezes them from the case.</p>
              {!data.frozenWallets?.length ? (
                <p className="ad-empty">No frozen wallets.</p>
              ) : (
                <ul className="ad-rows">
                  {data.frozenWallets.map((row) => (
                    <li key={row.userId} className="ad-row ad-row--static">
                      <span className="ad-row__main">
                        <strong>{row.customerName || `User ${row.userId}`}</strong>
                        <span className="ad-muted">{row.accountNumber} · {naira(row.balance)}</span>
                      </span>
                      <span className="ad-row__side"><Badge>Since {when(row.since)}</Badge></span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </AdminShell>
  );
}
