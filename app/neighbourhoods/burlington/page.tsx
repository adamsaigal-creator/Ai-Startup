import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getFeaturedListings } from "@/lib/data/listings";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("neighbourhoods-burlington");
  return {
    title: page?.seo_title ?? "Burlington Real Estate — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Burlington real estate — homes for sale, market stats, schools, waterfront, and commute.",
  };
}

type LifestyleItem = { title: string; body: string };
type FaqItem = { question: string; answer: string };
type NearbyItem = { label: string; href: string };

export default async function Page() {
  const [page, settings, listings] = await Promise.all([
    getPage("neighbourhoods-burlington"),
    getSiteSettings(),
    getFeaturedListings("Burlington", 3),
  ]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={undefined} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <div style={{ padding: "18px 56px 0", fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
          <a href="/">
            Home
          </a>
          /
          <a href="/neighbourhoods">
            Neighbourhoods
          </a>
          /
          <span>
            Burlington
          </span>
        </div>
        <section style={{ position: "relative", height: "56vh", minHeight: "420px", width: "100%", marginTop: "18px" }}>
          <img alt="Burlington lakeshore / downtown" id="burlington-hero" src={c.hero.image} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.25), oklch(15% 0.01 60 / 0.65))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 56px 48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "14px" }}>
              {c.hero.eyebrow}
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              {c.hero.headline}
            </h1>
          </div>
        </section>
        <section style={{ padding: "64px 56px 20px", maxWidth: "820px", margin: "0 auto" }}>
          {(c.intro.body as string[]).map((p, i) => (
            <p key={i} style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>{p}</p>
          ))}
        </section>
        <section style={{ padding: "20px 56px 80px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", textAlign: "center" }}>
          {(c.stats.items as { value: string; label: string }[]).map((s) => {
            const match = s.label.match(/^(.+?)\s+(\([^)]+\))$/);
            return (
              <div key={s.label} style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
                  {s.value}
                </span>
                <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
                  {match ? match[1] : s.label}
                  {match && <span style={{ opacity: "0.6" }}> {match[2]}</span>}
                </p>
              </div>
            );
          })}
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.lifestyle.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              {c.lifestyle.headline}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
            {(c.lifestyle.items as LifestyleItem[]).map((item) => (
              <div key={item.title}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "20px 56px 100px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "40px" }}>
              <div>
                <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                  Current Inventory
                </span>
                <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
                  Featured Burlington Listings
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
                IDX feed placeholder — connect Proptx
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
              {listings.map((listing, i) => (
                <div key={listing.id} style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                  <img alt="Listing photo" id={`bur-listing-${i + 1}`} src={listing.image ?? "/uploads/sraa.png"} style={{ width: "100%", height: "220px" }} />
                  <div style={{ padding: "20px" }}>
                    <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                      {listing.price ? `$${Number(listing.price).toLocaleString()}` : "Price on request"}
                    </span>
                    <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                      {listing.beds} bed · {listing.baths} bath · {listing.neighbourhood}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.faq.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              {c.faq.headline}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {(c.faq.items as FaqItem[]).map((item) => (
              <div key={item.question}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  {item.question}
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Nearby
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "14px 0 28px" }}>
            Explore Neighbouring Communities
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", fontSize: "15px", fontWeight: "500" }}>
            {(c.nearby.items as NearbyItem[]).map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            {c.cta.headline}
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            {c.cta.body}
          </p>
          <a href={c.cta.buttonHref} style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
            {c.cta.buttonLabel}
          </a>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
