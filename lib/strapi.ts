/**
 * Typed API client for the Recurv Strapi CMS.
 *
 * Environment variables required:
 *   STRAPI_API_URL   — e.g. https://strapi-cms.up.railway.app
 *   STRAPI_API_TOKEN — read-only API token generated in Strapi admin
 */

import type { FeatureVideo, GuidedDemoVideo } from "@/components/demo/guided-demo-data";

// ── Strapi Blocks rich-text node types ────────────────────────────────────────

export type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "list"; format: "unordered" | "ordered"; children: ListItemNode[] }
  | { type: "image"; image: StrapiImage; children: InlineNode[] }
  | { type: "code"; language?: string; children: InlineNode[] };

export type InlineNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type ListItemNode = {
  type: "list-item";
  children: InlineNode[];
};

// ── Strapi media ──────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  width: number;
  height: number;
  mime?: string | null;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// ── Industry component shapes ──────────────────────────────────────────────────

export interface StrapiHeadlineSegment {
  id: number;
  text: string;
  style: "default" | "accent";
}

export interface StrapiLink {
  id: number;
  label: string;
  url: string;
}

export interface StrapiStat {
  id: number;
  value: string;
}

/**
 * Lucide icon name as stored in Strapi enumerations.
 * These are kebab-case lucide-react icon names.
 */
export type IndustryIconName =
  | "trending-up"
  | "clock"
  | "percent"
  | "file-search"
  | "alert-triangle"
  | "repeat"
  | "credit-card"
  | "users"
  | "shield-check"
  | "bar-chart-3";

export interface StrapiProblemCard {
  id: number;
  problemIcon: IndustryIconName;
  problemTitle: string;
  problemDescription: string;
  solutionDescription: string;
}

export interface StrapiNumberedFeature {
  id: number;
  featureIcon: IndustryIconName;
  featureTitle: string;
  featureDescription: string;
}

export interface StrapiDashboardFeature {
  id: number;
  dashboardFeatureIcon: IndustryIconName;
  dashboardFeatureTitle: string;
  dashboardFeatureDescription: string;
}

export interface StrapiOnboardingStep {
  id: number;
  stepTitle: string;
  stepDescription: string;
}

export interface StrapiFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface StrapiMetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
  image?: StrapiImage | null;
}

export interface StrapiSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: StrapiImage | null;
  metaSocial?: StrapiMetaSocial[] | null;
}

// ── Industry nav / card shapes ─────────────────────────────────────────────────

/** Minimal shape used in the shared nav (header/footer). */
export interface StrapiIndustryNavItem {
  industryName: string;
  slug: string;
}

/** Shape used on the homepage "Industries" section and the /industries listing. */
export interface StrapiIndustryCard {
  id: number;
  documentId: string;
  industryName: string;
  slug: string;
  cardTagline?: string | null;
  cardImage?: StrapiImage | null;
  isFeatured?: boolean | null;
}

// ── Homepage single type ───────────────────────────────────────────────────────

export interface StrapiHomepage {
  videoLabel?: string | null;
  videoHeadline?: StrapiHeadlineSegment[] | null;
  videoBody?: string | null;
  video?: StrapiImage | null;
}

export interface StrapiCampaignBenefit {
  id: number;
  title: string;
  body: string;
}

export interface StrapiCampaignStep {
  id: number;
  title: string;
  body?: string | null;
}

export type CampaignCtaAction = "book_demo" | "request_quote" | "full_demo";

export interface StrapiCampaignCtaCard {
  id: number;
  title: string;
  body: string;
  supportingText?: string | null;
  ctaLabel: string;
  action: CampaignCtaAction;
}

