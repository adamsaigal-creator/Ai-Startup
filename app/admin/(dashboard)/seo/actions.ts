"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const seoSchema = z.object({
  seoTitle: z.string().trim().max(300),
  seoDescription: z.string().trim().max(500),
});

/** Public route each Page slug renders at - used to revalidate after a
 * quick SEO edit here. Mirrors the redirect/route map already implicit
 * in app/**\/page.tsx; kept local to this file since nothing else needs
 * it. */
const PAGE_PUBLIC_PATH: Record<string, string> = {
  homepage: "/",
  buy: "/buy",
  sell: "/sell",
  luxury: "/luxury",
  commercial: "/commercial",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  careers: "/careers",
  faq: "/faq",
  search: "/search",
  neighbourhoods: "/neighbourhoods",
  "neighbourhoods-milton": "/neighbourhoods/milton",
  "neighbourhoods-oakville": "/neighbourhoods/oakville",
  "neighbourhoods-burlington": "/neighbourhoods/burlington",
};

/** Quick-edit for a Page's SEO title/description only - writes to the
 * exact same pages.seo_title/seo_description columns the full page
 * editors use (see app/admin/(dashboard)/pages/_lib/standard-page-
 * actions.ts and homepage's actions.ts), just without touching
 * `content`. Only meant for slugs that don't have a dedicated content
 * editor yet (blog/careers/faq/search/neighbourhoods index/city
 * overviews) - the seven pages that do have one are edited there
 * instead, so this never becomes a second place the same two fields can
 * be changed for those pages. */
export async function updatePageSeoAction(slug: string, payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = seoSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const existing = await prisma.page.findUnique({ where: { slug }, select: { id: true } });
  if (!existing) {
    return { ok: false, error: "That page no longer exists." };
  }

  try {
    await prisma.page.update({
      where: { slug },
      data: {
        seoTitle: parsed.data.seoTitle || null,
        seoDescription: parsed.data.seoDescription || null,
      },
    });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  const publicPath = PAGE_PUBLIC_PATH[slug];
  if (publicPath) revalidatePath(publicPath);
  revalidatePath("/admin/seo");
  return { ok: true, data: undefined };
}
