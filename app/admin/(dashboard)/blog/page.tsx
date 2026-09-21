import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { BlogList, type BlogListRow } from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric" });

export default async function AdminBlogPage() {
  const rows = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
  });

  const list: BlogListRow[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    status: r.status,
    featuredImage: r.featuredImage,
    publishedAtLabel: r.publishedAt ? dateFormatter.format(r.publishedAt) : "Not set",
    updatedAtLabel: dateFormatter.format(r.updatedAt),
  }));

  return <BlogList initialItems={list} />;
}
