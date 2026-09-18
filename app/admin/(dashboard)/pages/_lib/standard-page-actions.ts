"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";
import { STANDARD_PAGE_SCHEMAS, isStandardPageSlug, type StandardPageSlug } from "./standard-page-schemas";

export type SaveResult = { ok: true } | { ok: false; error: string };

const PUBLIC_PATH: Record<StandardPageSlug, string> = {
  buy: "/buy",
  sell: "/sell",
  luxury: "/luxury",
  commercial: "/commercial",
  about: "/about",
  contact: "/contact",
};

/**
 * The only write path for buy/sell/luxury/commercial/about/contact
 * content - one Server Action shared across all six, dispatching to the
 * right Zod schema by slug. Same shape and rules as the homepage editor's
 * updateHomepageContentAction: re-checks isAuthenticated() itself (a
 * Server Action is a callable endpoint, not just something reached
 * through the page around it), validates the untrusted payload before
 * touching the database, and revalidates the corresponding public path
 * on success so a save appears without a redeploy.
 */
export async function updateStandardPageContentAction(slug: string, payload: unknown): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  if (!isStandardPageSlug(slug)) {
    return { ok: false, error: "Unknown page." };
  }

  const savePayloadSchema = z.object({
    content: STANDARD_PAGE_SCHEMAS[slug],
    seoTitle: z.string().trim().min(1, "SEO title is required").max(300),
    seoDescription: z.string().trim().min(1, "Meta description is required").max(500),
  });

  const parsed = savePayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue?.path.join(".");
    return { ok: false, error: path ? `${path}: ${issue.message}` : (issue?.message ?? "Invalid data.") };
  }

  try {
    await prisma.page.update({
      where: { slug },
      data: {
        content: parsed.data.content as Prisma.InputJsonValue,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
      },
    });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  revalidatePath(PUBLIC_PATH[slug]);
  revalidatePath(`/admin/pages/${slug}`);

  return { ok: true };
}
