import { z } from "zod";

// Zod schemas for the six "standard" page editors (buy, sell, luxury,
// commercial, about, contact), mirroring each page's real stored
// pages.content JSON field for field - verified directly against the
// seeded database, not guessed from memory. `.strict()` on every object
// and a fixed `.length()` on every array (matching what's actually there
// today) means a save can change values but not structure, same rule as
// the homepage editor's schema.
//
// Several sections repeat with an identical shape across pages (hero,
// cta, faq, numbered-step groups, stat groups) - those sub-schemas are
// shared below because the *data* really is the same shape, not because
// the six pages are being forced into one artificial schema. Each page's
// top-level schema still reflects only the sections that page actually
// has.

const linkSchema = z
  .object({
    label: z.string().trim().min(1, "Label is required").max(200),
    href: z.string().trim().min(1, "URL is required").max(500),
  })
  .strict();

const heroWithSubheadSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1, "Headline is required").max(300),
    subhead: z.string().trim().max(1000),
    image: z.string().trim().min(1, "Image path is required").max(500),
  })
  .strict();

const heroNoSubheadSchema = z
  .object({
    eyebrow: z.string().trim().max(200),
    headline: z.string().trim().min(1, "Headline is required").max(300),
    image: z.string().trim().min(1, "Image path is required").max(500),
  })
  .strict();

const ctaSchema = z
  .object({
    headline: z.string().trim().min(1).max(300),
    body: z.string().trim().max(1000),
    buttonLabel: z.string().trim().max(200),
    buttonHref: z.string().trim().max(500),
  })
  .strict();

const faqLinkSchema = z
  .object({
    text: z.string().trim().min(1).max(200),
    href: z.string().trim().min(1).max(500),
  })
  .strict();

const faqItemSchema = z
  .object({
    question: z.string().trim().min(1).max(300),
    answer: z.string().trim().min(1).max(2000),
    links: z.array(faqLinkSchema).max(5).optional(),
  })
  .strict();

function faqSchema(count: number) {
  return z
    .object({
      eyebrow: z.string().trim().max(200),
      headline: z.string().trim().min(1).max(300),
      items: z.array(faqItemSchema).length(count),
    })
    .strict();
}

const numberedItemSchema = z
  .object({
    number: z.string().trim().max(10),
    title: z.string().trim().min(1).max(150),
    body: z.string().trim().max(1000),
  })
  .strict();

function numberedItemsSchema(count: number) {
  return z
    .object({
      eyebrow: z.string().trim().max(200),
      headline: z.string().trim().min(1).max(300),
      items: z.array(numberedItemSchema).length(count),
    })
    .strict();
}

const statItemSchema = z
  .object({
    value: z.string().trim().min(1).max(50),
    label: z.string().trim().min(1).max(300),
  })
  .strict();

// ---------------------------------------------------------------------------
// Buy
// ---------------------------------------------------------------------------
export const buyContentSchema = z
  .object({
    hero: heroWithSubheadSchema,
    searchWidget: z
      .object({
        locations: z.array(z.string().trim().min(1).max(100)).min(1).max(10),
        priceRanges: z.array(z.string().trim().min(1).max(50)).min(1).max(10),
        buttonLabel: z.string().trim().max(200),
        caption: z.string().trim().max(300),
      })
      .strict(),
    steps: numberedItemsSchema(4),
    representation: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.array(z.string().trim().min(1).max(1000)).length(2),
        checklist: z.array(z.string().trim().min(1).max(300)).length(3),
      })
      .strict(),
    faq: faqSchema(5),
    cta: ctaSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// Sell
// ---------------------------------------------------------------------------
export const sellContentSchema = z
  .object({
    hero: heroWithSubheadSchema,
    valuationCta: ctaSchema,
    steps: numberedItemsSchema(4),
    difference: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        stats: z.array(statItemSchema).length(3),
      })
      .strict(),
    faq: faqSchema(5),
    cta: ctaSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// Luxury
