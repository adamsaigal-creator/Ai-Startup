"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const optionalText = (max: number) => z.string().trim().max(max).transform((v) => (v === "" ? null : v)).nullable();

// A team member's public appearance is the Homepage carousel and the
// About grid - both revalidated on every save, so a photo or field change
// shows up everywhere without a redeploy (see the Phase 4G report).
const PUBLIC_PATHS = ["/", "/about"] as const;

// `slug` is deliberately not part of this schema - see the doc comment on
// TeamMember.slug in prisma/schema.prisma. It's set once at creation and
// never exposed as an editable field afterward.
const contentFieldsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(150),
  role: z.string().trim().min(1, "Role is required").max(150),
  photo: optionalText(500),
  languages: optionalText(200),
  phone: optionalText(50),
  email: optionalText(200),
  bio: optionalText(2000),
  status: z.enum(["draft", "published"]),
  displayOrder: z.coerce.number().int().min(0).max(9999),
});

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(60)
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

function revalidatePublicPaths() {
  for (const path of PUBLIC_PATHS) revalidatePath(path);
}

export async function updateTeamMemberAction(id: string, payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = contentFieldsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const existing = await prisma.teamMember.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { ok: false, error: "That team member no longer exists." };
  }

  try {
    await prisma.teamMember.update({ where: { id }, data: parsed.data });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  revalidatePublicPaths();
  revalidatePath("/admin/team");
  return { ok: true, data: undefined };
}

export async function createTeamMemberAction(payload: unknown): Promise<ActionResult<{ id: string }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  const parsed = z.object({ slug: slugSchema }).and(contentFieldsSchema).safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const { slug, ...data } = parsed.data;

  const existing = await prisma.teamMember.findUnique({ where: { slug }, select: { id: true } });
  if (existing) {
    return { ok: false, error: `A team member with slug "${slug}" already exists.` };
  }

  const created = await prisma.teamMember.create({ data: { slug, ...data } });

  revalidatePublicPaths();
  revalidatePath("/admin/team");
  return { ok: true, data: { id: created.id } };
}

export async function deleteTeamMemberAction(id: string): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const existing = await prisma.teamMember.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { ok: false, error: "That team member no longer exists." };
  }
  await prisma.teamMember.delete({ where: { id } });
  revalidatePublicPaths();
  revalidatePath("/admin/team");
  return { ok: true, data: undefined };
}
