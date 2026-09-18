import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { z } from "zod";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../../_components/AdminPlaceholder";
import { PageEditorShell } from "../_components/AdminEditorKit";
import { HomepageEditor } from "./HomepageEditor";
import { homepageContentSchema } from "./homepage-schema";
import { BuyEditor } from "./BuyEditor";
import { SellEditor } from "./SellEditor";
import { LuxuryEditor } from "./LuxuryEditor";
import { CommercialEditor } from "./CommercialEditor";
import { AboutEditor } from "./AboutEditor";
import { ContactEditor } from "./ContactEditor";
import {
  buyContentSchema,
  sellContentSchema,
  luxuryContentSchema,
  commercialContentSchema,
  aboutContentSchema,
  contactContentSchema,
} from "../_lib/standard-page-schemas";

export async function generateMetadata({
  params,
}: PageProps<"/admin/pages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} — Saigal Realty Admin`, robots: { index: false, follow: false } };
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

async function getMediaPaths(): Promise<string[]> {
  const media = await prisma.media.findMany({
    select: { storagePath: true },
    orderBy: { filename: "asc" },
  });
  return media.map((m) => m.storagePath);
}

type ValidateResult<T> = { ok: true; data: T } | { ok: false; message: string };

function validateContent<T>(content: unknown, schema: z.ZodType<T>): ValidateResult<T> {
  const parsed = schema.safeParse(content);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Unknown shape mismatch" };
  }
  return { ok: true, data: parsed.data };
}

function InvalidContentPlaceholder({ title, message }: { title: string; message: string }) {
  return (
    <AdminPlaceholder
      title={title}
      description="The stored content doesn't match the expected structure, so the editor can't load it safely."
      stats={[{ label: "Validation Error", value: message }]}
    />
  );
}

export default async function AdminPageEditor({
  params,
}: PageProps<"/admin/pages/[slug]">) {
  const { slug } = await params;

  // Unlike the public site's getPage(), this intentionally has no
  // status filter - admins need to see draft pages too, even though
  // there's no editor for changing status yet.
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  // Phase 4D/4E: homepage, buy, sell, luxury, commercial, about, and
  // contact have real editors. Every other slug still gets the Phase 4C
  // read-only placeholder - see the Phase 4E report for what's
  // intentionally not built yet (neighbourhoods, blog, media, listings,
  // site settings, users).
  if (slug === "homepage") {
    const result = validateContent(page.content, homepageContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Homepage" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Homepage">
        <HomepageEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "buy") {
    const result = validateContent(page.content, buyContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Buy" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Buy">
        <BuyEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "sell") {
    const result = validateContent(page.content, sellContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Sell" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Sell">
        <SellEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "luxury") {
    const result = validateContent(page.content, luxuryContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Luxury" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Luxury">
        <LuxuryEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "commercial") {
    const result = validateContent(page.content, commercialContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Commercial" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Commercial">
        <CommercialEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "about") {
    const result = validateContent(page.content, aboutContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="About" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="About">
        <AboutEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  if (slug === "contact") {
    const result = validateContent(page.content, contactContentSchema);
    if (!result.ok) return <InvalidContentPlaceholder title="Contact" message={result.message} />;
    const mediaPaths = await getMediaPaths();
    return (
      <PageEditorShell title="Contact">
        <ContactEditor
          initialContent={result.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={mediaPaths}
        />
      </PageEditorShell>
    );
  }

  return (
    <AdminPlaceholder
      title={page.title}
      description={`Slug: ${page.slug}`}
      stats={[
        { label: "Status", value: page.status },
        { label: "Last Updated", value: dateFormatter.format(page.updatedAt) },
      ]}
    />
  );
}
