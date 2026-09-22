"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";
import { optionalSafeHref } from "@/lib/validation/safe-href";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const optionalText = (max: number) => z.string().trim().max(max).transform((v) => (v === "" ? null : v)).nullable();

// Every field here already exists on the Prisma Neighbourhood model from
// Phase 4A - Phase 4G adds the admin UI, not a new data shape (see the
// Phase 4G report). `slug` is deliberately not part of this schema: it's
// the public URL (/[slug]) and this repo's Phase 4E precedent treats an
// identifier like that as create-time only, never casually editable.
const contentFieldsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  headline: optionalText(300),
  introduction: optionalText(2000),
  description: optionalText(4000),
  housing: optionalText(2000),
  lifestyle: optionalText(2000),
  schools: optionalText(2000),
  amenities: optionalText(2000),
  commute: optionalText(2000),
  ctaLabel: optionalText(100),
  ctaHref: optionalSafeHref(300),
  customImage: optionalText(500),
  seoTitle: optionalText(300),
  seoDescription: optionalText(500),
  status: z.enum(["draft", "published"]),
  displayOrder: z.coerce.number().int().min(0).max(9999),
});

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(150)
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

export async function updateNeighbourhoodAction(id: string, payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = contentFieldsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const existing = await prisma.neighbourhood.findUnique({ where: { id }, select: { slug: true, city: true } });
  if (!existing) {
    return { ok: false, error: "That neighbourhood no longer exists." };
  }

  try {
    await prisma.neighbourhood.update({ where: { id }, data: parsed.data });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  revalidatePath(`/${existing.slug}`);
  revalidatePath("/neighbourhoods");
  revalidatePath(`/admin/neighbourhoods/${existing.slug}`);
  return { ok: true, data: undefined };
}

export async function createNeighbourhoodAction(payload: unknown): Promise<ActionResult<{ slug: string }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  const parsed = z
    .object({ slug: slugSchema })
    .and(contentFieldsSchema)
    .safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const { slug, ...data } = parsed.data;

  const existing = await prisma.neighbourhood.findUnique({ where: { slug }, select: { id: true } });
  if (existing) {
    return { ok: false, error: `A neighbourhood with slug "${slug}" already exists.` };
  }

  try {
    await prisma.neighbourhood.create({ data: { slug, ...data } });
  } catch {
    return { ok: false, error: "Could not create the neighbourhood. Please try again." };
  }

  revalidatePath("/neighbourhoods");
  revalidatePath("/admin/neighbourhoods");
  return { ok: true, data: { slug } };
}

export async function deleteNeighbourhoodAction(id: string): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const existing = await prisma.neighbourhood.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return { ok: false, error: "That neighbourhood no longer exists." };
  }
  await prisma.neighbourhood.delete({ where: { id } });
  revalidatePath(`/${existing.slug}`);
  revalidatePath("/neighbourhoods");
  revalidatePath("/admin/neighbourhoods");
  return { ok: true, data: undefined };
}
