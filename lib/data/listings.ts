import { prisma } from "@/lib/db/client";

export type ListingRow = {
  id: string;
  address: string;
  city: string;
  neighbourhood: string | null;
  price: number | null;
  beds: number | null;
  baths: number | null;
  property_type: string | null;
  description: string | null;
  image: string | null;
  listing_url: string | null;
};

/** Featured, published listings for a city's "Featured Listings" grid.
 * Schema is IDX/PropTx-compatible by design - a future feed import can
 * populate this same table without a redesign. */
export async function getFeaturedListings(city: string, limit = 3): Promise<ListingRow[]> {
  const rows = await prisma.listing.findMany({
    where: { city, featured: true, status: "published" },
    take: limit,
  });
  return rows.map((row) => ({
    id: row.id,
    address: row.address,
    city: row.city,
    neighbourhood: row.neighbourhood,
    price: row.price ? row.price.toNumber() : null,
    beds: row.beds,
    baths: row.baths ? row.baths.toNumber() : null,
    property_type: row.propertyType,
    description: row.description,
    image: row.image,
    listing_url: row.listingUrl,
  }));
}
