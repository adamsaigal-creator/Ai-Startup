import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

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

const PAGE_COLUMNS =
  "id, slug, title, content, seo_title, seo_description, og_title, og_description, og_image, status";

/** cache() dedupes repeated calls with the same slug within one render
 * pass (generateMetadata + the page body both call this). */
export const getPage = cache(async (slug: string): Promise<PageRow | null> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("pages")
    .select(PAGE_COLUMNS)
    .eq("slug", slug)
    .maybeSingle<PageRow>();
  if (error) throw new Error(`Failed to load page "${slug}": ${error.message}`);
  return data;
});
