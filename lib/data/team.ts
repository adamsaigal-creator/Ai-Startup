import { cache } from "react";
import { prisma } from "@/lib/db/client";

export type PublicTeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  photo: string;
  languages: string;
  phone: string;
  phoneHref: string | null;
  email: string | null;
  bio: string | null;
};

const FALLBACK_PHOTO = "/uploads/sraa.png";

function toPublicMember(row: {
  id: string;
  slug: string;
  name: string;
  role: string;
  photo: string | null;
  languages: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
}): PublicTeamMember {
  const digitsOnlyPhone = row.phone ? row.phone.replace(/\D/g, "") : "";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role,
    photo: row.photo || FALLBACK_PHOTO,
    languages: row.languages ?? "",
    phone: row.phone ?? "",
    phoneHref: digitsOnlyPhone ? `tel:${digitsOnlyPhone}` : null,
    email: row.email,
    bio: row.bio,
  };
}

/** Public read layer for the team roster (Phase 4G) - used by both the
 * Homepage carousel and the About page grid, replacing what used to be a
 * hardcoded array in each. Only "published" members are returned; a
 * member set to "hidden" in /admin/team disappears from both places
 * immediately (no redeploy - see the standard revalidatePath() pattern
 * used by the write side in app/admin/(dashboard)/team/actions.ts). */
export const getPublishedTeamMembers = cache(async (): Promise<PublicTeamMember[]> => {
  const rows = await prisma.teamMember.findMany({
    where: { status: "published" },
    orderBy: { displayOrder: "asc" },
  });
  return rows.map(toPublicMember);
});
