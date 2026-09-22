"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";
import { optionalSafeHref } from "@/lib/validation/safe-href";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const optionalText = (max: number) => z.string().trim().max(max).transform((v) => (v === "" ? null : v)).nullable();
const optionalNumber = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .refine((v) => v === null || !Number.isNaN(Number(v)), "Must be a number")
  .transform((v) => (v === null ? null : Number(v)))
  .refine((v) => v === null || v >= 0, "Must not be negative");

// Every field here already exists on the Prisma Listing model from
// Phase 4A - Phase 4I adds the admin UI, not a new data shape. Listing
// has no slug (only a UUID id, never exposed as an editable field - see
// the Phase 4I report) and no per-listing public page: it's shown as a
// card on /search and on the Milton/Oakville/Burlington overview pages,
// keyed by city + featured + status, not by identity.
const contentFieldsSchema = z.object({
  address: z.string().trim().min(1, "Address is required").max(300),
  city: z.string().trim().min(1, "City is required").max(100),
  neighbourhood: optionalText(150),
  price: optionalNumber,
  beds: optionalNumber,
  baths: optionalNumber,
  propertyType: optionalText(100),
  description: optionalText(3000),
  image: optionalText(500),
  listingUrl: optionalSafeHref(500),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "pending", "sold", "inactive"]),
});

type ContentFields = z.infer<typeof contentFieldsSchema>;

function toData(data: ContentFields) {
  return {
    ...data,
    price: data.price === null ? null : new Prisma.Decimal(data.price),
    beds: data.beds === null ? null : Math.round(data.beds),
    baths: data.baths === null ? null : new Prisma.Decimal(data.baths),
  };
}

const CITY_ROUTES: Record<string, string> = {
  milton: "/neighbourhoods/milton",
  oakville: "/neighbourhoods/oakville",
  burlington: "/neighbourhoods/burlington",
};

/** Listings have no page of their own - they only ever appear as cards on
 * /search (one per city, for Milton/Oakville/Burlington) and on that
 * city's own overview page. A city change on edit needs both the old and
 * new city's routes revalidated. */
function revalidateListingPaths(cities: (string | null)[]) {
  revalidatePath("/search");
  const seen = new Set<string>();
  for (const city of cities) {
    if (!city) continue;
    const route = CITY_ROUTES[city.toLowerCase()];
    if (route && !seen.has(route)) {
      seen.add(route);
      revalidatePath(route);
    }
  }
}

export async function updateListingAction(id: string, payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = contentFieldsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const existing = await prisma.listing.findUnique({ where: { id }, select: { city: true } });
  if (!existing) {
    return { ok: false, error: "That listing no longer exists." };
  }

  try {
    await prisma.listing.update({ where: { id }, data: toData(parsed.data) });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  revalidateListingPaths([existing.city, parsed.data.city]);
  revalidatePath(`/admin/listings/${id}`);
  return { ok: true, data: undefined };
}

export async function createListingAction(payload: unknown): Promise<ActionResult<{ id: string }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  const parsed = contentFieldsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const created = await prisma.listing.create({ data: toData(parsed.data) });

  revalidateListingPaths([parsed.data.city]);
  revalidatePath("/admin/listings");
  return { ok: true, data: { id: created.id } };
}

export async function deleteListingAction(id: string): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const existing = await prisma.listing.findUnique({ where: { id }, select: { city: true } });
  if (!existing) {
    return { ok: false, error: "That listing no longer exists." };
  }
  await prisma.listing.delete({ where: { id } });
  revalidateListingPaths([existing.city]);
  revalidatePath("/admin/listings");
  return { ok: true, data: undefined };
}
