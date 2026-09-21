import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { ListingList, type ListingListRow } from "./ListingList";

export const metadata: Metadata = {
  title: "Listings — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric" });

export default async function AdminListingsPage() {
  const rows = await prisma.listing.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  const list: ListingListRow[] = rows.map((r) => ({
    id: r.id,
    address: r.address,
    city: r.city,
    propertyType: r.propertyType,
    price: r.price ? r.price.toNumber() : null,
    status: r.status,
    featured: r.featured,
    image: r.image,
    updatedAtLabel: dateFormatter.format(r.updatedAt),
  }));

  return <ListingList initialItems={list} />;
}
