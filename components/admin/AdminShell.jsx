"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nameCheck } from "./adminClient";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/reviews", label: "Payment reviews" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminShell({ session, onSignOut, children }) {
  const pathname = usePathname();
  return (
    <div className="ad-shell">
      <header className="ad-top">
        <div className="ad-top__brand">
          <img src="/images/logo2.svg" alt="Wisemonie" />
          <span>Admin</span>
        </div>
        <nav className="ad-nav" aria-label="Admin">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ad-top__who">
          <span title={session?.email}>{session?.email}</span>
          <button type="button" className="ba-btn ba-btn--ghost ba-btn--sm" onClick={onSignOut}>Sign out</button>
        </div>
      </header>
      <main className="ad-main">{children}</main>
    </div>
  );
}

export function Loading({ label = "Loading..." }) {
  return <div className="ba-loading">{label}</div>;
}

export function Badge({ tone = "plain", children }) {
  return <span className={`ad-badge ad-badge--${tone}`}>{children}</span>;
}

export function NameCheck({ result }) {
  const [label, tone] = nameCheck(result);
  return <Badge tone={tone}>{label}</Badge>;
}

export function HoldStatus({ row }) {
  const badges = [];
  if (row.status === "ESCALATED") badges.push(<Badge key="s" tone="danger">Escalated</Badge>);
  else if (row.status === "ACTIVE") badges.push(<Badge key="s" tone="warn">Holding</Badge>);
  else if (row.status === "RELEASED") badges.push(<Badge key="s" tone="ok">Released</Badge>);
  else badges.push(<Badge key="s">{String(row.status)}</Badge>);
  if (row.walletStatus === "FROZEN") badges.push(<Badge key="f" tone="danger">Frozen</Badge>);
  if (row.status === "ESCALATED") {
    badges.push(row.rubiesNotifiedAt
      ? <Badge key="r" tone="ok">Rubies told</Badge>
      : <Badge key="r" tone="danger">Tell Rubies</Badge>);
  }
  if (row.status !== "RELEASED") {
    badges.push(row.customerContactedAt
      ? <Badge key="c" tone="ok">Contacted</Badge>
      : <Badge key="c">No contact</Badge>);
  }
  return <span className="ad-badges">{badges}</span>;
}
