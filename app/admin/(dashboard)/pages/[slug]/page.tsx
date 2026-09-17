import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../../_components/AdminPlaceholder";
import { HomepageEditor } from "./HomepageEditor";
import { homepageContentSchema } from "./homepage-schema";

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

export default async function AdminPageEditor({
  params,
}: PageProps<"/admin/pages/[slug]">) {
  const { slug } = await params;

  // Unlike the public site's getPage(), this intentionally has no
  // status filter - admins need to see draft pages too, even though
  // there's no editor for changing status yet.
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  // Phase 4D: only the homepage has a real editor so far. Every other
  // slug still gets the Phase 4C read-only placeholder - see the Phase
  // 4D report for what's intentionally not built yet.
  if (slug === "homepage") {
    const parsed = homepageContentSchema.safeParse(page.content);
    if (!parsed.success) {
      return (
        <AdminPlaceholder
          title="Homepage"
          description="The stored homepage content doesn't match the expected structure, so the editor can't load it safely."
          stats={[{ label: "Validation Error", value: parsed.error.issues[0]?.message ?? "Unknown shape mismatch" }]}
        />
      );
    }

    const media = await prisma.media.findMany({
      select: { storagePath: true },
      orderBy: { filename: "asc" },
    });

    return (
      <div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant-garamond), serif",
            fontSize: "28px",
            fontWeight: 600,
            margin: "0 0 8px",
          }}
        >
          Homepage
        </h1>
        <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
          Editing the live homepage. Changes are saved to the database and appear on the public site immediately.
        </p>
        <HomepageEditor
          initialContent={parsed.data}
          initialSeoTitle={page.seoTitle ?? ""}
          initialSeoDescription={page.seoDescription ?? ""}
          mediaPaths={media.map((m) => m.storagePath)}
        />
      </div>
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
