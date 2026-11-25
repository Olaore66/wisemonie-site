import { backendPost, json } from "@/lib/admin/backend";
import { clearAll, readSession, sameOrigin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/** Ends the website session on the backend too, then forgets it here. */
export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: "Forbidden" }, 403);
  const session = await readSession();
  if (session?.token) {
    await backendPost("/site-admin/auth/logout", {}, session.token).catch(() => null);
  }
  const response = json({ ok: true });
  clearAll(response);
  return response;
}