export interface StrapiCampaignPage {
  heroEyebrow?: string | null;
  heroHeadline?: StrapiHeadlineSegment[] | null;
  heroBody?: string | null;
  heroVideoCaption?: string | null;
  introVideo?: StrapiImage | null;
  introPoster?: StrapiImage | null;
  valueEyebrow?: string | null;
  valueHeadline?: StrapiHeadlineSegment[] | null;
  valueBody?: string | null;
  benefits?: StrapiCampaignBenefit[] | null;
  conversionEyebrow?: string | null;
  conversionHeadline?: StrapiHeadlineSegment[] | null;
  conversionBody?: string | null;
  conversionCards?: StrapiCampaignCtaCard[] | null;
  gettingStartedEyebrow?: string | null;
  gettingStartedHeadline?: StrapiHeadlineSegment[] | null;
  gettingStartedBody?: string | null;
  steps?: StrapiCampaignStep[] | null;
  trustHeadline?: string | null;
  trustBody?: string | null;
  finalHeadline?: StrapiHeadlineSegment[] | null;
  finalBody?: string | null;
  finalPrimaryLabel?: string | null;
  finalSecondaryLabel?: string | null;
  finalTertiaryLabel?: string | null;
  headerCtaLabel?: string | null;
  bookDemoUrl?: string | null;
  fullDemoUrl?: string | null;
  seo?: StrapiSeo | null;
}

interface StrapiSingleResponse<T> {
  data: T | null;
}

// ── Industry content type ──────────────────────────────────────────────────────

export interface StrapiIndustry {
  id: number;
  documentId: string;
  industryName: string;
  slug: string;
  cardTagline?: string | null;
  cardImage?: StrapiImage | null;
  isFeatured?: boolean | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // Hero section
  heroHeadline?: StrapiHeadlineSegment[] | null;
  heroIntro?: BlockNode[] | string | null;
  heroPrimaryCta?: StrapiLink | null;
  heroSecondaryCta?: StrapiLink | null;
  heroStats?: StrapiStat[] | null;
  heroImage?: StrapiImage | null;

  // Video section — omitted on the page when `video` is empty
  videoLabel?: string | null;
  videoHeadline?: StrapiHeadlineSegment[] | null;
  videoBody?: string | null;
  video?: StrapiImage | null;

  // Trusted-by strip
  trustedNames?: string | null;

  // Problems section
  problemsEyebrow?: string | null;
  problemsHeading?: StrapiHeadlineSegment[] | null;
  problemsIntro?: string | null;
  problems?: StrapiProblemCard[] | null;

  // Features / solution section
  featuresEyebrow?: string | null;
  featuresHeading?: StrapiHeadlineSegment[] | null;
  featuresIntro?: string | null;
  features?: StrapiNumberedFeature[] | null;

  // Dashboard section
  dashboardEyebrow?: string | null;
  dashboardHeading?: StrapiHeadlineSegment[] | null;
  dashboardIntro?: string | null;
  dashboardFeatures?: StrapiDashboardFeature[] | null;
  dashboardCta?: StrapiLink | null;

  // Onboarding section
  onboardingEyebrow?: string | null;
  onboardingHeading?: StrapiHeadlineSegment[] | null;
  onboardingCta?: StrapiLink | null;
  onboardingSteps?: StrapiOnboardingStep[] | null;

  // Contact section
  contactEyebrow?: string | null;
  contactHeading?: StrapiHeadlineSegment[] | null;
  contactDescription?: string | null;
  contactTeamLabel?: string | null;

  // FAQ section
  faqEyebrow?: string | null;
  faqHeading?: StrapiHeadlineSegment[] | null;
  faqIntro?: string | null;
  faqItems?: StrapiFaqItem[] | null;

  // SEO
  seo?: StrapiSeo | null;
}

// ── Image URL helper ──────────────────────────────────────────────────────────

/**
 * Resolves a Strapi image URL to an absolute URL.
 *
 * Strapi's local file provider returns relative paths ("/uploads/…") while
 * cloud providers (S3, Cloudinary, Railway) return absolute URLs. This helper
 * normalises both cases so next/image always receives a fully-qualified src.
 *
 * Must only be called in Server Components / server-side code because it reads
 * process.env.STRAPI_API_URL.
 */
