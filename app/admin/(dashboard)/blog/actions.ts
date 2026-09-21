"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { isAuthenticated } from "@/lib/auth/cookies";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const optionalText = (max: number) => z.string().trim().max(max).transform((v) => (v === "" ? null : v)).nullable();

// Every field here already exists on the Prisma BlogPost model from
// Phase 4A (see the model's own doc comment: body is plain text,
// paragraphs separated by a blank line - not JSON sections, not
// markdown) - Phase 4H adds the admin UI, not a new data shape. `slug`
// is deliberately not part of this schema: it's the public /blog/[slug]
// URL, locked immediately after creation (not just after publish) for
// the same reason as Neighbourhood.slug and TeamMember.slug in Phase 4G -
// simpler and stricter than "protect only once published", and
// consistent with the rest of the admin.
const contentFieldsSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300),
  category: optionalText(100),
  excerpt: optionalText(500),
  body: optionalText(20000),
  featuredImage: optionalText(500),
  author: optionalText(150),
  publishedAt: z
    .string()
    .trim()
    .max(40)
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .refine((v) => v === null || !Number.isNaN(Date.parse(v)), "Invalid published date"),
  ctaLabel: optionalText(150),
  ctaHref: optionalText(300),
  status: z.enum(["draft", "published"]),
  seoTitle: optionalText(300),
  seoDescription: optionalText(500),
});

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(150)
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

function toUpdateData(data: z.infer<typeof contentFieldsSchema>) {
  return { ...data, publishedAt: data.publishedAt ? new Date(data.publishedAt) : null };
}

/** The Homepage's blog preview pulls specific posts by slug
 * (content.blogPreview.slugs - see app/page.tsx), so any blog save or
 * delete revalidates it too - cheap no-op if this post isn't one of the
 * featured three, and avoids an extra query to check membership. */
function revalidateBlogPaths(slug: string) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath(`/admin/blog/${slug}`);
}

export async function updateBlogPostAction(id: string, payload: unknown): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const parsed = contentFieldsSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return { ok: false, error: "That post no longer exists." };
  }

  try {
    await prisma.blogPost.update({ where: { id }, data: toUpdateData(parsed.data) });
  } catch {
    return { ok: false, error: "Could not save changes. Please try again." };
  }

  revalidateBlogPaths(existing.slug);
  return { ok: true, data: undefined };
}

export async function createBlogPostAction(payload: unknown): Promise<ActionResult<{ slug: string }>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }

  const parsed = z.object({ slug: slugSchema }).and(contentFieldsSchema).safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid data." };
  }

  const { slug, ...rest } = parsed.data;

  const existing = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (existing) {
    return { ok: false, error: `A post with slug "${slug}" already exists.` };
  }

  try {
    await prisma.blogPost.create({ data: { slug, ...toUpdateData(rest) } });
  } catch {
    return { ok: false, error: "Could not create the post. Please try again." };
  }

  revalidateBlogPaths(slug);
  revalidatePath("/admin/blog");
  return { ok: true, data: { slug } };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult<undefined>> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Your session has expired. Please log in again." };
  }
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) {
    return { ok: false, error: "That post no longer exists." };
  }
  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPaths(existing.slug);
  revalidatePath("/admin/blog");
  return { ok: true, data: undefined };
}
