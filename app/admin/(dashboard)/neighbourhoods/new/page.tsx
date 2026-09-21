import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { NeighbourhoodEditor, type NeighbourhoodFormValues } from "../NeighbourhoodEditor";

export const metadata: Metadata = {
  title: "New Neighbourhood — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const EMPTY: NeighbourhoodFormValues = {
  name: "",
  city: "",
  headline: "",
  introduction: "",
  description: "",
  housing: "",
  lifestyle: "",
  schools: "",
  amenities: "",
  commute: "",
  ctaLabel: "",
  ctaHref: "",
  customImage: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  displayOrder: 0,
};

export default async function AdminNewNeighbourhoodPage() {
  const [cityRows, media] = await Promise.all([
    prisma.neighbourhood.findMany({ select: { city: true }, distinct: ["city"] }),
    getMediaForPicker(),
  ]);

  return (
    <NeighbourhoodEditor
      mode="create"
      initial={EMPTY}
      existingCities={cityRows.map((c) => c.city).sort()}
      media={media}
    />
  );
}
