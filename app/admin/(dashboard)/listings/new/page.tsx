import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { ListingEditor, type ListingFormValues } from "../ListingEditor";

export const metadata: Metadata = {
  title: "New Listing — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const FALLBACK_PROPERTY_TYPES = ["Residential", "Commercial", "Condo", "Land"];

const EMPTY: ListingFormValues = {
  address: "",
  city: "",
  neighbourhood: "",
  price: "",
  beds: "",
  baths: "",
  propertyType: "",
  description: "",
  image: "",
  listingUrl: "",
  featured: false,
  status: "draft",
};

export default async function AdminNewListingPage() {
  const [listingCities, listingNeighbourhoods, listingPropertyTypes, neighbourhoodCities, neighbourhoodNames, media] = await Promise.all([
    prisma.listing.findMany({ select: { city: true }, distinct: ["city"] }),
    prisma.listing.findMany({ select: { neighbourhood: true }, distinct: ["neighbourhood"] }),
    prisma.listing.findMany({ select: { propertyType: true }, distinct: ["propertyType"] }),
    prisma.neighbourhood.findMany({ select: { city: true }, distinct: ["city"] }),
    prisma.neighbourhood.findMany({ select: { name: true } }),
    getMediaForPicker(),
  ]);

  const existingCities = Array.from(
    new Set([...listingCities.map((c) => c.city), ...neighbourhoodCities.map((c) => c.city)])
  ).sort();
  const existingNeighbourhoods = Array.from(
    new Set([
      ...listingNeighbourhoods.map((n) => n.neighbourhood).filter((n): n is string => Boolean(n)),
      ...neighbourhoodNames.map((n) => n.name),
    ])
  ).sort();
  const existingPropertyTypes = Array.from(
    new Set([...listingPropertyTypes.map((t) => t.propertyType).filter((t): t is string => Boolean(t)), ...FALLBACK_PROPERTY_TYPES])
  ).sort();

  return (
    <ListingEditor
      mode="create"
      initial={EMPTY}
      existingCities={existingCities}
      existingNeighbourhoods={existingNeighbourhoods}
      existingPropertyTypes={existingPropertyTypes}
      media={media}
    />
  );
}
