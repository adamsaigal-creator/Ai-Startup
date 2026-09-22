import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getNeighbourhoodsByCity } from "@/lib/data/neighbourhoods";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("neighbourhoods");
  return buildPageMetadata({
    title: page?.seo_title ?? "Neighbourhoods We Serve — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Explore 50+ neighbourhoods across Milton, Oakville, Burlington, Mississauga, and beyond.",
    path: "/neighbourhoods",
    ogTitle: page?.og_title,
    ogDescription: page?.og_description,
    ogImage: page?.og_image,
  });
}

type CityGroup = { city: string; anchor: string; overviewHref?: string; overviewLabel?: string; heading?: string; body: string };
type WhyHaltonItem = { title: string; body: string; linkLabel?: string; linkHref?: string };

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("neighbourhoods"), getSiteSettings()]);
  const c = page!.content;
  const cityGroups = c.cityGroups as CityGroup[];
  const linksByCity = Object.fromEntries(
    await Promise.all(cityGroups.map(async (g) => [g.city, await getNeighbourhoodsByCity(g.city)] as const))
  );

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Neighbourhoods"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            {c.hero.eyebrow}
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 12px" }}>
            {c.hero.headline}
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0 0 32px" }}>
            {c.hero.body}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Aerial view of Halton region" id="neighbourhoods-hero" src={c.hero.image} style={{ width: "100%", height: "280px", borderRadius: "4px", display: "block" }} />
        </section>
        <section style={{ padding: "0 56px 80px", maxWidth: "640px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", fontSize: "14px", fontWeight: "600" }}>
          {c.quickNav.map((item: { label: string; href: string }) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
          {cityGroups.map((group) => (
            <div key={group.anchor} id={group.anchor}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0", color: "oklch(58% 0.16 45)" }}>
                  {group.heading ?? group.city}
                </h2>
                {group.overviewHref && group.overviewLabel && (
                  <a href={group.overviewHref} style={{ fontSize: "14px", fontWeight: "600" }}>{group.overviewLabel}</a>
                )}
              </div>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
                {group.body}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
                {linksByCity[group.city].map((n: { slug: string; name: string }) => (
                  <a key={n.slug} href={`/${n.slug}`}>{n.name}</a>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", paddingTop: "56px" }}>
          {(c.whyHalton.items as WhyHaltonItem[]).map((item) => (
            <div key={item.title}>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
                {item.body}
                {item.linkLabel && item.linkHref && <a href={item.linkHref}>{item.linkLabel}</a>}
              </p>
            </div>
          ))}
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
