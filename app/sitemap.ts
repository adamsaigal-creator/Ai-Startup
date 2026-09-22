import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site-url";
import { getAllNeighbourhoodSlugs } from "@/lib/data/neighbourhoods";
import { getAllBlogSlugs } from "@/lib/data/blog";

const STATIC_PATHS = [
  "/",
  "/buy",
  "/sell",
  "/luxury",
  "/commercial",
  "/about",
  "/contact",
  "/careers",
  "/faq",
  "/search",
  "/blog",
  "/neighbourhoods",
  "/neighbourhoods/milton",
  "/neighbourhoods/oakville",
  "/neighbourhoods/burlington",
];

/** Only published content ever appears here - getAllNeighbourhoodSlugs()
 * and getAllBlogSlugs() already filter to status: "published" (see
 * lib/data/neighbourhoods.ts and lib/data/blog.ts), same filter the pages
 * themselves use to decide what's publicly reachable at all. /admin/* is
 * never included - see app/robots.ts. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [neighbourhoodSlugs, blogSlugs] = await Promise.all([getAllNeighbourhoodSlugs(), getAllBlogSlugs()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" || path === "/blog" || path === "/search" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const neighbourhoodEntries: MetadataRoute.Sitemap = neighbourhoodSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...neighbourhoodEntries, ...blogEntries];
}
