import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { CmsBlogPostCard } from "@/components/CmsBlogPostCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import {
  BLOG_LISTING_PAGE_SIZE,
  getAllBlogPosts,
  getAllBlogCategoriesWithCounts,
  getAllBlogTagsWithCounts,
  getFeaturedBlogPost,
  strapiImageUrl,
} from "@/lib/strapi";

const BLOG_INDEX_TITLE = "Field notes on recurring revenue";
const BLOG_DESCRIPTION =
  "Practical, vendor-neutral writing on debit orders, payment plans, mandate capture and running a finance team across South Africa.";

type BlogListingParams = {
  category?: string;
  tag?: string;
  sort?: string;
  page?: string;
};

interface Props {
  searchParams: Promise<BlogListingParams>;
}

function blogListingState(params: BlogListingParams): {
  pageNum: number;
  sortVal: "latest" | "oldest";
  hasFacet: boolean;
  canonical: string;
  title: string;
} {
  const pageNum = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const sortVal = params.sort === "oldest" ? "oldest" : "latest";
  const hasFacet = Boolean(params.category || params.tag || params.sort);
  const canonical = pageNum > 1 ? `/blog?page=${pageNum}` : "/blog";
  const title = pageNum > 1 ? `${BLOG_INDEX_TITLE}, page ${pageNum}` : BLOG_INDEX_TITLE;
  return { pageNum, sortVal, hasFacet, canonical, title };
}

