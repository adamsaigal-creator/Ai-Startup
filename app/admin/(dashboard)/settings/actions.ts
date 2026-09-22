"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";
import { optionalSafeHref } from "@/lib/validation/safe-href";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const optionalText = (max: number) => z.string().trim().max(max).transform((v) => (v === "" ? null : v)).nullable();

// Every field here already exists on the Prisma SiteSettings model
// (Phase 4A) - this is the admin UI for the one singleton row (id=1),
// not a new data shape.
const settingsSchema = z.object({
  brokerageName: z.string().trim().min(1, "Brokerage name is required").max(200),
  phone: optionalText(50),
  email: optionalText(200),
  addressLine1: optionalText(200),
  addressLine2: optionalText(200),
  socialInstagram: optionalSafeHref(300),
  socialFacebook: optionalSafeHref(300),
  socialLinkedin: optionalSafeHref(300),
  footerTagline: optionalText(300),
  copyrightText: optionalText(200),
  contactFormDestinationEmail: optionalText(200),
  logoUrl: optionalText(500),
  faviconUrl: optionalText(500),
});

export async function updateSiteSettingsAction(payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = settingsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  try {
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...parsed.data },
      update: parsed.data,
    });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  // Site settings (brokerage name, phone, address, social links, footer
  // tagline/copyright, logo/favicon) are read on every single public
  // page via SiteHeader/SiteFooter - there's no one shared layout to
  // target, so this revalidates the whole app rather than enumerating
  // every route (see the revalidatePath docs' own "Revalidating all
  // data" example).
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true, data: undefined };
}
