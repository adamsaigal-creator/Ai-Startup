import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { TeamMemberEditor, type TeamMemberFormValues } from "../TeamMemberEditor";

export async function generateMetadata({
  params,
}: PageProps<"/admin/team/[id]">): Promise<Metadata> {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id }, select: { name: true } });
  return {
    title: `${member?.name ?? "Team Member"} — Team — Saigal Realty Admin`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminTeamMemberEditPage({
  params,
}: PageProps<"/admin/team/[id]">) {
  const { id } = await params;

  const [member, media] = await Promise.all([
    prisma.teamMember.findUnique({ where: { id } }),
    getMediaForPicker(),
  ]);

  if (!member) notFound();

  const initial: TeamMemberFormValues = {
    name: member.name,
    role: member.role,
    photo: member.photo ?? "",
    languages: member.languages ?? "",
    phone: member.phone ?? "",
    email: member.email ?? "",
    bio: member.bio ?? "",
    status: member.status === "draft" ? "draft" : "published",
    displayOrder: member.displayOrder,
  };

  return <TeamMemberEditor mode="edit" id={member.id} currentSlug={member.slug} initial={initial} media={media} />;
}
