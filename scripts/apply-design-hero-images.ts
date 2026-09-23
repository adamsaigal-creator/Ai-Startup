// One-off, guarded data fix from the final Claude Design pass: replace the
// fabricated "SR" placeholder (/uploads/sraa.png) in the Careers and FAQ
// page heroes with the supplied guide images. Those two pages have no
// /admin page editor, so this is the only way to change them without a
// full re-seed (which must never run against a live database).
//
// Safety rules (all enforced below):
//   - Dry run by default. Nothing is written without --apply.
//   - Only the "careers" and "faq" pages rows are read or touched.
//   - Only content.hero.image changes, and only while it is still exactly
//     /uploads/sraa.png - any value an editor has already changed is left
//     alone and reported as skipped. Every other content key is preserved.
//   - --apply also requires --confirm-db=<database name from DATABASE_URL>,
//     so the target is named deliberately rather than inherited from
//     whatever .env happens to be loaded.
//   - A production-looking target (NODE_ENV=production, or the production
//     database name from docs/DEPLOYMENT.md) is refused unless --production
//     is also passed. Running it against production needs separate owner
//     approval.
//
// Usage:
//   npx tsx scripts/apply-design-hero-images.ts                  # dry run
//   npx tsx scripts/apply-design-hero-images.ts --apply --confirm-db=<db>
//
// Careers and FAQ are statically rendered, so a live site shows the new
// images after its next build/redeploy.
import { Prisma, PrismaClient } from "@prisma/client";

const PLACEHOLDER = "/uploads/sraa.png";
const TARGETS: Record<string, string> = {
  careers: "/images/12-careers.webp",
  faq: "/images/13-faq.webp",
};
const PRODUCTION_DB_NAMES = new Set(["saigal_cms"]);

function describeTarget(): { label: string; dbName: string } {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL is not set.");
  const url = new URL(raw);
  const dbName = decodeURIComponent(url.pathname.replace(/^\//, ""));
  return { label: `${url.hostname}:${url.port || "5432"}/${dbName}`, dbName };
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const confirmDb = args.find((a) => a.startsWith("--confirm-db="))?.split("=")[1];
  const allowProduction = args.includes("--production");

  const { label, dbName } = describeTarget();
  const looksLikeProduction = process.env.NODE_ENV === "production" || PRODUCTION_DB_NAMES.has(dbName);

  console.log(`Target database: ${label}${looksLikeProduction ? " (looks like PRODUCTION)" : ""}`);
  console.log(`Mode: ${apply ? "APPLY" : "dry run (pass --apply to write)"}\n`);

  if (apply) {
    if (confirmDb !== dbName) {
      throw new Error(`Refusing to write: pass --confirm-db=${dbName} to confirm the target database.`);
    }
    if (looksLikeProduction && !allowProduction) {
      throw new Error("Refusing to write to a production database without --production (requires separate owner approval).");
    }
  }

  const prisma = new PrismaClient();
  try {
    let changed = 0;
    for (const [slug, next] of Object.entries(TARGETS)) {
      await prisma.$transaction(async (tx) => {
        const page = await tx.page.findUnique({ where: { slug }, select: { content: true } });
        if (!page) {
          console.log(`- ${slug}: no pages row found - skipped`);
          return;
        }
        const content = (page.content ?? {}) as Record<string, unknown>;
        const hero = (content.hero ?? null) as Record<string, unknown> | null;
        const current = hero && typeof hero.image === "string" ? hero.image : null;

        if (current !== PLACEHOLDER) {
          console.log(`- ${slug}: hero.image is ${JSON.stringify(current)} (not the placeholder) - skipped, left unchanged`);
          return;
        }
        console.log(`- ${slug}: hero.image ${JSON.stringify(current)} -> ${JSON.stringify(next)}${apply ? "" : "  [dry run]"}`);
        if (!apply) return;

        const updated = { ...content, hero: { ...hero, image: next } };
        await tx.page.update({ where: { slug }, data: { content: updated as Prisma.InputJsonValue } });
        changed++;
      });
    }
    console.log(`\n${apply ? `Updated ${changed} page(s).` : "Dry run complete - no changes written."}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
