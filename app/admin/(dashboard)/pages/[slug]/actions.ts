"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";
import { homepageSavePayloadSchema } from "./homepage-schema";

export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * The only write path for the homepage's content. A Server Action is a
 * real network endpoint that can be called directly, not just through the
 * page that renders its form - so this re-checks authentication itself
 * rather than trusting proxy.ts/the dashboard layout alone (same rule
 * this codebase already follows for loginAction/logoutAction).
 *
 * `payload` is untrusted input (`unknown`) until homepageSavePayloadSchema
 * proves otherwise - this is what "validate unknown/malformed JSON before
 * saving" actually means here: a request can't write anything that isn't
 * the exact homepage content shape, regardless of what the client sends.
 */
export async function updateHomepageContentAction(payload: unknown): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  const parsed = homepageSavePayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue?.path.join(".");
    return { ok: false, error: path ? `${path}: ${issue.message}` : (issue?.message ?? "Invalid data.") };
  }

  try {
    await prisma.page.update({
      where: { slug: "homepage" },
      data: {
        content: parsed.data.content as Prisma.InputJsonValue,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
      },
    });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  // Homepage is statically generated - without this, a save wouldn't
  // appear on the public site until the next `next build`.
  revalidatePath("/");
  revalidatePath("/admin/pages/homepage");

  return { ok: true };
}
