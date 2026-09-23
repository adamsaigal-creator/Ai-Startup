import Link from "next/link";

export type NavItem = { label: string; href: string };

/**
 * Shared site header, ported verbatim from the <header> markup repeated
 * across every .dc.html source page. The exact nav item list and CTA style
 * genuinely differ page to page in the original site (this was not a single
 * shared template there either) - each page passes its own `nav` array and
 * `activeLabel` to reproduce that exactly rather than unifying it.
 */
export function SiteHeader({
  nav,
  activeLabel,
  ctaLabel = "Book a Consultation",
  ctaHref = "/contact",
  ctaSize = "sm",
  logoUrl = "/uploads/saigal-logo-cropped.png",
  brokerageName = "Saigal Realty Inc., Brokerage",
}: {
  nav: NavItem[];
  activeLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSize?: "sm" | "md";
  logoUrl?: string;
  brokerageName?: string;
}) {
  const ctaStyle =
    ctaSize === "md"
      ? {
          padding: "10px 22px",
          background: "oklch(23% 0.012 60)",
          color: "oklch(99% 0.004 90)",
          borderRadius: "2px",
          fontSize: "13px",
          letterSpacing: "0.04em",
        }
      : {
          padding: "9px 16px",
          background: "oklch(23% 0.012 60)",
          color: "oklch(99% 0.004 90)",
          borderRadius: "2px",
          fontSize: "12px",
          letterSpacing: "0.03em",
          flexShrink: 0,
        };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "20px 40px",
        background: "oklch(97% 0.012 75 / 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid oklch(83% 0.015 70)",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={brokerageName}
          style={{ height: "52px", width: "auto", display: "block" }}
        />
      </Link>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "13px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          flexShrink: 1,
          minWidth: 0,
          // On tablet/phone widths the nav row is wider than the space
          // beside the logo; scroll it within the header instead of letting
          // it widen the whole page. No effect on desktop, where it fits.
          overflowX: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              color:
                item.label === activeLabel
                  ? "oklch(58% 0.16 45)"
                  : "oklch(23% 0.012 60)",
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link href={ctaHref} style={ctaStyle}>
          {ctaLabel}
        </Link>
      </nav>
    </header>
  );
}
