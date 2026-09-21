import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { BlogPostEditor, type BlogPostFormValues } from "../BlogPostEditor";

export async function generateMetadata({
  params,
}: PageProps<"/admin/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} — Blog — Saigal Realty Admin`, robots: { index: false, follow: false } };
}

function toDatetimeLocal(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 16);
}

export default async function AdminBlogEditPage({
  params,
}: PageProps<"/admin/blog/[slug]">) {
  const { slug } = await params;

  const [post, categoryRows, media] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug } }),
    prisma.blogPost.findMany({ select: { category: true }, distinct: ["category"] }),
    getMediaForPicker(),
  ]);

  if (!post) notFound();

  const initial: BlogPostFormValues = {
    title: post.title,
    category: post.category ?? "",
    excerpt: post.excerpt ?? "",
    body: post.body ?? "",
    featuredImage: post.featuredImage ?? "",
    author: post.author ?? "",
    publishedAt: toDatetimeLocal(post.publishedAt),
    ctaLabel: post.ctaLabel ?? "",
    ctaHref: post.ctaHref ?? "",
    status: post.status === "draft" ? "draft" : "published",
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
  };

  const existingCategories = categoryRows.map((c) => c.category).filter((c): c is string => Boolean(c)).sort();

  return (
    <BlogPostEditor mode="edit" id={post.id} currentSlug={post.slug} initial={initial} existingCategories={existingCategories} media={media} />
  );
}
