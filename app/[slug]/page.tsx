import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getNeighbourhood, NEIGHBOURHOOD_SLUGS } from "@/lib/neighbourhoods-data";

const NAV = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Search", href: "/search" },
  { label: "Neighbourhoods", href: "/neighbourhoods" },
  { label: "Luxury", href: "/luxury" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Luxury", href: "/luxury" },
  { label: "Neighbourhoods", href: "/neighbourhoods" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function generateStaticParams() {
  return NEIGHBOURHOOD_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { area } = getNeighbourhood(slug);
  return {
    title: `${area.name} Real Estate — Saigal Realty Inc., Brokerage`,
    description: area.tagline || `${area.name} real estate in ${area.city}, Ontario.`,
  };
}

export default async function NeighbourhoodPage({
  params,
}: PageProps<"/[slug]">) {
  const { slug } = await params;
  const { area, slotId, cityOverviewHref } = getNeighbourhood(slug);

  return (
    <>
      <SiteHeader nav={NAV} activeLabel="Neighbourhoods" ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <div style={{ padding: "18px 56px 0", fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
          <a href="/">Home</a> &nbsp;/&nbsp; <a href="/neighbourhoods">Neighbourhoods</a> &nbsp;/&nbsp;{" "}
          <a href={cityOverviewHref}>{area.city}</a> &nbsp;/&nbsp; <span>{area.name}</span>
        </div>
        <section style={{ padding: "60px 56px 20px", maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            {area.city}, Ontario
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 8px" }}>
            {area.name} Real Estate
          </h1>
          <p style={{ fontSize: "18px", color: "oklch(46% 0.02 60)", margin: "0 0 32px" }}>
            {area.tagline}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${area.name} streetscape`}
            id={slotId}
            src={area.img}
            style={{ width: "100%", height: "380px", borderRadius: "4px", display: "block" }}
          />
        </section>
        <section style={{ padding: "60px 56px 20px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            {area.body}
          </p>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Schools
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              {area.schools}
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Parks &amp; Recreation
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              {area.parks}
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Commute
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              {area.commute}
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <a href={cityOverviewHref} style={{ fontSize: "14px", fontWeight: "600" }}>
            ← Back to {area.city} overview
          </a>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Thinking about {area.name}?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let&apos;s talk about what&apos;s happening on this street.
          </p>
          <a href="/contact" style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
            Book a Consultation
          </a>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
