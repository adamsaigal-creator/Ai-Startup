import "server-only";

/** The canonical public origin (no trailing slash) - used for
 * metadataBase, canonical URLs, sitemap.xml, robots.txt, and absolute
 * URLs in structured data. Sourced from SITE_URL (see .env.example) so a
 * staging/preview deployment can point it elsewhere; falls back to the
 * real production domain rather than an env-specific guess, since this
 * app only ever serves one brokerage's one site. */
export function siteUrl(): string {
  const configured = process.env.SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://saigalrealty.ca";
}
