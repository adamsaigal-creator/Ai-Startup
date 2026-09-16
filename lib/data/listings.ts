import { createPublicClient } from "@/lib/supabase/public";

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

const LISTING_COLUMNS = "id, address, city, neighbourhood, price, beds, baths, property_type, description, image, listing_url";

/** Featured, published listings for a city's "Featured Listings" grid.
 * Schema is IDX/PropTx-compatible by design - a future feed import can
 * populate this same table without a redesign. */
export async function getFeaturedListings(city: string, limit = 3): Promise<ListingRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("city", city)
    .eq("featured", true)
    .limit(limit);
  if (error) throw new Error(`Failed to load listings for "${city}": ${error.message}`);
  return data ?? [];
}
