import { json } from "@/lib/admin/backend";
import { readSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/** Who is signed in. Never returns the token. */
export async function GET() {
  const session = await readSession();
  return json(session ? { signedIn: true, email: session.email } : { signedIn: false });
}
