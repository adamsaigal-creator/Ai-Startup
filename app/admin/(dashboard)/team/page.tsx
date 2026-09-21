import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { TeamList, type TeamListRow } from "./TeamList";

export const metadata: Metadata = {
  title: "Team — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTeamPage() {
  const rows = await prisma.teamMember.findMany({
    orderBy: { displayOrder: "asc" },
    select: { id: true, slug: true, name: true, role: true, photo: true, status: true, displayOrder: true },
  });

  const list: TeamListRow[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    role: r.role,
    photo: r.photo,
    status: r.status,
    displayOrder: r.displayOrder,
  }));

  return <TeamList initialItems={list} />;
}
