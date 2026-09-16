import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type BlogPostRow = {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: string | null;
  featured_image: string | null;
  author: string | null;
  published_at: string | null;
  cta_label: string | null;
  cta_href: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

const BLOG_COLUMNS =
  "slug, title, category, excerpt, body, featured_image, author, published_at, cta_label, cta_href, seo_title, seo_description";

export async function getAllBlogPosts(): Promise<BlogPostRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(BLOG_COLUMNS)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Failed to load blog posts: ${error.message}`);
  return data ?? [];
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("blog_posts").select("slug");
  if (error) throw new Error(`Failed to load blog slugs: ${error.message}`);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostRow | null> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(BLOG_COLUMNS)
    .eq("slug", slug)
    .maybeSingle<BlogPostRow>();
  if (error) throw new Error(`Failed to load blog post "${slug}": ${error.message}`);
  return data;
});

/** Fetches specific posts by slug (for the Homepage's 3-post preview),
 * preserving the requested order rather than published_at order. */
export async function getBlogPostsBySlugs(slugs: string[]): Promise<BlogPostRow[]> {
  if (slugs.length === 0) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("blog_posts").select(BLOG_COLUMNS).in("slug", slugs);
  if (error) throw new Error(`Failed to load blog posts by slug: ${error.message}`);
  const bySlug = new Map((data ?? []).map((p: BlogPostRow) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPostRow => Boolean(p));
}
