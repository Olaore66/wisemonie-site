import { backendPost, json } from "@/lib/admin/backend";
import { clearPending, readPending, sameOrigin, writeSession } from "@/lib/admin/session";
import { NOT_CONFIGURED, sessionConfigured } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/** Step 2: the emailed code. The password comes from the encrypted step-1 cookie. */
export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: "Forbidden" }, 403);
  if (!sessionConfigured()) {
    console.error("[admin] ADMIN_SESSION_SECRET is missing or shorter than 32 characters");
    return json({ error: NOT_CONFIGURED }, 503);
  }
  const pending = await readPending();
  if (!pending) return json({ error: "Your sign-in timed out. Start again." }, 401);
  const { code } = await request.json().catch(() => ({}));
  if (typeof code !== "string" || !/^\d{6}$/.test(code.trim())) {
    return json({ error: "Enter the 6-digit code from your email." }, 400);
  }
  const result = await backendPost("/site-admin/auth/verify", {
    email: pending.email,
    password: pending.password,
    code: code.trim(),
  });
  if (!result.ok || !result.data?.token) {
    return json({ error: "That code did not work. Check it, or start again." }, 401);
  }
  const response = json({ email: result.data.email });
  writeSession(response, {
    token: result.data.token,
    email: result.data.email,
    expiresInSeconds: result.data.expiresInSeconds,
  });
  clearPending(response);
  return response;
}
