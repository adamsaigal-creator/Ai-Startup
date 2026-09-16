"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

type NavLink = { label: string; href: string };
type NavSection = { label: string; links: NavLink[] };

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Website",
    links: [
      { label: "Homepage", href: "/admin/pages/homepage" },
      { label: "Buy", href: "/admin/pages/buy" },
      { label: "Sell", href: "/admin/pages/sell" },
      { label: "Luxury", href: "/admin/pages/luxury" },
      { label: "Commercial", href: "/admin/pages/commercial" },
      { label: "About", href: "/admin/pages/about" },
      { label: "Contact", href: "/admin/pages/contact" },
    ],
  },
  {
    label: "Content",
    links: [
      { label: "Neighbourhoods", href: "/admin/neighbourhoods" },
      { label: "Blog", href: "/admin/blog" },
      { label: "Media Library", href: "/admin/media" },
    ],
  },
  {
    label: "Real Estate",
    links: [{ label: "Listings", href: "/admin/listings" }],
  },
  {
    label: "Marketing",
    links: [{ label: "SEO", href: "/admin/seo" }],
  },
  {
    label: "System",
    links: [
      { label: "Site Settings", href: "/admin/settings" },
      { label: "Users", href: "/admin/users" },
    ],
  },
];

const NAVY = "oklch(21% 0.045 260)";
const NAVY_BORDER = "oklch(30% 0.045 260)";
const TEXT_MUTED = "oklch(70% 0.02 260)";
const TEXT_ACTIVE = "oklch(98% 0.006 260)";
const SECTION_LABEL = "oklch(52% 0.03 260)";
const ACCENT = "oklch(58% 0.16 45)";

function isLinkActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

function SidebarLink({ href, label }: NavLink) {
  const pathname = usePathname();
  const active = isLinkActive(pathname, href);
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "9px 14px",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: 500,
        color: active ? TEXT_ACTIVE : TEXT_MUTED,
        background: active ? "oklch(32% 0.07 45)" : "transparent",
        borderLeft: active ? `2px solid ${ACCENT}` : "2px solid transparent",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const dashboardActive = pathname === "/admin";

  return (
    <aside
      style={{
        width: "250px",
        flexShrink: 0,
        background: NAVY,
        color: TEXT_MUTED,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "26px 20px 20px" }}>
        <span
          style={{
            fontFamily: "var(--font-cormorant-garamond), serif",
            fontSize: "19px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: TEXT_ACTIVE,
          }}
        >
          SAIGAL REALTY
        </span>
      </div>

      <nav style={{ flex: 1, padding: "0 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
        <Link
          href="/admin"
          style={{
            display: "block",
            padding: "9px 14px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            color: dashboardActive ? TEXT_ACTIVE : TEXT_MUTED,
            background: dashboardActive ? "oklch(32% 0.07 45)" : "transparent",
            borderLeft: dashboardActive ? `2px solid ${ACCENT}` : "2px solid transparent",
            textDecoration: "none",
            marginBottom: "14px",
          }}
        >
          Dashboard
        </Link>

        {NAV_SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: "14px" }}>
            <div
              style={{
                padding: "0 14px 6px",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: SECTION_LABEL,
              }}
            >
              {section.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.links.map((link) => (
                <SidebarLink key={link.href} {...link} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ padding: "16px 20px 22px", borderTop: `1px solid ${NAVY_BORDER}` }}>
        <form action={logoutAction}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "transparent",
              border: `1px solid ${NAVY_BORDER}`,
              borderRadius: "4px",
              color: TEXT_MUTED,
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
