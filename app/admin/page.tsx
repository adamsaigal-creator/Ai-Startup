import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/cookies";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Saigal Realty",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Authoritative check (in addition to proxy.ts's own redirect) - see
  // lib/auth/cookies.ts's isAuthenticated() for why this page also checks
  // for itself rather than trusting proxy.ts alone.
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div
      style={{
        fontFamily: "var(--font-work-sans), sans-serif",
        color: "oklch(23% 0.012 60)",
        background: "oklch(97% 0.012 75)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "32px",
          fontWeight: "600",
          margin: "0",
        }}
      >
        Saigal Realty Admin
      </h1>
      <form action={logoutAction}>
        <button
          type="submit"
          style={{
            padding: "13px 28px",
            background: "oklch(23% 0.012 60)",
            color: "oklch(99% 0.004 90)",
            border: "none",
            borderRadius: "2px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.03em",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
}
