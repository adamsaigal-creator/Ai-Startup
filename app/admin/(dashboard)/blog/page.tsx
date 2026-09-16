import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Blog — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPlaceholder() {
  const count = await prisma.blogPost.count();
  return (
    <AdminPlaceholder
      title="Blog"
      description="Manage blog articles, categories, and publish dates."
      stats={[{ label: "Total Posts", value: String(count) }]}
    />
  );
}
