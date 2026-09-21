import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { NeighbourhoodList, type NeighbourhoodListRow } from "./NeighbourhoodList";

export const metadata: Metadata = {
  title: "Neighbourhoods — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

// Every neighbourhood currently falls back to a shared city (or fully
// generic) master photo rather than having its own - see
// lib/data/neighbourhoods.ts's CITY_MASTER_IMAGE. A neighbourhood whose
// city isn't Milton/Oakville/Burlington (i.e. Mississauga or Kitchener)
// falls all the way through to the generic /images/neighbourhoods-hero.png
// placeholder rather than even a city-specific photo, which is the more
// visibly "missing" case - flagged distinctly in the list below.
const CITIES_WITH_MASTER_PHOTO = new Set(["Milton", "Oakville", "Burlington"]);

export default async function AdminNeighbourhoodsPage() {
  const rows = await prisma.neighbourhood.findMany({
    orderBy: [{ city: "asc" }, { displayOrder: "asc" }],
    select: { id: true, slug: true, name: true, city: true, status: true, displayOrder: true, customImage: true },
  });

  const list: NeighbourhoodListRow[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    city: r.city,
    status: r.status,
    displayOrder: r.displayOrder,
    hasCustomImage: r.customImage !== null,
    usesGenericFallback: r.customImage === null && !CITIES_WITH_MASTER_PHOTO.has(r.city),
  }));

  return <NeighbourhoodList initialItems={list} />;
}
