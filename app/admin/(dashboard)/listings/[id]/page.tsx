import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { ListingEditor, type ListingFormValues } from "../ListingEditor";

export async function generateMetadata({
  params,
}: PageProps<"/admin/listings/[id]">): Promise<Metadata> {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id }, select: { address: true } });
  return {
    title: `${listing?.address ?? "Listing"} — Listings — Saigal Realty Admin`,
    robots: { index: false, follow: false },
  };
}

const FALLBACK_PROPERTY_TYPES = ["Residential", "Commercial", "Condo", "Land"];

export default async function AdminListingEditPage({
  params,
}: PageProps<"/admin/listings/[id]">) {
  const { id } = await params;

  const [listing, listingCities, listingNeighbourhoods, listingPropertyTypes, neighbourhoodCities, neighbourhoodNames, media] =
    await Promise.all([
      prisma.listing.findUnique({ where: { id } }),
      prisma.listing.findMany({ select: { city: true }, distinct: ["city"] }),
      prisma.listing.findMany({ select: { neighbourhood: true }, distinct: ["neighbourhood"] }),
      prisma.listing.findMany({ select: { propertyType: true }, distinct: ["propertyType"] }),
      prisma.neighbourhood.findMany({ select: { city: true }, distinct: ["city"] }),
      prisma.neighbourhood.findMany({ select: { name: true } }),
      getMediaForPicker(),
    ]);

  if (!listing) notFound();

  const initial: ListingFormValues = {
    address: listing.address,
    city: listing.city,
    neighbourhood: listing.neighbourhood ?? "",
    price: listing.price ? listing.price.toString() : "",
    beds: listing.beds !== null ? String(listing.beds) : "",
    baths: listing.baths ? listing.baths.toString() : "",
    propertyType: listing.propertyType ?? "",
    description: listing.description ?? "",
    image: listing.image ?? "",
    listingUrl: listing.listingUrl ?? "",
    featured: listing.featured,
    status: (["draft", "published", "pending", "sold", "inactive"] as const).includes(listing.status as never)
      ? (listing.status as ListingFormValues["status"])
      : "draft",
  };

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
      mode="edit"
      id={listing.id}
      initial={initial}
      existingCities={existingCities}
      existingNeighbourhoods={existingNeighbourhoods}
      existingPropertyTypes={existingPropertyTypes}
      media={media}
    />
  );
}
