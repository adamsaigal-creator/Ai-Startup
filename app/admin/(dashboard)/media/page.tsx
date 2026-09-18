import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { MediaLibrary, type MediaLibraryRow } from "./MediaLibrary";

export const metadata: Metadata = {
  title: "Media Library — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function formatFileSize(bytes: bigint | null): string {
  if (bytes === null) return "—";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  const rows: MediaLibraryRow[] = media.map((m) => ({
    id: m.id,
    storagePath: m.storagePath,
    filename: m.filename,
    altText: m.altText ?? "",
    caption: m.caption ?? "",
    width: m.width,
    height: m.height,
    mimeType: m.mimeType,
    fileSizeLabel: formatFileSize(m.fileSize),
    uploadedAtLabel: dateFormatter.format(m.createdAt),
  }));

  return <MediaLibrary initialItems={rows} />;
}
