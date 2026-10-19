import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import {
  BLOG_LISTING_PAGE_SIZE,
  getAllBlogSlugs,
  getAllIndustrySlugs,
} from "@/lib/strapi";

/**
 * Sitemap for indexable public pages only.
 * Excludes /thank-you, /start, and legal pages (noindex).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, industrySlugs] = await Promise.all([
    getAllBlogSlugs().catch(() => []),
    getAllIndustrySlugs().catch(() => []),
  ]);

  const buildTime = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: buildTime,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contactus`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/demo`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/api-docs`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const blogPageCount = Math.ceil(blogSlugs.length / BLOG_LISTING_PAGE_SIZE);
  const blogListingPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, blogPageCount - 1) },
    (_, index) => ({
      url: `${SITE_URL}/blog?page=${index + 2}`,
      lastModified: buildTime,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }),
  );

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const industryPages: MetadataRoute.Sitemap = industrySlugs.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/industries/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogListingPages, ...blogPages, ...industryPages];
}
