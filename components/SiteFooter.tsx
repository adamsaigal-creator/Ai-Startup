import Link from "next/link";
import type { NavItem } from "./SiteHeader";

/**
 * Shared "simple" footer used by every interior page (Buy, Sell, Luxury,
 * Commercial, About, Contact, Neighbourhoods, neighbourhood detail pages).
 * The Homepage uses a different, richer footer (see app/page.tsx) - that
 * was already a distinct footer in the original site, not something this
 * migration introduced.
 *
 * The exact link set genuinely differs per page in the original markup
 * (e.g. Buy's footer links to Sell/Luxury/Neighbourhoods/FAQ/Contact, while
 * About's links to Luxury/Careers/FAQ/Contact) - each page passes its own
 * original `links` array rather than a single unified set.
 */
export function SiteFooter({ links }: { links: NavItem[] }) {
  return (
    <footer
      style={{
        padding: "60px 56px 40px",
        background: "oklch(20% 0.01 60)",
        color: "oklch(85% 0.015 70)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "22px",
          fontWeight: 600,
          color: "oklch(99% 0.004 90)",
        }}
      >
        Saigal Realty Inc., Brokerage
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          flexWrap: "wrap",
          margin: "24px 0",
          fontSize: "14px",
        }}
      >
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{ color: "oklch(80% 0.02 60)" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <p style={{ fontSize: "12px", color: "oklch(55% 0.015 60)" }}>
        © 2026 Saigal Realty Inc., Brokerage. Independently Owned and
        Operated.
      </p>
    </footer>
  );
}