function blogListingHref(opts: {
  category?: string;
  tag?: string;
  sort: "latest" | "oldest";
  page: number;
}) {
  const params = new URLSearchParams();
  if (opts.category) params.set("category", opts.category);
  if (opts.tag) params.set("tag", opts.tag);
  if (opts.sort !== "latest") params.set("sort", opts.sort);
  params.set("page", String(opts.page));
  return `/blog?${params.toString()}`;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { hasFacet, canonical, title } = blogListingState(await searchParams);
  return {
    title,
    description: BLOG_DESCRIPTION,
    alternates: { canonical },
    robots: hasFacet
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, tag } = params;
  const { pageNum, sortVal } = blogListingState(params);
  const isFiltered = Boolean(category) || Boolean(tag);
  const showFeatured = !isFiltered && pageNum === 1;

  // Fetch categories, tags, featured post (unfiltered first page only), and listing posts in parallel.
  const [categories, tags, featured, { posts, total, pageCount }] = await Promise.all([
    getAllBlogCategoriesWithCounts().catch(() => []),
    getAllBlogTagsWithCounts().catch(() => []),
    showFeatured ? getFeaturedBlogPost().catch(() => null) : Promise.resolve(null),
    getAllBlogPosts({
      categorySlug: category,
      tagSlug: tag,
      sort: sortVal,
      page: pageNum,
      pageSize: BLOG_LISTING_PAGE_SIZE,
    }).catch(() => ({ posts: [], total: 0, pageCount: 0 })),
  ]);

  // Filter the featured post out of the grid if it appeared in this page's results.
  // Client-side removal keeps the parallel fetch; the count discrepancy (11 vs 12
  // items on page 1) is intentional — the featured card occupies the "missing" slot.
  const featuredId = featured?.id;
  const gridPosts = featuredId !== undefined
    ? posts.filter((p) => p.id !== featuredId)
    : posts;

  // Total count across ALL posts (sum of per-category counts) for the filter bar's
  // "All articles" pill. This differs from `total` which is the filtered-page count.
  const allArticlesCount = categories.reduce((sum, cat) => sum + cat.postCount, 0);

  const featuredImageUrl = strapiImageUrl(featured?.cardImage?.url);
  const featuredBadge = featured?.category?.name?.toUpperCase() ?? "";

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${t.line}` }}>
        <Container>
          <div className="mono flex items-center gap-2 py-5" style={{ fontSize: 13, color: t.inkSoft }}>
            <span>Resources</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: t.ink, fontWeight: 500 }}>Blog</span>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <Section className="py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <div
                className="mono mb-7"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                THE RECURV BLOG
              </div>
              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-hero)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.045em",
                  margin: 0,
                }}
              >
                Field notes on
                <br />
                <span style={{ color: t.primary }}>recurring revenue.</span>
              </h1>
            </div>
            <div>
              <p style={{ fontSize: 18, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Practical, vendor-neutral writing on debit orders, payment plans, and running a
                business with predictable revenue across South Africa. Written by the people who
                build Recurv and the operators using it.
              </p>
              <div
                className="mono mt-7 flex flex-wrap gap-4 items-center"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                <span>{total} ARTICLES</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>UPDATED WEEKLY</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter bar — wrapped in Suspense since BlogFilters uses useSearchParams */}
      <Suspense fallback={null}>
        <BlogFilters
          categories={categories}
          tags={tags}
          totalCount={allArticlesCount}
          activeCategory={category}
          activeTag={tag}
          activeSort={sortVal}
          activePage={pageNum}
        />
      </Suspense>

      {/* Results + posts */}
      <div className="pt-5 pb-16 lg:pb-24">
        <Container>
          {/* Count / clear row */}
          <div className="flex items-baseline justify-between mb-8">
          <div
            className="mono"
            style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
          >
            SHOWING {String(total).padStart(2, "0")}
            {category && (
              <> · {category.replace(/-/g, " ").toUpperCase()}</>
            )}
            {tag && (
              <> · #{tag.replace(/-/g, " ").toUpperCase()}</>
            )}
            {" · "}
            {sortVal === "latest" ? "NEWEST FIRST" : "OLDEST FIRST"}
          </div>
          {isFiltered && (
            <Link
              href="/blog"
              style={{ fontSize: 13, color: t.primary, fontWeight: 500, textDecoration: "none" }}
            >
              Clear filters ×
            </Link>
          )}
          </div>

          {/* Featured post card — only when no category filter */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <article
                className="grid grid-cols-1 overflow-hidden mb-10 lg:grid-cols-[1.1fr_1fr] transition-[border-color,box-shadow] duration-[140ms] hover:shadow-[0_4px_24px_rgba(79,51,217,0.2)] hover:border-[#4F33D9]"
                style={{
                  background: t.surface,
                  border: `1px solid ${t.line}`,
                  borderRadius: 16,
                  cursor: "pointer",
                }}
              >
                {/* Image or placeholder */}
                {featuredImageUrl && featured.cardImage ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      overflow: "hidden",
                      background: t.surfaceAlt,
                    }}
                  >
                    <Image
                      src={featuredImageUrl}
                      alt={featured.cardImage.alternativeText ?? featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      background: `linear-gradient(135deg, ${t.primary}80, #0F0E14 70%)`,
                      overflow: "hidden",
                    }}
                  />
                )}

                {/* Text content */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        padding: "4px 10px",
                        borderRadius: 4,
                        background: t.primary,
                        color: "#fff",
                        letterSpacing: 1.5,
                      }}
                    >
                      FEATURED
                    </span>
                    {featuredBadge && (
                      <span
                        className="mono"
                        style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
                      >
                        {featuredBadge}
                      </span>
                    )}
                  </div>
                  <h2
                    style={{
                      fontFamily: t.fontDisplay,
                      fontWeight: 500,
                      fontSize: "var(--fs-h2-lg)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      margin: 0,
                    }}
                  >
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                      {featured.excerpt}
                    </p>
                  )}
                  <div
                    className="flex items-center justify-end pt-5 mt-3"
                    style={{ borderTop: `1px solid ${t.line}` }}
                  >
                    <Button size="sm" icon={<span>→</span>}>
                      Read article
                    </Button>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Post grid or empty state */}
          {gridPosts.length === 0 ? (
            <div
              className="py-20 text-center"
              style={{ border: `1px dashed ${t.line}`, borderRadius: 12, background: t.surface }}
            >
              <div className="mono mb-3" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                NO ARTICLES YET
              </div>
              <div
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Nothing in this category — try another.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((p) => (
                <CmsBlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div
              className="flex flex-col gap-3 mt-14 pt-6 md:flex-row md:items-center md:justify-between"
              style={{ borderTop: `1px solid ${t.line}` }}
            >
              <div className="mono order-2 text-center md:order-1 md:text-left" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                PAGE {String(pageNum).padStart(2, "0")} OF {String(pageCount).padStart(2, "0")}
              </div>
              <div className="flex gap-2 justify-center order-1 md:order-2 md:justify-end">
                {pageNum > 1 ? (
                  <Link
                    href={blogListingHref({
                      category,
                      tag,
                      sort: sortVal,
                      page: pageNum - 1,
                    })}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      background: "transparent",
                      color: t.ink,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span
                    style={{
                      padding: "10px 16px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      background: "transparent",
                      color: t.inkSoft,
                      fontSize: 13,
                      cursor: "not-allowed",
                    }}
                  >
                    ← Previous
                  </span>
                )}
                {pageNum < pageCount ? (
                  <Link
                    href={blogListingHref({
                      category,
                      tag,
                      sort: sortVal,
                      page: pageNum + 1,
                    })}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      background: "transparent",
                      color: t.ink,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Next →
                  </Link>
                ) : (
                  <span
                    style={{
                      padding: "10px 16px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      background: "transparent",
                      color: t.inkSoft,
                      fontSize: 13,
                      cursor: "not-allowed",
                    }}
                  >
                    Next →
                  </span>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
