import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Media Library — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMediaPlaceholder() {
  const count = await prisma.media.count();
  return (
    <AdminPlaceholder
      title="Media Library"
      description="Browse and manage images used across the website."
      stats={[{ label: "Total Media Files", value: String(count) }]}
    />
  );
}
