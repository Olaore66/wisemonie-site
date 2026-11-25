import { NextResponse } from "next/server";
import { BACKEND_URL, NO_STORE, json } from "@/lib/admin/backend";
import { clearAll, readSession, sameOrigin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/**
 * The only way admin pages reach the backend. The browser sends its
 * encrypted session cookie here; this server adds the token and calls the
 * backend itself. Only /admin/aml and /admin/blog can be reached, and the
 * backend token never reaches the browser.
 */
const SEGMENT = /^[A-Za-z0-9_~-][A-Za-z0-9._~-]*$/;
const FORWARD_RESPONSE_HEADERS = ["content-type", "content-disposition"];

async function forward(request, context) {
  const { path = [] } = await context.params;
  // Each decoded part is checked on its own, so "%2F" or ".." cannot
  // escape /admin/aml or /admin/blog.
  const allowed = path.length >= 2 && path[0] === "admin" && (path[1] === "aml" || path[1] === "blog")
    && path.every((part) => SEGMENT.test(part));
  if (!allowed) {
    return json({ error: "Not found" }, 404);
  }
  const joined = path.map(encodeURIComponent).join("/");
  if (request.method !== "GET" && !sameOrigin(request)) {
    return json({ error: "Forbidden" }, 403);
  }
  const session = await readSession();
  if (!session?.token) {
    return json({ error: "Please sign in." }, 401);
  }

  const url = `${BACKEND_URL}/${joined}${new URL(request.url).search}`;
  const headers = { Authorization: `Bearer ${session.token}`, Accept: "application/json" };
  const contentType = request.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  let upstream;
  try {
    upstream = await fetch(url, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return json({ error: "The server could not be reached. Try again." }, 502);
  }

  if (upstream.status === 401) {
    // The backend session ended (signed out elsewhere, or expired).
    const response = json({ error: "Your session ended. Please sign in again." }, 401);
    clearAll(response);
    return response;
  }

  const responseHeaders = new Headers(NO_STORE);
  for (const name of FORWARD_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
