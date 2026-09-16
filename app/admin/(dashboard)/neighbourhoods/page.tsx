import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Neighbourhoods — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminNeighbourhoodsPlaceholder() {
  const count = await prisma.neighbourhood.count();
  return (
    <AdminPlaceholder
      title="Neighbourhoods"
      description="Manage the neighbourhood guides shown on the public site and their city groupings."
      stats={[{ label: "Total Neighbourhoods", value: String(count) }]}
    />
  );
}
