// Bootstrap-only seed for a brand-new, empty database - NOT part of a
// routine deploy (see Phase 4K's docs/DEPLOYMENT.md). Production deploys
// run `prisma migrate deploy` (schema only) and never call this script.
//
// main() below refuses to run at all against a database that already has
// content, unless ALLOW_RESEED=true is explicitly set - see
// isDatabaseEmpty(). This exists because several of the writes here are
// destructive to CMS-edited content if ever run against a live database:
// pages/neighbourhoods/blog_posts upsert by slug (stable ids across
// re-runs, but this DOES overwrite any CMS edits to those rows - see the
// Phase 4A/4G reports); listings/media (no natural unique key) are
// replaced wholesale; team_members is insert-only (create if missing,
// never overwrite) specifically so /admin/team edits survive a re-seed
// once ALLOW_RESEED lets the script proceed at all.
import { readdirSync, readFileSync, statSync } from "fs";
import { extname, join } from "path";
import { imageSize } from "image-size";
import { Prisma, PrismaClient } from "@prisma/client";

import { PAGES_CONTENT } from "../scripts/seed-pages-content";
import { SITE_SETTINGS, LISTINGS } from "../scripts/seed-settings-listings";
import { SR_NEIGHBOURHOODS } from "../lib/neighbourhoods-data";
import { BLOG_POSTS } from "../lib/blog-data";
import { SR_TEAM_MEMBERS } from "../scripts/seed-team-content";

const prisma = new PrismaClient();

async function seedPages() {
  for (const p of PAGES_CONTENT) {
    const data = {
      title: p.title,
      content: p.content as Prisma.InputJsonValue,
      seoTitle: p.seo_title ?? null,
      seoDescription: p.seo_description ?? null,
      ogTitle: p.og_title ?? null,
      ogDescription: p.og_description ?? null,
      ogImage: p.og_image ?? null,
      status: "published",
    };
    await prisma.page.upsert({
      where: { slug: p.slug },
      create: { slug: p.slug, ...data },
      update: data,
    });
  }
  return PAGES_CONTENT.length;
}

async function seedNeighbourhoods() {
  const cityCounters: Record<string, number> = {};
  const entries = Object.entries(SR_NEIGHBOURHOODS);
  for (const [slug, n] of entries) {
    const displayOrder = cityCounters[n.city] ?? 0;
    cityCounters[n.city] = displayOrder + 1;
    const data = {
      name: n.name,
      city: n.city,
      headline: n.tagline,
      description: n.body,
      lifestyle: n.parks,
      schools: n.schools,
      commute: n.commute,
      seoTitle: `${n.name} Real Estate — Saigal Realty Inc., Brokerage`,
      seoDescription: n.tagline,
      status: "published",
      displayOrder,
    };
    await prisma.neighbourhood.upsert({
      where: { slug },
      create: { slug, ...data },
      update: data,
    });
  }
  return entries.length;
}

async function seedBlogPosts() {
  const now = new Date();
  for (const [i, post] of BLOG_POSTS.entries()) {
    // Spaced 3 days apart so `published_at desc` reproduces the source
    // array's order regardless of when the seed is actually run.
    const publishedAt = new Date(now.getTime() - i * 3 * 24 * 60 * 60 * 1000);
    const data = {
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      body: post.paragraphs.join("\n\n"),
      featuredImage: post.image,
      author: "Saigal Realty Team",
      publishedAt,
      ctaLabel: post.cta.text,
      ctaHref: post.cta.href,
      status: "published",
      seoTitle: `${post.title} — Saigal Realty Inc., Brokerage`,
      seoDescription: post.excerpt,
    };
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: { slug: post.slug, ...data },
      update: data,
    });
  }
  return BLOG_POSTS.length;
}

/** Unlike every other seed function here, this is insert-only: it never
 * updates a row that already exists. Team roster edits happen in
 * /admin/team once seeded, and a re-run of this script (e.g. as part of
 * a redeploy) must not silently overwrite them - Prisma's upsert() with
 * an empty update object is exactly "create if missing, otherwise leave
 * alone". */
async function seedTeamMembers() {
  for (const m of SR_TEAM_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { slug: m.slug },
      create: {
        slug: m.slug,
        name: m.name,
        role: m.role,
        languages: m.languages,
        phone: m.phone,
        photo: m.photo,
        displayOrder: m.displayOrder,
        status: "published",
      },
      update: {},
    });
  }
  return SR_TEAM_MEMBERS.length;
}

