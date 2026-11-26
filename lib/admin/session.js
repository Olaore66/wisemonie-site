// Server-only. The admin session lives in encrypted, httpOnly cookies, so
// page scripts (and anyone inspecting the site) never see the backend token.
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "wm_admin";
export const PENDING_COOKIE = "wm_admin_pending";
const PENDING_MINUTES = 10;

/** True when the server has a usable ADMIN_SESSION_SECRET. */
export function sessionConfigured() {
  return (process.env.ADMIN_SESSION_SECRET || "").length >= 32;
}

export const NOT_CONFIGURED =
  "Admin sign-in is not set up on this server. Set ADMIN_SESSION_SECRET (32+ characters) and redeploy.";

function key() {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  if (secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET is missing or shorter than 32 characters");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

/** AES-256-GCM: confidential and tamper-evident. */
export function seal(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64url")).join(".");
}

export function unseal(sealed) {
  try {
    const [iv, tag, data] = String(sealed).split(".").map((p) => Buffer.from(p, "base64url"));
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const text = Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
    const value = JSON.parse(text);
    if (!value || typeof value.exp !== "number" || value.exp < Date.now()) return null;
    return value;
  } catch {
    return null;
  }
}

function baseCookie(maxAgeSeconds, path) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path,
    maxAge: maxAgeSeconds,
  };
}

/** The signed-in admin, or null. */
export async function readSession() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  return raw ? unseal(raw) : null;
}

export function writeSession(response, { token, email, expiresInSeconds }) {
  const seconds = Math.max(60, Math.min(Number(expiresInSeconds) || 8 * 3600, 12 * 3600));
  const value = seal({ token, email, exp: Date.now() + seconds * 1000 });
  // Only the website's own /api/admin routes ever receive this cookie.
  response.cookies.set(SESSION_COOKIE, value, baseCookie(seconds, "/api/admin"));
}

export async function readPending() {
  const jar = await cookies();
  const raw = jar.get(PENDING_COOKIE)?.value;
  return raw ? unseal(raw) : null;
}

/** Between the password and the code: kept encrypted for 10 minutes, never in page memory. */
export function writePending(response, { email, password }) {
  const value = seal({ email, password, exp: Date.now() + PENDING_MINUTES * 60 * 1000 });
  response.cookies.set(PENDING_COOKIE, value, baseCookie(PENDING_MINUTES * 60, "/api/admin/auth"));
}

export function clearAll(response) {
  response.cookies.set(SESSION_COOKIE, "", baseCookie(0, "/api/admin"));
  response.cookies.set(PENDING_COOKIE, "", baseCookie(0, "/api/admin/auth"));
}

export function clearPending(response) {
  response.cookies.set(PENDING_COOKIE, "", baseCookie(0, "/api/admin/auth"));
}

/**
 * Rejects calls from other sites. The cookies are SameSite=Strict already;
 * this is the second lock for anything that changes data.
 */
export function sameOrigin(request) {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return site === "same-origin" || request.method === "GET";
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}
