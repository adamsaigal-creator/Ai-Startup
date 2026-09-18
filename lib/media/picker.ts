import "server-only";
import { prisma } from "@/lib/db/client";

/** Reusable data-loading API for any admin editor that needs to offer
 * image selection - not just the Media Library page itself. Future
 * editors (Neighbourhoods, Team/Realtor, Blog, Listings, and eventually
 * the standard-page image fields) can call this instead of writing their
 * own prisma.media query. Not wired into any editor yet per Phase 4F's
 * scope - this is the foundation those phases will build on. */
export type MediaPickerItem = {
  id: string;
  storagePath: string;
  filename: string;
  altText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
};

export async function getMediaForPicker(): Promise<MediaPickerItem[]> {
  const rows = await prisma.media.findMany({
    select: { id: true, storagePath: true, filename: true, altText: true, caption: true, width: true, height: true },
    orderBy: { createdAt: "desc" },
  });
  return rows;
}
