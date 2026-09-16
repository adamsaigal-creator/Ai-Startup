import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/cookies";
import { AdminSidebar } from "./_components/AdminSidebar";

/**
 * Wraps every dashboard route (everything under /admin except
 * /admin/login, which lives outside this route group so it never gets
 * the sidebar chrome). This is the one authoritative session check for
 * the whole dashboard - proxy.ts already redirects unauthenticated
 * requests before they get here, but per its own docs this layout
 * re-checks rather than trusting proxy.ts alone (see Phase 4B report).
 */
export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "oklch(97% 0.012 75)" }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: "var(--font-work-sans), sans-serif",
          color: "oklch(23% 0.012 60)",
          padding: "36px 44px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
