import type { Metadata } from "next";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "SEO — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default function AdminSeoPlaceholder() {
  return (
    <AdminPlaceholder
      title="SEO"
      description="Manage meta titles, descriptions, and Open Graph fields across pages, neighbourhoods, and blog posts."
    />
  );
}
