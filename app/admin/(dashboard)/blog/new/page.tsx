import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { BlogPostEditor, type BlogPostFormValues } from "../BlogPostEditor";

export const metadata: Metadata = {
  title: "New Blog Post — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const EMPTY: BlogPostFormValues = {
  title: "",
  category: "",
  excerpt: "",
  body: "",
  featuredImage: "",
  author: "Saigal Realty Team",
  publishedAt: "",
  ctaLabel: "",
  ctaHref: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
};

export default async function AdminNewBlogPostPage() {
  const [categoryRows, media] = await Promise.all([
    prisma.blogPost.findMany({ select: { category: true }, distinct: ["category"] }),
    getMediaForPicker(),
  ]);
  const existingCategories = categoryRows.map((c) => c.category).filter((c): c is string => Boolean(c)).sort();

  return <BlogPostEditor mode="create" initial={EMPTY} existingCategories={existingCategories} media={media} />;
}
