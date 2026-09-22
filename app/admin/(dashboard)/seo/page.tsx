import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { SeoDashboard, type SeoRow } from "./SeoDashboard";

export const metadata: Metadata = {
  title: "SEO — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

// Slugs with a real content editor (Phase 4E) - SEO fields live inside
// that editor's own "SEO" section, so this dashboard links out to it
// rather than duplicating an edit surface for the same two columns. Every
// other Page slug (blog/careers/faq/search/neighbourhoods index/city
// overviews) has no dedicated editor yet, so this dashboard is currently
// the only admin UI that can touch their SEO fields - those rows get an
// inline quick-edit instead of a dead link.
const DEDICATED_PAGE_EDITORS = new Set(["homepage", "buy", "sell", "luxury", "commercial", "about", "contact"]);

function toRow(params: {
  key: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  editHref?: string;
  inlineSlug?: string;
}): SeoRow {
  return {
    key: params.key,
    title: params.title,
    seoTitle: params.seoTitle ?? "",
    seoDescription: params.seoDescription ?? "",
    editHref: params.editHref,
    inlineSlug: params.inlineSlug,
  };
}

export default async function AdminSeoPage() {
  const [pages, neighbourhoods, blogPosts] = await Promise.all([
    prisma.page.findMany({ orderBy: { slug: "asc" } }),
    prisma.neighbourhood.findMany({ orderBy: [{ city: "asc" }, { displayOrder: "asc" }] }),
    prisma.blogPost.findMany({ orderBy: { title: "asc" } }),
  ]);

  const pageRows: SeoRow[] = pages.map((p) =>
    toRow({
      key: `page-${p.slug}`,
      title: p.title,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      editHref: DEDICATED_PAGE_EDITORS.has(p.slug) ? `/admin/pages/${p.slug}` : undefined,
      inlineSlug: DEDICATED_PAGE_EDITORS.has(p.slug) ? undefined : p.slug,
    })
  );

  const neighbourhoodRows: SeoRow[] = neighbourhoods.map((n) =>
    toRow({
      key: `neighbourhood-${n.slug}`,
      title: `${n.name} (${n.city})`,
      seoTitle: n.seoTitle,
      seoDescription: n.seoDescription,
      editHref: `/admin/neighbourhoods/${n.slug}`,
    })
  );

  const blogRows: SeoRow[] = blogPosts.map((b) =>
    toRow({
      key: `blog-${b.slug}`,
      title: b.title,
      seoTitle: b.seoTitle,
      seoDescription: b.seoDescription,
      editHref: `/admin/blog/${b.slug}`,
    })
  );

  return (
    <SeoDashboard
      sections={[
        { label: "Pages", rows: pageRows },
        { label: "Neighbourhoods", rows: neighbourhoodRows },
        { label: "Blog Posts", rows: blogRows },
      ]}
    />
  );
}
