import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { getMediaForPicker } from "@/lib/media/picker";
import { SiteSettingsEditor, type SiteSettingsFormValues } from "./SiteSettingsEditor";

export const metadata: Metadata = {
  title: "Site Settings — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSiteSettingsPage() {
  const [settings, media] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    getMediaForPicker(),
  ]);

  const initial: SiteSettingsFormValues = {
    brokerageName: settings?.brokerageName ?? "",
    phone: settings?.phone ?? "",
    email: settings?.email ?? "",
    addressLine1: settings?.addressLine1 ?? "",
    addressLine2: settings?.addressLine2 ?? "",
    socialInstagram: settings?.socialInstagram ?? "",
    socialFacebook: settings?.socialFacebook ?? "",
    socialLinkedin: settings?.socialLinkedin ?? "",
    footerTagline: settings?.footerTagline ?? "",
    copyrightText: settings?.copyrightText ?? "",
    contactFormDestinationEmail: settings?.contactFormDestinationEmail ?? "",
    logoUrl: settings?.logoUrl ?? "",
    faviconUrl: settings?.faviconUrl ?? "",
  };

  return <SiteSettingsEditor initial={initial} media={media} />;
}
