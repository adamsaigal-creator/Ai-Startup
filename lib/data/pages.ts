import { cache } from "react";
import { prisma } from "@/lib/db/client";

export type PageRow = {
  id: string;
  slug: string;
  title: string;
  // Section shape varies per page by design (hero/services/faq/...) - each
  // page component casts this to its own expected shape rather than one
  // giant union type covering all 15 pages.
  content: Record<string, any>;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  status: string;
};

/** cache() dedupes repeated calls with the same slug within one render
 * pass (generateMetadata + the page body both call this).
 *
 * `status: "published"` is explicit here because there is no database-level
 * RLS on this self-hosted Postgres instance (unlike the earlier Supabase
 * setup) - the database is only ever reached from server code, and this
 * filter is what keeps draft pages off the public site. */
export const getPage = cache(async (slug: string): Promise<PageRow | null> => {
  const row = await prisma.page.findFirst({ where: { slug, status: "published" } });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content as Record<string, any>,
    seo_title: row.seoTitle,
    seo_description: row.seoDescription,
    og_title: row.ogTitle,
    og_description: row.ogDescription,
    og_image: row.ogImage,
    status: row.status,
  };
});