async function seedSiteSettings() {
  const s = SITE_SETTINGS;
  const data = {
    brokerageName: s.brokerage_name,
    phone: s.phone,
    email: s.email,
    addressLine1: s.address_line1,
    addressLine2: s.address_line2,
    socialInstagram: s.social_instagram,
    socialFacebook: s.social_facebook,
    socialLinkedin: s.social_linkedin,
    footerTagline: s.footer_tagline,
    copyrightText: s.copyright_text,
    contactFormDestinationEmail: s.contact_form_destination_email,
    logoUrl: s.logo_url,
    faviconUrl: s.favicon_url,
  };
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });
}

async function seedListings() {
  await prisma.listing.deleteMany({});
  await prisma.listing.createMany({
    data: LISTINGS.map((l) => ({
      address: l.address,
      city: l.city,
      neighbourhood: l.neighbourhood,
      price: l.price,
      beds: l.beds,
      baths: l.baths,
      propertyType: l.property_type,
      description: l.description,
      image: l.image,
      listingUrl: l.listing_url,
      featured: l.featured,
      status: "published",
    })),
  });
  return LISTINGS.length;
}

const PUBLIC_ROOT = join(__dirname, "..", "public");
const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function seedMedia() {
  const rows: {
    filename: string;
    storagePath: string;
    altText: string | null;
    mimeType: string | null;
    width: number | null;
    height: number | null;
    fileSize: bigint;
  }[] = [];

  for (const dir of ["images", "uploads"]) {
    const abs = join(PUBLIC_ROOT, dir);
    let files: string[];
    try {
      files = readdirSync(abs);
    } catch {
      continue;
    }
    for (const filename of files) {
      const ext = extname(filename).toLowerCase();
      if (!(ext in MIME_BY_EXT)) continue;
      const full = join(abs, filename);
      const stat = statSync(full);
      let width: number | null = null;
      let height: number | null = null;
      try {
        const dim = imageSize(readFileSync(full));
        width = dim.width ?? null;
        height = dim.height ?? null;
      } catch {
        // leave null if unreadable
      }
      rows.push({
        filename,
        storagePath: `/${dir}/${filename}`,
        altText: null,
        mimeType: MIME_BY_EXT[ext],
        width,
        height,
        fileSize: BigInt(stat.size),
      });
    }
  }

  await prisma.media.deleteMany({});
  await prisma.media.createMany({ data: rows });
  return rows.length;
}

/** True only if every content table this script writes to is empty - the
 * "brand-new database" case this script is meant for. Deliberately checks
 * every table (not just one) so a partially-seeded or partially-migrated
 * database still gets caught. */
async function isDatabaseEmpty(): Promise<boolean> {
  const [pages, neighbourhoods, blogPosts, listings, teamMembers, media] = await Promise.all([
    prisma.page.count(),
    prisma.neighbourhood.count(),
    prisma.blogPost.count(),
    prisma.listing.count(),
    prisma.teamMember.count(),
    prisma.media.count(),
  ]);
  return pages === 0 && neighbourhoods === 0 && blogPosts === 0 && listings === 0 && teamMembers === 0 && media === 0;
}

async function main() {
  if (process.env.ALLOW_RESEED !== "true" && !(await isDatabaseEmpty())) {
    console.error(
      [
        "",
        "Refusing to seed: this database already has content.",
        "",
        "This script is bootstrap-only, for a brand-new empty database. Several",
        "of its writes overwrite or wholesale-replace existing rows (see the",
        "comment at the top of this file) - running it against a live CMS",
        "database would destroy real admin edits.",
        "",
        "If you are certain you want to reset this database back to the",
        "bootstrap content anyway, re-run with ALLOW_RESEED=true set explicitly.",
        "",
      ].join("\n")
    );
    process.exitCode = 1;
    return;
  }

  const [pages, neighbourhoods, blogPosts, listings, media] = await Promise.all([
    seedPages(),
    seedNeighbourhoods(),
    seedBlogPosts(),
    seedListings(),
    seedMedia(),
  ]);
  const teamMembers = await seedTeamMembers();
  await seedSiteSettings();

  console.log("Seed complete:");
  console.log(`  pages: ${pages}`);
  console.log(`  neighbourhoods: ${neighbourhoods}`);
  console.log(`  blog_posts: ${blogPosts}`);
  console.log(`  listings: ${listings}`);
  console.log(`  media: ${media}`);
  console.log(`  team_members: ${teamMembers}`);
  console.log(`  site_settings: 1`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
