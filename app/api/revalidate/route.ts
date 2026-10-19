import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Called by the Strapi webhook on entry.publish / entry.update / entry.unpublish.
 * Strapi sends a JSON body with the shape:
 *   { model: "blog-post" | "blog-category" | "blog-tag" | "industry" | "legal-page" | "homepage" | "campaign-page" | "demo-video" | "demo-feature-video" | "demo-feature-category", entry: { slug: string, ... } }
 *
 * The handler invalidates the affected route(s) so the next request re-renders
 * from Strapi and the fresh result is cached.
 *
 * Note: Next.js 16 requires a `profile` second argument for revalidateTag.
 * We pass `{ expire: 0 }` to force immediate expiration of the cached data.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "REVALIDATE_SECRET not configured" }, { status: 500 });
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { model?: string; entry?: { slug?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { model, entry } = body;

  if (!model) {
    return NextResponse.json({ error: "Missing model" }, { status: 400 });
  }

  // { expire: 0 } forces the cached data to expire immediately so the next
  // request fetches fresh content from Strapi.
  const NOW: { expire: number } = { expire: 0 };

  if (model === "blog-post") {
    const slug = entry?.slug;
    if (slug) {
      revalidatePath(`/blog/${slug}`, "page");
    }
    revalidatePath("/blog", "page");
    revalidatePath("/", "page");
    // Industry pages embed posts filtered by category slug === industry slug
    revalidatePath("/industries", "layout");
    revalidateTag("blog-listing", NOW);
    revalidateTag("/blog-posts", NOW);
    revalidatePath("/sitemap.xml");
  } else if (model === "blog-category") {
    revalidatePath("/blog", "page");
    revalidatePath("/", "page");
    revalidatePath("/industries", "layout");
    revalidateTag("blog-listing", NOW);
    revalidateTag("blog-categories", NOW);
    revalidateTag("/blog-posts", NOW);
  } else if (model === "blog-tag") {
    revalidatePath("/blog", "page");
    revalidateTag("blog-tags", NOW);
    revalidateTag("blog-listing", NOW);
    revalidateTag("/blog-posts", NOW);
  } else if (model === "industry") {
    const slug = entry?.slug;
    if (!slug) {
      return NextResponse.json({ error: "Missing entry.slug for industry model" }, { status: 400 });
    }
    revalidatePath(`/industries/${slug}`, "page");
    revalidatePath("/industries", "page");
    // Homepage Industries section + root layout nav/footer use the same industry data
    revalidatePath("/", "page");
    revalidatePath("/", "layout");
    revalidateTag("/industries", NOW);
    revalidateTag("industries-nav", NOW);
    revalidateTag("industries-listing", NOW);
  } else if (model === "homepage") {
    revalidatePath("/", "page");
    revalidateTag("homepage", NOW);
  } else if (model === "campaign-page") {
    revalidatePath("/start", "page");
    revalidateTag("campaign-page", NOW);
  } else if (model === "demo-video" || model === "demo-feature-video" || model === "demo-feature-category") {
    revalidatePath("/demo", "page");
    revalidateTag("demo-videos", NOW);
    revalidateTag("demo-feature-videos", NOW);
  } else if (model === "legal-page") {
    const slug = entry?.slug;
    if (slug) {
      revalidatePath(`/${slug}`, "page");
    }
    revalidateTag("/legal-pages", NOW);
  } else {
    return NextResponse.json({ error: `Unknown model: ${model}` }, { status: 400 });
  }

  return NextResponse.json({ revalidated: true, model, slug: entry?.slug ?? null });
}
