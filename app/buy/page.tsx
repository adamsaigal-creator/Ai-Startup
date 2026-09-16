import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Sell", href: "/sell" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("buy");
  return {
    title: page?.seo_title ?? "Buy a Home — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Honest guidance from search to closing across Milton, Oakville, and Burlington.",
  };
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("buy"), getSiteSettings()]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Buy"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "52vh", minHeight: "420px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Family walking into their new home" id="buy-hero" src={c.hero.image} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>
              {c.hero.eyebrow}
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 18px" }}>
              {c.hero.headline}
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>
              {c.hero.subhead}
            </p>
          </div>
        </section>
        <section style={{ padding: "56px 56px 20px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", boxShadow: "0 10px 30px oklch(20% 0.01 60 / 0.08)", padding: "28px", display: "flex", alignItems: "end", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "2", minWidth: "200px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                Location
              </label>
              <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                {c.searchWidget.locations.map((loc: string) => <option key={loc}>{loc}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "140px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                Price Range
              </label>
              <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                {c.searchWidget.priceRanges.map((pr: string) => <option key={pr}>{pr}</option>)}
              </select>
            </div>
            <button style={{ padding: "13px 34px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer" }}>
              {c.searchWidget.buttonLabel}
            </button>
          </div>
          <p style={{ fontSize: "12px", color: "oklch(46% 0.02 60)", textAlign: "center", margin: "14px 0 0" }}>
            {c.searchWidget.caption}
          </p>
        </section>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.steps.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              {c.steps.headline}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
            {c.steps.items.map((step: { number: string; title: string; body: string }) => (
              <div key={step.number}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                  {step.number}
                </span>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.representation.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>
              {c.representation.headline}
            </h2>
            {c.representation.body.map((p: string, i: number) => (
              <p key={i} style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: i === c.representation.body.length - 1 ? "0" : "0 0 16px" }}>
                {p}
              </p>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {c.representation.checklist.map((item: string) => (
              <div key={item} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
                <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>✓</span>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>{item}</p>
              </div>
            ))}
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
            {c.faq.items.map((item: { question: string; answer: string; links?: { text: string; href: string }[] }) => (
              <div key={item.question}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>{item.question}</h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  {item.answer}
                  {item.links?.map((link) => (
                    <a key={link.href} href={link.href}> {link.text}</a>
                  ))}
                </p>
              </div>
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