export function strapiImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = (process.env.STRAPI_API_URL ?? "").replace(/\/$/, "");
  return `${base}${url}`;
}

// ── Strapi list response wrapper ──────────────────────────────────────────────

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

const BASE = process.env.STRAPI_API_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiGetOptions {
  revalidate?: number;
  tags?: string[];
  /** Single types return 404 until the first entry is published. */
  allowNotFound?: boolean;
}

async function strapiGet<T>(path: string, options?: StrapiGetOptions): Promise<T> {
  if (!BASE) throw new Error("STRAPI_API_URL is not set");
  if (!TOKEN) throw new Error("STRAPI_API_TOKEN is not set");

  const url = `${BASE}/api${path}`;

  let nextConfig: { revalidate?: number; tags?: string[] };
  if (options?.revalidate !== undefined || options?.tags !== undefined) {
    nextConfig = {};
    if (options.revalidate !== undefined) nextConfig.revalidate = options.revalidate;
    if (options.tags !== undefined) nextConfig.tags = options.tags;
  } else {
    nextConfig = { tags: [path.split("?")[0]] };
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: nextConfig,
  });

  if (!res.ok) {
    if (options?.allowNotFound && res.status === 404) {
      return { data: null } as T;
    }
    throw new Error(`Strapi API error ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Strapi `config/api.js` maxLimit. A larger pageSize is silently truncated,
 * so every full-catalogue read must walk pages of this size.
 */
const STRAPI_PAGE_SIZE = 100;

/**
 * Follows `meta.pagination.pageCount` until every row is collected.
 * `path` must already include a stable sort and must not set pagination.
 */
async function strapiGetAll<T>(path: string, options?: StrapiGetOptions): Promise<T[]> {
  const items: T[] = [];
  let page = 1;

  for (;;) {
    const joiner = path.includes("?") ? "&" : "?";
    const res = await strapiGet<StrapiListResponse<T>>(
      `${path}${joiner}pagination[page]=${page}&pagination[pageSize]=${STRAPI_PAGE_SIZE}`,
      options,
    );
    const batch = res.data ?? [];
    items.push(...batch);
    const pageCount = res.meta?.pagination?.pageCount ?? page;
    if (page >= pageCount || batch.length === 0) break;
    page += 1;
  }

  return items;
}

// ── Blog content types ────────────────────────────────────────────────────────

export interface StrapiBlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiBlogTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cardImage: StrapiImage | null;
  heroImage: StrapiImage | null;
  body: BlockNode[] | null;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: StrapiBlogCategory | null;
  tags: StrapiBlogTag[] | null;
  seo: StrapiSeo | null;
}

export interface StrapiBlogCategoryWithCount extends StrapiBlogCategory {
  postCount: number;
}

export interface StrapiBlogTagWithCount extends StrapiBlogTag {
  postCount: number;
}

// ── Blog card-level field set (shared param string) ───────────────────────────

const BLOG_CARD_FIELDS =
  "fields[0]=title&fields[1]=slug&fields[2]=excerpt" +
  "&fields[3]=publishedAt&fields[4]=isFeatured" +
  "&populate[cardImage]=true" +
  "&populate[category][fields][0]=name&populate[category][fields][1]=slug";

// ── Blog queries (new schema) ─────────────────────────────────────────────────

/**
 * Fetches the 3 most recently published blog posts for the homepage
 * "FROM THE BLOG" section. Cached for 1 hour with tag for on-demand bust.
 */
export async function getFeaturedBlogPostsForHomepage(): Promise<StrapiBlogPost[]> {
  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}&sort=publishedAt:desc&pagination[pageSize]=3`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return res.data;
}

/**
 * Fetches recent blog posts whose category slug matches an industry page slug.
 * This is the association used on /industries/[slug] — create a blog category
 * with the same slug as the industry (e.g. "schools-and-education") and assign
 * posts to it.
 */
export async function getBlogPostsForIndustry(
  industrySlug: string,
  limit = 3
): Promise<StrapiBlogPost[]> {
  const { posts } = await getAllBlogPosts({
    categorySlug: industrySlug,
    pageSize: limit,
    sort: "latest",
  });
  return posts;
}

/**
 * Fetches the single post with isFeatured=true for the /blog listing featured card.
 * Returns null if no post is marked featured.
 */
export async function getFeaturedBlogPost(): Promise<StrapiBlogPost | null> {
  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}&filters[isFeatured][$eq]=true&pagination[pageSize]=1`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return res.data[0] ?? null;
}

/** Page size for the public /blog listing. Sitemap pagination must use the same value. */
export const BLOG_LISTING_PAGE_SIZE = 12;

/**
 * Fetches paginated blog posts for the /blog listing page.
 * Supports optional category filter, sort direction, and pagination.
 */
export async function getAllBlogPosts({
  categorySlug,
  tagSlug,
  sort = "latest",
  page = 1,
  pageSize = BLOG_LISTING_PAGE_SIZE,
  excludeId,
}: {
  categorySlug?: string;
  tagSlug?: string;
  sort?: "latest" | "oldest";
  page?: number;
  pageSize?: number;
  /** Exclude a specific post by numeric id (used to remove the featured card from the grid). */
  excludeId?: number;
} = {}): Promise<{ posts: StrapiBlogPost[]; total: number; pageCount: number }> {
  let qs =
    `${BLOG_CARD_FIELDS}` +
    `&sort=${sort === "oldest" ? "publishedAt:asc" : "publishedAt:desc"}` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}`;

  if (categorySlug) {
    qs += `&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`;
  }
  if (tagSlug) {
    qs += `&filters[tags][slug][$eq]=${encodeURIComponent(tagSlug)}`;
  }
  if (excludeId !== undefined) {
    qs += `&filters[id][$ne]=${excludeId}`;
  }

  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${qs}`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return {
    posts: res.data,
    total: res.meta.pagination.total,
    pageCount: res.meta.pagination.pageCount,
  };
}

/**
 * Fetches all blog categories along with a post count for each.
 * Uses two parallel queries (categories + minimal post list) to avoid N+1.
 * Both results are cached and busted by the Strapi webhook.
 */
export async function getAllBlogCategoriesWithCounts(): Promise<StrapiBlogCategoryWithCount[]> {
  const [categoriesRes, postsRes] = await Promise.all([
    strapiGet<StrapiListResponse<StrapiBlogCategory>>(
      "/blog-categories?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100",
      { revalidate: 3600, tags: ["blog-categories"] }
    ),
    strapiGetAll<{ id: number; category: { id: number } | null }>(
      "/blog-posts?fields[0]=id&populate[category][fields][0]=id&sort[0]=id:asc&status=published",
      { revalidate: 3600, tags: ["blog-listing"] }
    ),
  ]);

  const countMap: Record<number, number> = {};
  for (const post of postsRes) {
    const catId = post.category?.id;
    if (catId !== undefined) countMap[catId] = (countMap[catId] ?? 0) + 1;
  }

  return categoriesRes.data.map((cat) => ({
    ...cat,
    postCount: countMap[cat.id] ?? 0,
  }));
}

/**
 * Fetches all blog tags along with a post count for each.
 * Uses two parallel queries to avoid N+1 — categories + a minimal post list
 * that includes the tags relation (many-to-many).
 */
export async function getAllBlogTagsWithCounts(): Promise<StrapiBlogTagWithCount[]> {
  const [tagsRes, postsRes] = await Promise.all([
    strapiGet<StrapiListResponse<StrapiBlogTag>>(
      "/blog-tags?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100",
      { revalidate: 3600, tags: ["blog-tags"] }
    ),
    strapiGetAll<{ id: number; tags: { id: number }[] | null }>(
      "/blog-posts?fields[0]=id&populate[tags][fields][0]=id&sort[0]=id:asc&status=published",
      { revalidate: 3600, tags: ["blog-listing"] }
    ),
  ]);

  const countMap: Record<number, number> = {};
  for (const post of postsRes) {
    for (const tag of post.tags ?? []) {
      countMap[tag.id] = (countMap[tag.id] ?? 0) + 1;
    }
  }

  return tagsRes.data
    .map((tag) => ({ ...tag, postCount: countMap[tag.id] ?? 0 }))
    .filter((tag) => tag.postCount > 0); // only show tags that have posts
}

/**
 * Fetches a single blog post with full populate (heroImage, category, tags,
 * seo, body). Returns null if no post with the given slug is found.
 */
export async function getBlogPostBySlug(slug: string): Promise<StrapiBlogPost | null> {
  const base = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    "status=published",
    "populate[cardImage]=true",
    "populate[heroImage]=true",
    "populate[category][fields][0]=name",
    "populate[category][fields][1]=slug",
    "populate[tags][fields][0]=name",
    "populate[tags][fields][1]=slug",
  ].join("&");

  const seoPopulate =
    "populate[seo][populate][shareImage]=true&populate[seo][populate][metaSocial][populate]=image";

  // Try full populate first; fall back without SEO if Strapi rejects nested populate.
  for (const qs of [`${base}&${seoPopulate}`, base]) {
    try {
      const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(`/blog-posts?${qs}`);
      return res.data[0] ?? null;
    } catch (err) {
      if (qs === base) throw err;
    }
  }

  return null;
}

const BLOG_SLUG_QUERY =
  "/blog-posts?fields[0]=slug&fields[1]=updatedAt" +
  "&sort[0]=publishedAt:desc&sort[1]=id:asc&status=published";

/**
 * Every published blog slug. Pages through Strapi at {@link STRAPI_PAGE_SIZE}
 * so catalogues past 100 (and past 1,000) are complete. Used by the sitemap.
 */
export async function getAllBlogSlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  return strapiGetAll(BLOG_SLUG_QUERY);
}

/**
 * Latest page of slugs for generateStaticParams. Further posts render on
 * first request (`dynamicParams`) and are still listed in the sitemap.
 */
export async function getRecentBlogSlugsForStaticParams(): Promise<
  { slug: string; updatedAt: string }[]
> {
  const res = await strapiGet<
    StrapiListResponse<Pick<StrapiBlogPost, "slug" | "updatedAt">>
  >(
    `${BLOG_SLUG_QUERY}&pagination[page]=1&pagination[pageSize]=${STRAPI_PAGE_SIZE}`,
  );
  return res.data;
}

/**
 * Fetches up to `limit` related posts for the "Keep reading" section.
 * Prioritises posts in the same category, backfills with most recent
 * posts from other categories if fewer than `limit` are available.
 */
export async function getRelatedBlogPosts(
  currentPostId: number,
  categoryId: number | null,
  limit = 3
): Promise<StrapiBlogPost[]> {
  const sameCategory: StrapiBlogPost[] = [];

  if (categoryId) {
    const r = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
      `/blog-posts?${BLOG_CARD_FIELDS}` +
        `&filters[category][id][$eq]=${categoryId}` +
        `&filters[id][$ne]=${currentPostId}` +
        `&sort=publishedAt:desc` +
        `&pagination[pageSize]=${limit}`,
      { revalidate: 3600, tags: ["blog-listing"] }
    );
    sameCategory.push(...r.data);
  }

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  // Backfill with posts from other categories
  const needed = limit - sameCategory.length;
  const sameCategoryIds = new Set(sameCategory.map((p) => p.id));

  const r = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}` +
      `&filters[id][$ne]=${currentPostId}` +
      `&sort=publishedAt:desc` +
      `&pagination[pageSize]=${limit * 3 + 5}`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );

  const backfill = r.data.filter((p) => !sameCategoryIds.has(p.id));
  return [...sameCategory, ...backfill.slice(0, needed)];
}

