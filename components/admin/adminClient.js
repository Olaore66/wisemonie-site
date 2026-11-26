"use client";

// Browser side of the admin. It only talks to this website's /api/admin
// routes; the session cookie is httpOnly, so no script here can read it.
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export class SignedOutError extends Error {}

/** Calls the backend through this website's server. Path starts with "admin/aml", "admin/blog" or "admin/notifications". */
export async function adminApi(path, { method = "GET", body, form } = {}) {
  const init = { method, credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } };
  if (form) {
    init.body = form; // multipart: the browser sets the boundary
  } else if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const res = await fetch(`/api/admin/backend/${path.replace(/^\/+/, "")}`, init);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }
  if (res.status === 401) throw new SignedOutError((data && data.error) || "Please sign in.");
  if (!res.ok) throw new Error((data && (data.error || data.message)) || `Request failed (${res.status})`);
  return data;
}

export async function adminPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/** Sends signed-out visitors to the sign-in page, then back here afterwards. */
export function useAdminSession() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    let live = true;
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((r) => r.json())
      .then((s) => {
        if (!live) return;
        if (!s.signedIn) {
          router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
        } else {
          setSession(s);
        }
      })
      .catch(() => live && router.replace("/admin/login"));
    return () => { live = false; };
  }, [router]);

  const signOut = useCallback(async () => {
    await adminPost("/api/admin/auth/logout").catch(() => null);
    router.replace("/admin/login");
  }, [router]);

  /** Wraps an action: a signed-out answer goes back to sign-in. */
  const guard = useCallback((error) => {
    if (error instanceof SignedOutError) {
      router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
      return true;
    }
    return false;
  }, [router]);

  return { session, signOut, guard };
}

const nairaFormat = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 });

export function naira(value) {
  if (value === null || value === undefined || value === "") return "—";
  const n = Number(value);
  return Number.isFinite(n) ? nairaFormat.format(n) : String(value);
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/** Accepts "2026-11-25T14:00:00" or Jackson's [2026, 11, 25, 14, 0]. */
export function when(value) {
  if (!value) return "—";
  const d = Array.isArray(value)
    ? new Date(value[0], (value[1] || 1) - 1, value[2] || 1, value[3] || 0, value[4] || 0, value[5] || 0)
    : new Date(String(value));
  return Number.isNaN(d.getTime()) ? "—" : dateFormat.format(d);
}

export function age(hours) {
  if (hours === null || hours === undefined) return "";
  if (hours < 1) return "under 1h";
  if (hours < 48) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

const NAME_CHECK = {
  MATCH: ["Same name", "ok"],
  PARTIAL: ["Partial match", "warn"],
  MISMATCH: ["Different name", "danger"],
  COMPANY: ["Company", "danger"],
  UNKNOWN: ["Unknown", "plain"],
};

export function nameCheck(result) {
  return NAME_CHECK[result] || ["—", "plain"];
}
