"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, naira, useAdminSession, when } from "@/components/admin/adminClient";
import { AdminShell, Badge, Loading } from "@/components/admin/AdminShell";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_SECONDS = 30;

function day(value) {
  if (!value) return "—";
  const d = new Date(Array.isArray(value) ? Date.UTC(value[0], value[1] - 1, value[2]) : String(value));
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BudgetsPage() {
  const { session, signOut, guard } = useAdminSession();
  const [email, setEmail] = useState("");
  const [lookedUp, setLookedUp] = useState("");
  const [result, setResult] = useState(null);
  const [finding, setFinding] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const resetCancel = useCallback(() => {
    setReason("");
    setCode("");
    setCodeSent(false);
    setCooldown(0);
  }, []);

  const find = useCallback(async (target) => {
    const clean = target.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) {
      setError("Enter a valid email.");
      return;
    }
    setFinding(true);
    setError("");
    setNotice("");
    setSelected(null);
    resetCancel();
    try {
      setResult(await adminApi(`admin/budgets?email=${encodeURIComponent(clean)}`));
      setLookedUp(clean);
    } catch (err) {
      setResult(null);
      if (!guard(err)) setError(err.message);
    } finally {
      setFinding(false);
    }
  }, [guard, resetCancel]);

  function pick(budget) {
    if (budget.blockers?.length) return;
    setSelected(budget);
    setError("");
    setNotice("");
    resetCancel();
  }

  async function sendCode() {
    if (!selected) return;
    if (reason.trim().length < 5) {
      setError("Write a short reason first (at least 5 characters).");
      return;
    }
    setWorking(true);
    setError("");
    try {
      const res = await adminApi(`admin/budgets/${selected.id}/cancel/code`, { method: "POST" });
      setCodeSent(true);
      setCooldown(RESEND_SECONDS);
      setNotice(res.message || "We emailed you a code.");
    } catch (err) {
      if (!guard(err)) setError(err.message);
    } finally {
      setWorking(false);
    }
  }

  async function confirmCancel() {
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setWorking(true);
    setError("");
    setNotice("");
    try {
      const res = await adminApi(`admin/budgets/${selected.id}/cancel`, {
        method: "POST",
        body: { code, reason: reason.trim() },
      });
      const done = `Cancelled "${res.budgetName}". ${naira(res.refunded)} went back to ${res.customerEmail}'s wallet.`;
      await find(lookedUp);
      setNotice(done);
    } catch (err) {
      if (!guard(err)) setError(err.message);
    } finally {
      setWorking(false);
    }
  }

  if (!session) return <Loading label="Checking your sign-in..." />;

  const customer = result?.customer;
  const active = result?.budgets || [];

  return (
    <AdminShell session={session} onSignOut={signOut}>
      <div className="ad-head">
        <div>
          <h1>Cancel a budget</h1>
          <p className="ad-muted">Find a customer by email, pick an active budget, and confirm with a code we email you.</p>
        </div>
      </div>

      <form className="ad-toolbar" onSubmit={(e) => { e.preventDefault(); find(email); }}>
        <input type="search" placeholder="Customer email" value={email} aria-label="Customer email"
               autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="ba-btn ba-btn--primary ba-btn--sm" disabled={finding}>
          {finding ? "Finding..." : "Find"}
        </button>
      </form>

      {notice && <div className="ad-info" role="status">{notice}</div>}
      {error && <div className="ba-error" role="alert">{error}</div>}

      {customer && (
        <div className="bg-layout">
          <div>
            <section className="ad-card">
              <h2>Customer</h2>
              <p className="bg-customer">
                <strong>{customer.name || "No name on file"}</strong>
                <span className="ad-muted">{customer.email} · user {customer.id}</span>
              </p>
            </section>

            <section className="ad-card">
              <h2>Active budgets</h2>
              {active.length === 0 ? <p className="ad-empty">No active budgets.</p> : (
                <div className="bg-list" role="radiogroup" aria-label="Active budgets">
                  {active.map((b) => {
                    const blocked = b.blockers?.length > 0;
                    const on = selected?.id === b.id;
                    return (
                      <button key={b.id} type="button" role="radio" aria-checked={on} disabled={blocked}
                              className={`bg-item${on ? " is-on" : ""}${blocked ? " is-blocked" : ""}`}
                              onClick={() => pick(b)}>
                        <span className="bg-item__top">
                          <strong>{b.name}</strong>
                          <span className="ad-muted">#{b.id}</span>
                        </span>
                        <span className="bg-item__facts">
                          <span>{naira(b.totalAmount)} budget</span>
                          <span>{b.envelopes} envelope{b.envelopes === 1 ? "" : "s"}</span>
                          <span>{day(b.startDate)} to {day(b.endDate)}</span>
                        </span>
                        <span className="bg-item__refund">
                          {blocked ? <Badge tone="warn">Can&apos;t cancel yet</Badge>
                            : <>{naira(b.refundable)} goes back to their wallet</>}
                        </span>
                        {blocked && b.blockers.map((r) => <span key={r} className="ad-reason">{r}</span>)}
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            {result.recentCancellations?.length > 0 && (
              <section className="ad-card">
                <h2>Cancelled by admins before</h2>
                <ul className="ad-notes">
                  {result.recentCancellations.map((c) => (
                    <li key={c.id}>
                      <strong>{c.budgetName || `Budget ${c.budgetId}`}</strong> · {naira(c.refundedAmount)} refunded
                      <span className="ad-muted">{when(c.createdAt)} by {c.adminEmail}: {c.reason}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="ad-card bg-confirm" aria-live="polite">
            <h2>Cancel</h2>
            {!selected ? (
              <p className="ad-empty">Pick an active budget to cancel.</p>
            ) : (
              <>
                <p className="bg-summary">
                  Cancel <strong>{selected.name}</strong> (#{selected.id}).{" "}
                  <strong>{naira(selected.refundable)}</strong> goes back to {customer.email}&apos;s wallet. This can&apos;t be undone.
                </p>
                <div className="nt-field">
                  <label htmlFor="bg-reason">Reason <span className="ad-muted">kept in the audit record</span></label>
                  <textarea id="bg-reason" rows={3} maxLength={500} value={reason} disabled={codeSent}
                            placeholder="For example: customer asked to stop this budget"
                            onChange={(e) => setReason(e.target.value)} />
                </div>
                {!codeSent ? (
                  <button type="button" className="ba-btn ba-btn--primary bg-wide" disabled={working} onClick={sendCode}>
                    {working ? "Sending..." : "Email me a code"}
                  </button>
                ) : (
                  <>
                    <div className="nt-field">
                      <label htmlFor="bg-code">Code from your email</label>
                      <input id="bg-code" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                             value={code} placeholder="6 digits"
                             onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} />
                    </div>
                    <button type="button" className="ba-btn ba-btn--danger bg-wide" disabled={working || code.length !== 6}
                            onClick={confirmCancel}>
                      {working ? "Cancelling..." : "Cancel budget"}
                    </button>
                    <button type="button" className="ba-btn ba-btn--ghost bg-wide" disabled={working || cooldown > 0}
                            onClick={sendCode}>
                      {cooldown > 0 ? `Send a new code in ${cooldown}s` : "Send a new code"}
                    </button>
                  </>
                )}
                <button type="button" className="ba-btn ba-btn--ghost bg-wide" disabled={working}
                        onClick={() => { setSelected(null); resetCancel(); }}>
                  Keep the budget
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