// ── Legal page content type ───────────────────────────────────────────────────

export interface StrapiLegalPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  body: BlockNode[] | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches a single legal page by slug (title + body).
 * Returns null if no published entry matches.
 */
export async function getLegalPageBySlug(slug: string): Promise<StrapiLegalPage | null> {
  const res = await strapiGet<StrapiListResponse<StrapiLegalPage>>(
    `/legal-pages?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&fields[0]=title&fields[1]=slug&fields[2]=body` +
      `&fields[3]=updatedAt&fields[4]=publishedAt`
  );
  return res.data[0] ?? null;
}

/**
 * Fetches all legal page slugs — used in generateStaticParams for the
 * root /[slug] route. Minimal payload (slug only).
 */
export async function getAllLegalPageSlugs(): Promise<{ slug: string }[]> {
  const res = await strapiGet<StrapiListResponse<Pick<StrapiLegalPage, "slug">>>(
    "/legal-pages?fields[0]=slug&pagination[pageSize]=100"
  );
  return res.data;
}

// ── Industry queries ──────────────────────────────────────────────────────────

export async function getIndustries(): Promise<StrapiIndustry[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    "/industries?sort=industryName:asc&pagination[pageSize]=100"
  );
  return res.data;
}

/** Fetches only slugs — for use in generateStaticParams (minimal payload). */
export async function getAllIndustrySlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  const res = await strapiGet<
    StrapiListResponse<Pick<StrapiIndustry, "slug" | "updatedAt">>
  >("/industries?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100");
  return res.data;
}

