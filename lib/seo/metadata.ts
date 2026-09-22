import type { Metadata } from "next";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path this content is canonically served at, e.g. "/buy" or
   * "/blog/some-post" - resolved against metadataBase (see
   * app/layout.tsx) for both the canonical link and Open Graph url. */
  path: string;
  ogTitle?: string | null;
  ogDescription?: string | null;
  /** Relative (resolved against metadataBase) or absolute image URL. */
  ogImage?: string | null;
  type?: "website" | "article";
};

/** Builds the title/description/canonical/OpenGraph/Twitter-card fields
 * shared by every public page's generateMetadata(), from that page's own
 * CMS-editable title/description plus optional OG overrides - never
 * invented content. Centralizing this is what keeps 15+ pages' metadata
 * consistent (same siteName, same card type, same canonical-URL shape)
 * without copy-pasting the same object literal into each one. */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const ogTitle = input.ogTitle || input.title;
  const ogDescription = input.ogDescription || input.description;
  const images = input.ogImage ? [{ url: input.ogImage }] : undefined;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: input.path,
      siteName: "Saigal Realty Inc., Brokerage",
      type: input.type ?? "website",
      locale: "en_CA",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images,
    },
  };
}
