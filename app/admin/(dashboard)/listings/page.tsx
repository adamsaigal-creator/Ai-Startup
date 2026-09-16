import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Listings — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminListingsPlaceholder() {
  const [total, featured] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { featured: true } }),
  ]);
  return (
    <AdminPlaceholder
      title="Listings"
      description="Manage manually curated featured listings shown on the Search and city overview pages."
      stats={[
        { label: "Total Listings", value: String(total) },
        { label: "Featured", value: String(featured) },
      ]}
    />
  );
}