/**
 * Fetches only industryName + slug for every published industry, sorted
 * alphabetically. Used in the shared header/footer nav so the payload is
 * as small as possible — no images, no components, no rich text.
 *
 * Cached for up to 1 hour (time-based) AND tagged as "industries-nav" so
 * the Strapi webhook can bust it immediately on any industry publish/update.
 */
export async function getIndustryNavList(): Promise<StrapiIndustryNavItem[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryNavItem>>(
    "/industries?fields[0]=industryName&fields[1]=slug&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-nav"] }
  );
  return res.data;
}

/**
 * Fetches the fields needed to render the homepage "Industries" section:
 * name, slug, card image (populated), tagline, and the isFeatured flag.
 *
 * Tagged as "industries-listing" so the Strapi webhook can bust it on publish.
 */
export async function getFeaturedIndustriesForHomepage(): Promise<StrapiIndustryCard[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryCard>>(
    "/industries?fields[0]=industryName&fields[1]=slug&fields[2]=cardTagline&fields[3]=isFeatured&populate[cardImage]=true&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-listing"] }
  );
  return res.data;
}

/**
 * Fetches all industries with the card-level fields needed for the /industries
 * listing page. Returns the complete list — pagination is not needed unless
 * the industry count grows significantly (current count is ~10).
 *
 * Tagged as "industries-listing" so the Strapi webhook can bust it on publish.
 */