// ---------------------------------------------------------------------------
export const luxuryContentSchema = z
  .object({
    hero: heroWithSubheadSchema,
    intro: z.object({ body: z.string().trim().min(1).max(3000) }).strict(),
    imageGrid: z
      .object({
        images: z
          .array(
            z
              .object({
                src: z.string().trim().min(1).max(500),
                alt: z.string().trim().max(200),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    stats: z.object({ items: z.array(statItemSchema).length(3) }).strict(),
    pockets: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        items: z
          .array(
            z
              .object({
                title: z.string().trim().min(1).max(150),
                body: z.string().trim().max(1000),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    program: numberedItemsSchema(4),
    faq: faqSchema(6),
    globalNetwork: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.string().trim().max(2000),
        linkLabel: z.string().trim().max(200),
        linkHref: z.string().trim().max(500),
      })
      .strict(),
    cta: ctaSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// Commercial
// ---------------------------------------------------------------------------
export const commercialContentSchema = z
  .object({
    hero: heroWithSubheadSchema,
    sectors: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        items: z
          .array(
            z
              .object({
                title: z.string().trim().min(1).max(150),
                image: z.string().trim().min(1).max(500),
                body: z.string().trim().max(1000),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    whyUs: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.array(z.string().trim().min(1).max(1000)).length(2),
        checklist: z.array(z.string().trim().min(1).max(300)).length(3),
      })
      .strict(),
    process: numberedItemsSchema(4),
    faq: faqSchema(5),
    recentWork: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        items: z
          .array(
            z
              .object({
                tag: z.string().trim().min(1).max(100),
                body: z.string().trim().max(1000),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    cta: ctaSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
// The team roster used to live here as a `members` array (7 fixed
// entries) - Phase 4G moved it to the team_members table, managed at
// /admin/team, since the same roster also feeds the Homepage carousel and
// needed one real source of truth instead of two. This page's `team`
// section now only carries its own section heading.

export const aboutContentSchema = z
  .object({
    hero: heroNoSubheadSchema,
    philosophy: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.string().trim().max(3000),
      })
      .strict(),
    stats: z.object({ items: z.array(statItemSchema).length(4) }).strict(),
    boutique: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.array(z.string().trim().min(1).max(1500)).length(2),
        image: z.string().trim().min(1).max(500),
      })
      .strict(),
    pillars: z
      .object({
        items: z
          .array(
            z
              .object({
                number: z.string().trim().max(10),
                title: z.string().trim().min(1).max(100),
                body: z.string().trim().max(1000),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    team: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
      })
      .strict(),
    internationalReach: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.string().trim().max(2000),
        offices: z
          .array(
            z
              .object({
                city: z.string().trim().min(1).max(100),
                country: z.string().trim().min(1).max(100),
              })
              .strict()
          )
          .length(5),
      })
      .strict(),
    careersCta: z
      .object({
        eyebrow: z.string().trim().max(200),
        headline: z.string().trim().min(1).max(300),
        body: z.string().trim().max(1000),
        buttonLabel: z.string().trim().max(200),
        buttonHref: z.string().trim().max(500),
      })
      .strict(),
    cta: ctaSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const contactContentSchema = z
  .object({
    hero: heroNoSubheadSchema,
    form: z
      .object({
        buttonLabel: z.string().trim().max(200),
        reasonOptions: z.array(z.string().trim().min(1).max(150)).min(1).max(10),
      })
      .strict(),
    infoPanel: z.object({ servingArea: z.string().trim().max(500) }).strict(),
    officeHours: z
      .object({
        items: z
          .array(
            z
              .object({
                label: z.string().trim().min(1).max(100),
                value: z.string().trim().min(1).max(100),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
    whatHappensNext: z
      .object({
        items: z
          .array(
            z
              .object({
                number: z.string().trim().max(10),
                body: z.string().trim().max(500),
              })
              .strict()
          )
          .length(3),
      })
      .strict(),
  })
  .strict();

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
export const STANDARD_PAGE_SCHEMAS = {
  buy: buyContentSchema,
  sell: sellContentSchema,
  luxury: luxuryContentSchema,
  commercial: commercialContentSchema,
  about: aboutContentSchema,
  contact: contactContentSchema,
} as const;

export type StandardPageSlug = keyof typeof STANDARD_PAGE_SCHEMAS;

export function isStandardPageSlug(slug: string): slug is StandardPageSlug {
  return Object.prototype.hasOwnProperty.call(STANDARD_PAGE_SCHEMAS, slug);
}

export type BuyContent = z.infer<typeof buyContentSchema>;
export type SellContent = z.infer<typeof sellContentSchema>;
export type LuxuryContent = z.infer<typeof luxuryContentSchema>;
export type CommercialContent = z.infer<typeof commercialContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
