import { cache } from "react";
import { prisma } from "@/lib/db/client";

export type SiteSettingsRow = {
  brokerage_name: string;
  phone: string | null;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
  footer_tagline: string | null;
  copyright_text: string | null;
  contact_form_destination_email: string | null;
  logo_url: string | null;
  favicon_url: string | null;
};

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow> => {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!row) throw new Error("site_settings row (id=1) is missing - run `npx prisma db seed`");
  return {
    brokerage_name: row.brokerageName,
    phone: row.phone,
    email: row.email,
    address_line1: row.addressLine1,
    address_line2: row.addressLine2,
    social_instagram: row.socialInstagram,
    social_facebook: row.socialFacebook,
    social_linkedin: row.socialLinkedin,
    footer_tagline: row.footerTagline,
    copyright_text: row.copyrightText,
    contact_form_destination_email: row.contactFormDestinationEmail,
    logo_url: row.logoUrl,
    favicon_url: row.faviconUrl,
  };
});
