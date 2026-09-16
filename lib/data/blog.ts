import { cache } from "react";
import type { BlogPost as BlogPostModel } from "@prisma/client";
import { prisma } from "@/lib/db/client";

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

function toRow(post: BlogPostModel): BlogPostRow {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    body: post.body,
    featured_image: post.featuredImage,
    author: post.author,
    published_at: post.publishedAt ? post.publishedAt.toISOString() : null,
    cta_label: post.ctaLabel,
    cta_href: post.ctaHref,
    seo_title: post.seoTitle,
    seo_description: post.seoDescription,
  };
}

export async function getAllBlogPosts(): Promise<BlogPostRow[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map(toRow);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: { status: "published" },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostRow | null> => {
  const row = await prisma.blogPost.findFirst({ where: { slug, status: "published" } });
  return row ? toRow(row) : null;
});

/** Fetches specific posts by slug (for the Homepage's 3-post preview),
 * preserving the requested order rather than published_at order. */
export async function getBlogPostsBySlugs(slugs: string[]): Promise<BlogPostRow[]> {
  if (slugs.length === 0) return [];
  const rows = await prisma.blogPost.findMany({
    where: { slug: { in: slugs }, status: "published" },
  });
  const bySlug = new Map(rows.map((p) => [p.slug, toRow(p)]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPostRow => Boolean(p));
}