export async function getAllIndustriesForListing(): Promise<StrapiIndustryCard[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryCard>>(
    "/industries?fields[0]=industryName&fields[1]=slug&fields[2]=cardTagline&fields[3]=isFeatured&populate[cardImage]=true&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-listing"] }
  );
  return res.data;
}

/** Outbound campaign landing page. Null until the single type is published. */
export async function getCampaignPage(): Promise<StrapiCampaignPage | null> {
  const populate = [
    "populate[heroHeadline]=true",
    "populate[introVideo]=true",
    "populate[introPoster]=true",
    "populate[valueHeadline]=true",
    "populate[benefits]=true",
    "populate[conversionHeadline]=true",
    "populate[conversionCards]=true",
    "populate[gettingStartedHeadline]=true",
    "populate[steps]=true",
    "populate[finalHeadline]=true",
    "populate[seo][populate][shareImage]=true",
    "populate[seo][populate][metaSocial][populate]=image",
  ].join("&");

  const res = await strapiGet<StrapiSingleResponse<StrapiCampaignPage>>(
    `/campaign-page?${populate}`,
    { tags: ["campaign-page"], allowNotFound: true }
  );
  return res.data ?? null;
}

/** Homepage singleton — video section is omitted when `video` is empty. */
export async function getHomepage(): Promise<StrapiHomepage | null> {
  const res = await strapiGet<StrapiSingleResponse<StrapiHomepage>>(
    "/homepage?populate[video]=true&populate[videoHeadline]=true",
    { tags: ["homepage"], allowNotFound: true }
  );
  return res.data ?? null;
}

