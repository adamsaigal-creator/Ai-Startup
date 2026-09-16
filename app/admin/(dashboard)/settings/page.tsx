import type { Metadata } from "next";
import { prisma } from "@/lib/db/client";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Site Settings — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSiteSettingsPlaceholder() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return (
    <AdminPlaceholder
      title="Site Settings"
      description="Manage sitewide details: brokerage name, contact info, social links, and footer content."
      stats={
        settings
          ? [
              { label: "Brokerage Name", value: settings.brokerageName },
              { label: "Phone", value: settings.phone ?? "—" },
              { label: "Email", value: settings.email ?? "—" },
            ]
          : undefined
      }
    />
  );
}
