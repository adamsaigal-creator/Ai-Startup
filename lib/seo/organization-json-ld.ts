import type { SiteSettingsRow } from "@/lib/data/site-settings";
import { siteUrl } from "./site-url";

/** address_line2 is a free-text field in the admin (e.g. "Milton, ON L9T
 * 2N2") - this is a best-effort split into schema.org's separate
 * locality/region/postalCode properties, not a full address parser. Falls
 * back to putting the whole line in addressLocality if it doesn't match
 * the "City, PROVINCE POSTAL" shape, so nothing is dropped either way. */
function parseAddressLine2(line2: string | null): { addressLocality?: string; addressRegion?: string; postalCode?: string } {
  if (!line2) return {};
  const match = line2.match(/^\s*([^,]+),\s*([A-Za-z]{2})\s+([A-Za-z0-9 ]+)\s*$/);
  if (match) {
    return { addressLocality: match[1].trim(), addressRegion: match[2].trim(), postalCode: match[3].trim() };
  }
  return { addressLocality: line2 };
}

/** RealEstateAgent (a schema.org LocalBusiness subtype) built entirely from
 * SiteSettings - the one place brokerage name/phone/address/social links
 * are actually maintained (see /admin/settings). No invented ratings,
 * reviews, or claims - only fields SiteSettings actually has are ever
 * included. */
export function buildOrganizationJsonLd(settings: SiteSettingsRow) {
  const { addressLocality, addressRegion, postalCode } = parseAddressLine2(settings.address_line2);
  const sameAs = [settings.social_instagram, settings.social_facebook, settings.social_linkedin].filter(
    (v): v is string => Boolean(v)
  );

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl()}/#organization`,
    name: settings.brokerage_name,
    url: siteUrl(),
    telephone: settings.phone ?? undefined,
    email: settings.email ?? undefined,
    logo: settings.logo_url ? `${siteUrl()}${settings.logo_url}` : undefined,
    image: settings.logo_url ? `${siteUrl()}${settings.logo_url}` : undefined,
    address: settings.address_line1
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address_line1,
          addressLocality,
          addressRegion,
          postalCode,
          addressCountry: "CA",
        }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    areaServed: ["Milton", "Oakville", "Burlington"],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    url: siteUrl(),
    name: "Saigal Realty Inc., Brokerage",
  };
}
