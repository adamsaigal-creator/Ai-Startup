import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getFeaturedListings } from "@/lib/data/listings";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("search");
  return {
    title: page?.seo_title ?? "Property Search — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Search active listings across Halton by location, price, property type, and more.",
  };
}

export default async function Page() {
  const [page, settings, listings] = await Promise.all([
    getPage("search"),
    getSiteSettings(),
    getFeaturedListings("Milton", 1).then(async (milton) => {
      const [oakville, burlington] = await Promise.all([getFeaturedListings("Oakville", 1), getFeaturedListings("Burlington", 1)]);
      return [...milton, ...oakville, ...burlington];
    }),
  ]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Search"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "64px 56px 0", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.hero.eyebrow}</span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "44px", fontWeight: "600", margin: "16px 0 12px" }}>{c.hero.headline}</h1>
          <p style={{ fontSize: "16px", color: "oklch(46% 0.02 60)", maxWidth: "640px", margin: "0 auto 40px" }}>{c.hero.body}</p>
        </section>
        <section style={{ padding: "0 56px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", boxShadow: "0 10px 30px oklch(20% 0.01 60 / 0.08)", padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "end", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "2", minWidth: "200px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Location</label>
                <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                  {c.filters.locations.map((loc: string) => <option key={loc}>{loc}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "130px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Status</label>
                <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                  {c.filters.statuses.map((s: string) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "100px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Min Price</label>
                <input type="text" placeholder="No min" style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "100px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Max Price</label>
                <input type="text" placeholder="No max" style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }} />
              </div>
              <button style={{ padding: "13px 34px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer", flexShrink: "0" }}>Search</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", borderTop: "1px solid oklch(90% 0.012 70)", paddingTop: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Property Type</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {c.filters.propertyTypes.map((t: string, i: number) => (
                    <button key={t} style={{ padding: "8px 16px", border: `1px solid ${i === 0 ? "oklch(23% 0.012 60)" : "oklch(83% 0.015 70)"}`, borderRadius: "20px", background: i === 0 ? "oklch(23% 0.012 60)" : "transparent", color: i === 0 ? "oklch(99% 0.004 90)" : "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>Beds</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {c.filters.bedOptions.map((b: string, i: number) => (
                    <button key={b} style={{ padding: "8px 14px", border: `1px solid ${i === 0 ? "oklch(23% 0.012 60)" : "oklch(83% 0.015 70)"}`, borderRadius: "4px", background: i === 0 ? "oklch(23% 0.012 60)" : "transparent", color: i === 0 ? "oklch(99% 0.004 90)" : "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>{b}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "oklch(46% 0.02 60)", textAlign: "center", margin: "14px 0 0" }}>{c.filters.caption}</p>
        </section>
        <section style={{ padding: "60px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
            {listings.map((listing) => (
              <div key={listing.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Listing photo" src={listing.image ?? "/uploads/sraa.png"} style={{ width: "100%", height: "220px", borderRadius: "4px", display: "block", marginBottom: "14px" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>For Sale · {listing.city}</span>
                <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "8px 0 4px" }}>{listing.neighbourhood}</h4>
                <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0" }}>{listing.beds} bd · {listing.baths} ba · {listing.price ? `$${Number(listing.price).toLocaleString()}` : "Price on request"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
