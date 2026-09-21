import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { NeighbourhoodEditor, type NeighbourhoodFormValues } from "../NeighbourhoodEditor";

export async function generateMetadata({
  params,
}: PageProps<"/admin/neighbourhoods/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} — Neighbourhoods — Saigal Realty Admin`, robots: { index: false, follow: false } };
}

function toFormValues(n: {
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
  ctaLabel: string | null;
  ctaHref: string | null;
  customImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  status: string;
  displayOrder: number;
}): NeighbourhoodFormValues {
  return {
    name: n.name,
    city: n.city,
    headline: n.headline ?? "",
    introduction: n.introduction ?? "",
    description: n.description ?? "",
    housing: n.housing ?? "",
    lifestyle: n.lifestyle ?? "",
    schools: n.schools ?? "",
    amenities: n.amenities ?? "",
    commute: n.commute ?? "",
    ctaLabel: n.ctaLabel ?? "",
    ctaHref: n.ctaHref ?? "",
    customImage: n.customImage ?? "",
    seoTitle: n.seoTitle ?? "",
    seoDescription: n.seoDescription ?? "",
    status: n.status === "draft" ? "draft" : "published",
    displayOrder: n.displayOrder,
  };
}

export default async function AdminNeighbourhoodEditPage({
  params,
}: PageProps<"/admin/neighbourhoods/[slug]">) {
  const { slug } = await params;

  const [neighbourhood, cityRows, media] = await Promise.all([
    prisma.neighbourhood.findUnique({ where: { slug } }),
    prisma.neighbourhood.findMany({ select: { city: true }, distinct: ["city"] }),
    getMediaForPicker(),
  ]);

  if (!neighbourhood) notFound();

  return (
    <NeighbourhoodEditor
      mode="edit"
      id={neighbourhood.id}
      currentSlug={neighbourhood.slug}
      initial={toFormValues(neighbourhood)}
      existingCities={cityRows.map((c) => c.city).sort()}
      media={media}
    />
  );
}
