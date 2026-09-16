import { cache } from "react";
import { prisma } from "@/lib/db/client";

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

export type ResolvedNeighbourhood = {
  row: NeighbourhoodRow;
  image: string;
  slotId: string;
  cityOverviewHref: string;
};

/** Matches the original DCLogic renderVals() fallback: an unknown (or
 * unpublished) slug renders a graceful "coming soon" page rather than a
 * 404. */
export const getNeighbourhood = cache(async (slug: string): Promise<ResolvedNeighbourhood> => {
  const found = await prisma.neighbourhood.findFirst({ where: { slug, status: "published" } });

  const row: NeighbourhoodRow = found
    ? {
        slug: found.slug,
        name: found.name,
        city: found.city,
        headline: found.headline,
        introduction: found.introduction,
        description: found.description,
        housing: found.housing,
        lifestyle: found.lifestyle,
        schools: found.schools,
        amenities: found.amenities,
        commute: found.commute,
        cta_label: found.ctaLabel,
        cta_href: found.ctaHref,
        custom_image: found.customImage,
        seo_title: found.seoTitle,
        seo_description: found.seoDescription,
      }
    : { ...FALLBACK, slug };

  const image = row.custom_image ?? CITY_MASTER_IMAGE[row.city] ?? "/images/neighbourhoods-hero.png";
  return {
    row,
    image,
    slotId: "sub-" + slug,
    cityOverviewHref: row.cta_href ?? CITY_OVERVIEW_HREF[row.city] ?? "/neighbourhoods",
  };
});

export async function getAllNeighbourhoodSlugs(): Promise<string[]> {
  const rows = await prisma.neighbourhood.findMany({
    where: { status: "published" },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export type NeighbourhoodLink = { slug: string; name: string };

/** Ordered by display_order, matching the original curated list order
 * (not alphabetical) - used by the /neighbourhoods directory page. */
export async function getNeighbourhoodsByCity(city: string): Promise<NeighbourhoodLink[]> {
  return prisma.neighbourhood.findMany({
    where: { city, status: "published" },
    orderBy: { displayOrder: "asc" },
    select: { slug: true, name: true },
  });
}
