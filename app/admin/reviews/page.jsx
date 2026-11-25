"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, age, naira, useAdminSession, when } from "@/components/admin/adminClient";
import { AdminShell, HoldStatus, Loading, NameCheck } from "@/components/admin/AdminShell";

export default function ReviewsPage() {
  const router = useRouter();
  const { session, signOut, guard } = useAdminSession();
  const [view, setView] = useState("open");
  const [rows, setRows] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setRows(await adminApi(`admin/aml/holds?view=${view}`));
      setError("");
    } catch (err) {
      if (!guard(err)) setError(err.message);
    }
  }, [view, guard]);

  useEffect(() => {
    if (!session) return undefined;
    setRows(null);
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [session, load]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!rows || !q) return rows || [];
    return rows.filter((r) => [r.customerName, r.email, r.accountNumber, String(r.userId)]
      .join(" ").toLowerCase().includes(q));
  }, [rows, query]);

  if (!session) return <Loading label="Checking your sign-in..." />;

  return (
    <AdminShell session={session} onSignOut={signOut}>
      <div className="ad-head">
        <div>
          <h1>Payment reviews</h1>
          <p className="ad-muted">
            {view === "open" ? "Holds still in place, oldest first." : "The 200 most recent releases."}
          </p>
        </div>
      </div>

      <div className="ad-toolbar">
        <div className="ad-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={view === "open"} onClick={() => setView("open")}>Open</button>
          <button type="button" role="tab" aria-selected={view === "closed"} onClick={() => setView("closed")}>Released</button>
        </div>
        <input type="search" placeholder="Search name, email or account" value={query}
               onChange={(e) => setQuery(e.target.value)} aria-label="Search holds" />
        <button type="button" className="ba-btn ba-btn--sm" onClick={load}>Refresh</button>
      </div>

      {error && <div className="ba-error">{error}</div>}
      {!rows && !error && <Loading />}
      {rows && (
        shown.length === 0 ? <p className="ad-empty">No holds here.</p> : (
          <div className="ba-table-wrap">
            <table className="ba-table ad-table">
              <thead>
                <tr>
                  <th>Opened</th><th>Customer</th><th>Account</th><th className="num">Credit</th>
                  <th className="num">24h total</th><th>Name check</th><th className="num">Sent / cap</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => (
                  <tr key={row.id} tabIndex={0} className="ad-click"
                      onClick={() => router.push(`/admin/reviews/${row.id}`)}
                      onKeyDown={(e) => { if (e.key === "Enter") router.push(`/admin/reviews/${row.id}`); }}>
                    <td className="ad-nowrap">{when(row.startedAt)}<span className="ad-sub">{age(row.hoursOpen)} open</span></td>
                    <td>{row.customerName || `User ${row.userId}`}<span className="ad-sub">{row.email}</span></td>
                    <td>{row.accountNumber || "—"}</td>
                    <td className="num">{naira(row.triggerAmount)}</td>
                    <td className="num">{naira(row.inflowTotal24h)}</td>
                    <td><NameCheck result={row.nameCheck} /></td>
                    <td className="num">{naira(row.outflowUsed)} / {naira(row.outflowCap)}</td>
                    <td><HoldStatus row={row} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </AdminShell>
  );
}
