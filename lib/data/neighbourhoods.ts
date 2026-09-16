import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export type NeighbourhoodRow = {
  slug: string;
  name: string;
  city: string;
  headline: string | null;
  introduction: string | null;
  description: string | null;
  housing: string | null;
  lifestyle: string | null;
  schools: string | null;
  amenities: string | null;
  commute: string | null;
  cta_label: string | null;
  cta_href: string | null;
  custom_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

// City reuse rule, preserved from the original design: every neighbourhood
// in a city shares that city's single master photo unless custom_image is
// set on its own row.
const CITY_MASTER_IMAGE: Record<string, string> = {
  Milton: "/images/city-milton.png",
  Oakville: "/images/city-oakville.png",
  Burlington: "/images/city-burlington.png",
  Mississauga: "/images/neighbourhoods-hero.png",
  Kitchener: "/images/neighbourhoods-hero.png",
};

const CITY_OVERVIEW_HREF: Record<string, string> = {
  Milton: "/neighbourhoods/milton",
  Oakville: "/neighbourhoods/oakville",
  Burlington: "/neighbourhoods/burlington",
  Mississauga: "/neighbourhoods#mississauga",
  Kitchener: "/neighbourhoods#kitchener",
};

const FALLBACK: NeighbourhoodRow = {
  slug: "",
  name: "This Area",
  city: "Milton",
  headline: "",
  introduction: null,
  description: "Neighbourhood details coming soon.",
  housing: null,
  lifestyle: "",
  schools: "",
  amenities: null,
  commute: "",
  cta_label: null,
  cta_href: null,
  custom_image: null,
  seo_title: null,
  seo_description: null,
};

const NEIGHBOURHOOD_COLUMNS =
  "slug, name, city, headline, introduction, description, housing, lifestyle, schools, amenities, commute, cta_label, cta_href, custom_image, seo_title, seo_description";

export type ResolvedNeighbourhood = {
  row: NeighbourhoodRow;
  image: string;
  slotId: string;
  cityOverviewHref: string;
};

/** Matches the original DCLogic renderVals() fallback: an unknown slug
 * renders a graceful "coming soon" page rather than a 404. */
export const getNeighbourhood = cache(async (slug: string): Promise<ResolvedNeighbourhood> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("neighbourhoods")
    .select(NEIGHBOURHOOD_COLUMNS)
    .eq("slug", slug)
    .maybeSingle<NeighbourhoodRow>();
  if (error) throw new Error(`Failed to load neighbourhood "${slug}": ${error.message}`);

  const row = data ?? { ...FALLBACK, slug };
  const image = row.custom_image ?? CITY_MASTER_IMAGE[row.city] ?? "/images/neighbourhoods-hero.png";
  return {
    row,
    image,
    slotId: "sub-" + slug,
    cityOverviewHref: row.cta_href ?? CITY_OVERVIEW_HREF[row.city] ?? "/neighbourhoods",
  };
});

export async function getAllNeighbourhoodSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("neighbourhoods").select("slug");
  if (error) throw new Error(`Failed to load neighbourhood slugs: ${error.message}`);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export type NeighbourhoodLink = { slug: string; name: string };

/** Ordered by display_order, matching the original curated list order
 * (not alphabetical) - used by the /neighbourhoods directory page. */
export async function getNeighbourhoodsByCity(city: string): Promise<NeighbourhoodLink[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("neighbourhoods")
    .select("slug, name")
    .eq("city", city)
    .order("display_order", { ascending: true });
  if (error) throw new Error(`Failed to load neighbourhoods for city "${city}": ${error.message}`);
  return data ?? [];
}
