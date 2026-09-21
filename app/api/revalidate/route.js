import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug } = await request.json().catch(() => ({}));

    revalidatePath("/blog", "page");

    if (slug) {
      revalidatePath(`/blog/${slug}`, "page");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
