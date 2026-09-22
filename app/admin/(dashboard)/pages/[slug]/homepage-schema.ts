import { z } from "zod";
import { safeHref } from "@/lib/validation/safe-href";

// Mirrors the exact shape of the homepage `pages.content` JSON already
// seeded (scripts/seed-pages-content.ts, slug "homepage") - field for
// field, no invented keys, no renamed keys. `.strict()` on every object
// rejects unknown properties, so a save can't smuggle in new structure or
// arbitrary JSON; the fixed `.length(N)` on every array keeps the section
// shapes (3 pillars, 4 services, 6 testimonials, ...) exactly as they are
// today - this first editor edits values, not structure.

const linkSchema = z
  .object({
    label: z.string().trim().min(1, "Label is required").max(200),
    href: safeHref(500, { minLength: 1 }),
  })
  .strict();

const heroSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1, "Headline is required").max(300),
    subhead: z.string().trim().max(1000),
    image: z.string().trim().min(1, "Image path is required").max(500),
    ctaPrimary: linkSchema,
    ctaSecondary: linkSchema,
  })
  .strict();

const philosophySchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    body: z.string().trim().max(3000),
    image: z.string().trim().min(1).max(500),
  })
  .strict();

const pillarItemSchema = z
  .object({
    number: z.string().trim().max(10),
    title: z.string().trim().min(1).max(100),
    body: z.string().trim().max(1000),
  })
  .strict();
const pillarsSchema = z.object({ items: z.array(pillarItemSchema).length(3) }).strict();

const featuredCityItemSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    slug: z.string().trim().min(1).max(100),
    image: z.string().trim().min(1).max(500),
    tagline: z.string().trim().max(200),
  })
  .strict();
const featuredCitiesSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    viewAllLabel: z.string().trim().max(200),
    viewAllHref: safeHref(500),
    items: z.array(featuredCityItemSchema).length(3),
  })
  .strict();

const serviceItemSchema = z
  .object({
    id: z.string().trim().min(1).max(50),
    title: z.string().trim().min(1).max(100),
    image: z.string().trim().min(1).max(500),
    body: z.string().trim().max(1000),
    ctaLabel: z.string().trim().max(200),
    ctaHref: safeHref(500),
  })
  .strict();
const servicesSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    items: z.array(serviceItemSchema).length(4),
  })
  .strict();

const teamSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    ctaLabel: z.string().trim().max(200),
    ctaHref: safeHref(500),
  })
  .strict();

const testimonialItemSchema = z
  .object({
    quote: z.string().trim().min(1).max(2000),
    author: z.string().trim().min(1).max(200),
  })
  .strict();
const testimonialsSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    items: z.array(testimonialItemSchema).length(6),
  })
  .strict();

// Only the Milton/Oakville/Burlington columns carry overviewHref/
// viewAllLabel/viewAllHref in the source data - "Also Serving" doesn't.
// Keeping these optional (rather than forcing them onto every column)
// preserves that real distinction instead of inventing values for it.
const neighbourhoodColumnSchema = z
  .object({
    heading: z.string().trim().min(1).max(100),
    overviewHref: safeHref(500).optional(),
    viewAllLabel: z.string().trim().max(200).optional(),
    viewAllHref: safeHref(500).optional(),
    links: z.array(linkSchema).min(1).max(10),
  })
  .strict();
const allNeighbourhoodsSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    body: z.string().trim().max(1000),
    ctaLabel: z.string().trim().max(200),
    ctaHref: safeHref(500),
    columns: z.array(neighbourhoodColumnSchema).length(4),
  })
  .strict();

const blogPreviewSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    ctaLabel: z.string().trim().max(200),
    ctaHref: safeHref(500),
    slugs: z.array(z.string().trim().min(1).max(200)).length(3),
  })
  .strict();

const faqItemSchema = z
  .object({
    question: z.string().trim().min(1).max(300),
    answer: z.string().trim().min(1).max(2000),
  })
  .strict();
const faqPreviewSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    ctaLabel: z.string().trim().max(200),
    ctaHref: safeHref(500),
    items: z.array(faqItemSchema).length(5),
  })
  .strict();

const officeItemSchema = z
  .object({
    city: z.string().trim().min(1).max(100),
    country: z.string().trim().min(1).max(100),
  })
  .strict();
const internationalReachSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1).max(300),
    body: z.string().trim().max(2000),
    offices: z.array(officeItemSchema).length(5),
  })
  .strict();

const finalCtaSchema = z
  .object({
    headline: z.string().trim().min(1).max(300),
    body: z.string().trim().max(1000),
  })
  .strict();

export const homepageContentSchema = z
  .object({
    hero: heroSchema,
    philosophy: philosophySchema,
    pillars: pillarsSchema,
    featuredCities: featuredCitiesSchema,
    services: servicesSchema,
    team: teamSchema,
    testimonials: testimonialsSchema,
    allNeighbourhoods: allNeighbourhoodsSchema,
    blogPreview: blogPreviewSchema,
    faqPreview: faqPreviewSchema,
    internationalReach: internationalReachSchema,
    finalCta: finalCtaSchema,
  })
  .strict();

export const homepageSavePayloadSchema = z.object({
  content: homepageContentSchema,
  seoTitle: z.string().trim().min(1, "SEO title is required").max(300),
  seoDescription: z.string().trim().min(1, "Meta description is required").max(500),
});

export type HomepageContent = z.infer<typeof homepageContentSchema>;
export type HomepageSavePayload = z.infer<typeof homepageSavePayloadSchema>;