/** Full deep-populate fetch for a single industry page. */
export async function getIndustryBySlug(slug: string): Promise<StrapiIndustry | null> {
  // Build deep populate in a single request — avoids N+1 calls.
  const populate = [
    // Card + hero
    "populate[cardImage]=true",
    "populate[heroHeadline]=true",
    "populate[heroPrimaryCta]=true",
    "populate[heroSecondaryCta]=true",
    "populate[heroStats]=true",
    "populate[heroImage]=true",
    "populate[videoHeadline]=true",
    "populate[video]=true",
    // Problems
    "populate[problemsHeading]=true",
    "populate[problems][populate]=*",
    // Features
    "populate[featuresHeading]=true",
    "populate[features][populate]=*",
    // Dashboard
    "populate[dashboardHeading]=true",
    "populate[dashboardFeatures][populate]=*",
    "populate[dashboardCta]=true",
    // Onboarding
    "populate[onboardingHeading]=true",
    "populate[onboardingSteps]=true",
    "populate[onboardingCta]=true",
    // Contact
    "populate[contactHeading]=true",
    // FAQ
    "populate[faqHeading]=true",
    "populate[faqItems]=true",
    // SEO
    "populate[seo][populate][shareImage]=true",
    "populate[seo][populate][metaSocial][populate]=image",
  ].join("&");

  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    `/industries?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}`
  );
  return res.data[0] ?? null;
}

/**
 * @deprecated Use getIndustryBySlug() instead — this alias kept for
 * any code that imported the old function name.
 */
export const getIndustry = getIndustryBySlug;

export interface StrapiGuidedDemoVideo {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  duration?: string | null;
  sortOrder?: number | null;
  video?: StrapiImage | null;
}

export interface StrapiDemoFeatureCategory {
  id: number;
  documentId: string;
  name: string;
  sortOrder?: number | null;
}

export interface StrapiDemoFeatureVideo {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  duration?: string | null;
  sortOrder?: number | null;
  video?: StrapiImage | null;
  category?: StrapiDemoFeatureCategory | null;
}

function demoPlaybackUrl(group: "guided" | "feature", slug: string, file?: StrapiImage | null): string {
  if (!file?.url) return "PLACEHOLDER";
  // The filename changes when the upload is replaced. A failed response for the
  // previous URL must not keep the new file from loading.
  const fileName = file.url.split("?")[0]?.split("/").pop() || "file";
  return `/demo/media/${group}/${encodeURIComponent(slug)}?v=${encodeURIComponent(fileName)}`;
}

