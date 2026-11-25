// Server-only. The browser never calls the backend directly for admin work.
import { NextResponse } from "next/server";

export const BACKEND_URL = (process.env.WISEMONIE_API_URL || "https://newmoniewise-6vpj.onrender.com").replace(/\/+$/, "");

export const NO_STORE = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

export function json(body, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

/** POSTs JSON to the backend and returns { ok, status, data }. */
export async function backendPost(path, body, token) {
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body ?? {}),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 502, data: { error: "The server could not be reached. Try again." } };
  }
}
