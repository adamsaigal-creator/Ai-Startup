import type { Metadata } from "next";
import { AdminPlaceholder } from "../_components/AdminPlaceholder";

export const metadata: Metadata = {
  title: "Users — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

export default function AdminUsersPlaceholder() {
  return (
    <AdminPlaceholder
      title="Users"
      description="Multi-user accounts aren't implemented yet. There is a single admin login configured via the ADMIN_USERNAME/ADMIN_PASSWORD_HASH_B64 environment variables (Phase 4B)."
    />
  );
}