/** Strapi file behind a demo video. The public player URL is same-origin and noindex. */
export async function getDemoMediaSource(
  group: string,
  slug: string,
): Promise<{ url: string; mime: string } | null> {
  const collection = group === "guided" ? "demo-videos" : group === "feature" ? "demo-feature-videos" : null;
  if (!collection || !slug.trim()) return null;

  const res = await strapiGet<StrapiListResponse<{ video?: StrapiImage | null }>>(
    `/${collection}?filters[slug][$eq]=${encodeURIComponent(slug)}&fields[0]=slug&populate[video]=true&pagination[pageSize]=1`,
    { tags: [collection] },
  );
  const file = res.data[0]?.video;
  const url = strapiImageUrl(file?.url);
  if (!url) return null;
  return { url, mime: file?.mime?.trim() || "video/mp4" };
}

/** Ordered guided-demo sequence. The first published video is the welcome. */
export async function getGuidedDemoVideos(): Promise<GuidedDemoVideo[]> {
  const res = await strapiGet<StrapiListResponse<StrapiGuidedDemoVideo>>(
    "/demo-videos?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=duration&fields[4]=sortOrder&populate[video]=true&sort[0]=sortOrder:asc&sort[1]=title:asc&pagination[pageSize]=100",
    { tags: ["demo-videos"] },
  );

  return res.data
    .filter((entry) => entry.title?.trim() && entry.slug?.trim())
    .map((entry) => ({
      id: entry.slug.trim(),
      title: entry.title.trim(),
      duration: entry.duration?.trim() || "0:00",
      description: entry.description?.trim() ?? "",
      videoUrl: demoPlaybackUrl("guided", entry.slug.trim(), entry.video),
      mime: entry.video?.mime?.trim() || "video/mp4",
    }));
}

/** Optional Explore More videos, ordered by category then sort order. */
export async function getFeatureVideos(): Promise<FeatureVideo[]> {
  const res = await strapiGet<StrapiListResponse<StrapiDemoFeatureVideo>>(
    "/demo-feature-videos?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=duration&fields[4]=sortOrder&populate[video]=true&populate[category]=true&pagination[pageSize]=100",
    { tags: ["demo-feature-videos"] },
  );

  return res.data
    .filter((entry) => entry.title?.trim() && entry.slug?.trim() && entry.category?.name?.trim())
    .sort((a, b) => {
      const categoryOrder = (a.category?.sortOrder ?? 0) - (b.category?.sortOrder ?? 0);
      if (categoryOrder !== 0) return categoryOrder;
      const categoryName = (a.category?.name ?? "").localeCompare(b.category?.name ?? "");
      if (categoryName !== 0) return categoryName;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    })
    .map((entry) => ({
      id: entry.slug.trim(),
      category: entry.category!.name.trim(),
      title: entry.title.trim(),
      description: entry.description?.trim() ?? "",
      duration: entry.duration?.trim() || "0:00",
      videoUrl: demoPlaybackUrl("feature", entry.slug.trim(), entry.video),
      mime: entry.video?.mime?.trim() || "video/mp4",
    }));
}

// ── Heading segment helpers ───────────────────────────────────────────────────

/**
 * Maps a StrapiHeadlineSegment array to the headingBefore / headingAccent
 * shape expected by existing industry section components.
 *
 * All "default" segments are joined (with line breaks preserved as an array)
 * and the first "accent" segment becomes the accent phrase.
 */
export function segmentsToProps(
  segments: StrapiHeadlineSegment[] | null | undefined
): { headingBefore: string[]; headingAccent: string } {
  if (!segments || segments.length === 0) {
    return { headingBefore: [""], headingAccent: "" };
  }
  const before = segments
    .filter((s) => s.style === "default")
    .map((s) => s.text);
  const accent = segments.find((s) => s.style === "accent")?.text ?? "";
  return { headingBefore: before.length > 0 ? before : [""], headingAccent: accent };
}

// ── Blocks renderer helper ────────────────────────────────────────────────────

/**
 * Extracts plain-text h2 headings from Strapi Blocks content.
 * Used to build the article TOC.
 */
export function extractHeadings(blocks: BlockNode[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b): b is Extract<BlockNode, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((b) => b.children.map((c) => c.text ?? "").join(""));
}
