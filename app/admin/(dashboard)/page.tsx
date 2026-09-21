import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardCounts, getRecentlyUpdatedPages } from "@/lib/admin/dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const QUICK_ACTIONS = [
  { label: "Edit Homepage", href: "/admin/pages/homepage" },
  { label: "Manage Neighbourhoods", href: "/admin/neighbourhoods" },
  { label: "Manage Team", href: "/admin/team" },
  { label: "Manage Blog", href: "/admin/blog" },
  { label: "Media Library", href: "/admin/media" },
  { label: "Manage Listings", href: "/admin/listings" },
  { label: "Site Settings", href: "/admin/settings" },
];

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "oklch(99% 0.004 90)",
        border: "1px solid oklch(89% 0.012 70)",
        borderRadius: "4px",
        padding: "20px 22px",
        minWidth: "150px",
        flex: "1 1 150px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "oklch(52% 0.02 60)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "34px",
          fontWeight: 600,
          marginTop: "6px",
          color: "oklch(58% 0.16 45)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function AdminDashboardPage() {
  const [counts, recentPages] = await Promise.all([
    getDashboardCounts(),
    getRecentlyUpdatedPages(5),
  ]);

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "30px",
          fontWeight: 600,
          margin: "0 0 6px",
        }}
      >
        Dashboard
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 28px" }}>
        Overview of the Saigal Realty website content.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
        <StatCard label="Pages" value={counts.pages} />
        <StatCard label="Neighbourhoods" value={counts.neighbourhoods} />
        <StatCard label="Team Members" value={counts.teamMembers} />
        <StatCard label="Blog Posts" value={counts.blogPosts} />
        <StatCard label="Listings" value={counts.listings} />
        <StatCard label="Media" value={counts.media} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "start" }}>
        <div
          style={{
            background: "oklch(99% 0.004 90)",
            border: "1px solid oklch(89% 0.012 70)",
            borderRadius: "4px",
            padding: "22px 24px",
          }}
        >
          <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 16px", color: "oklch(35% 0.015 60)" }}>
            Recently Updated Pages
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {recentPages.map((page, i) => (
              <Link
                key={page.slug}
                href={`/admin/pages/${page.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 4px",
                  borderTop: i === 0 ? "none" : "1px solid oklch(92% 0.01 70)",
                  color: "oklch(23% 0.012 60)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <span>{page.title}</span>
                <span style={{ fontSize: "12px", color: "oklch(52% 0.02 60)" }}>
                  {dateFormatter.format(page.updatedAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "oklch(99% 0.004 90)",
            border: "1px solid oklch(89% 0.012 70)",
            borderRadius: "4px",
            padding: "22px 24px",
          }}
        >
          <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 16px", color: "oklch(35% 0.015 60)" }}>
            Quick Actions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                style={{
                  padding: "11px 14px",
                  border: "1px solid oklch(89% 0.012 70)",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "oklch(23% 0.012 60)",
                  textDecoration: "none",
                }}
              >
                {action.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
