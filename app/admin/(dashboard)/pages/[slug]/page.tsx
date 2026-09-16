import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../../_components/AdminPlaceholder";

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

export default async function AdminPageEditorPlaceholder({
  params,
}: PageProps<"/admin/pages/[slug]">) {
  const { slug } = await params;

  // Unlike the public site's getPage(), this intentionally has no
  // status filter - admins need to see draft pages too, even though
  // there's no editor to change status yet.
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

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
