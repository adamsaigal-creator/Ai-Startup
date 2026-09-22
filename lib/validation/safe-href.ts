import { z } from "zod";

/** A URL/href field that rejects the `javascript:`, `data:`, and `vbscript:`
 * schemes - the ones a browser will execute when a user clicks an `<a
 * href>` built from this value (see e.g. app/page.tsx and
 * app/blog/[slug]/page.tsx, which render ctaHref/cta_href directly as
 * `<a href={...}>`). Every legitimate value here is a relative path
 * (`/contact`), a same-page anchor (`#contact`), or a normal http(s) URL -
 * none of which this pattern touches. Only the admin can set these fields
 * today, but validating at the schema boundary means that stays true even
 * if a field gets exposed more widely later, and costs nothing now. */
export function safeHref(max: number, opts?: { minLength?: number }) {
  const base = opts?.minLength
    ? z.string().trim().min(opts.minLength, "URL is required").max(max)
    : z.string().trim().max(max);
  return base.refine((v) => !/^\s*(javascript|data|vbscript):/i.test(v), "That URL's scheme isn't allowed.");
}

/** Same scheme guard as safeHref, but for the common `optionalText`-style
 * field shape used across this admin's schemas: an empty string means
 * "not set" (stored as null), not an empty href. */
export function optionalSafeHref(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .refine((v) => !/^\s*(javascript|data|vbscript):/i.test(v), "That URL's scheme isn't allowed.")
    .transform((v) => (v === "" ? null : v))
    .nullable();
}
