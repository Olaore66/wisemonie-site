import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readSession, sameOrigin } from "@/lib/admin/session";

/** Refreshes the blog after an admin edit. Signed-in admins only. */
export async function POST(request) {
  if (!sameOrigin(request) || !(await readSession())) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }
  try {
    const { slug } = await request.json().catch(() => ({}));

    revalidatePath("/blog", "page");

    if (typeof slug === "string" && /^[a-z0-9-]+$/i.test(slug)) {
      revalidatePath(`/blog/${slug}`, "page");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
