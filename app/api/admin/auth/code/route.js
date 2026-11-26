import { backendPost, json } from "@/lib/admin/backend";
import { clearAll, sameOrigin, writePending } from "@/lib/admin/session";
import { NOT_CONFIGURED, sessionConfigured } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/** Step 1: email and password. The backend emails an admin a code. */
export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: "Forbidden" }, 403);
  if (!sessionConfigured()) {
    console.error("[admin] ADMIN_SESSION_SECRET is missing or shorter than 32 characters");
    return json({ error: NOT_CONFIGURED }, 503);
  }
  const { email, password } = await request.json().catch(() => ({}));
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return json({ error: "Email and password are required" }, 400);
  }
  const result = await backendPost("/site-admin/auth/code", { email: email.trim(), password });
  if (!result.ok) {
    const response = json({ error: "Email or password is wrong, or this is not an admin account." }, 401);
    clearAll(response);
    return response;
  }
  const response = json({ ok: true });
  writePending(response, { email: email.trim(), password });
  return response;
}
