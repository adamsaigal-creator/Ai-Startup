import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("commercial");
  return {
    title: page?.seo_title ?? "Commercial Real Estate — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington.",
  };
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("commercial"), getSiteSettings()]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Commercial"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "52vh", minHeight: "420px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Office or retail storefront exterior" id="commercial-hero" src={c.hero.image} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>{c.hero.eyebrow}</span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 18px" }}>{c.hero.headline}</h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>{c.hero.subhead}</p>
          </div>
        </section>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.sectors.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.sectors.headline}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            {c.sectors.items.map((s: { title: string; image: string; body: string }) => (
              <div key={s.title} style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={s.title} src={s.image} style={{ width: "100%", height: "160px" }} />
                <div style={{ padding: "28px 26px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "0 56px 40px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.whyUs.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>{c.whyUs.headline}</h2>
            {c.whyUs.body.map((p: string, i: number) => (
              <p key={i} style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: i === c.whyUs.body.length - 1 ? "0" : "0 0 16px" }}>{p}</p>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {c.whyUs.checklist.map((item: string) => (
              <div key={item} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
                <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>✓</span>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.process.eyebrow}</span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.process.headline}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              {c.process.items.map((item: { number: string; title: string; body: string }) => (
                <div key={item.number} style={{ textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>{item.number}</span>
                  <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px" }}>{item.title}</h4>
                  <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.faq.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.faq.headline}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {c.faq.items.map((item: { question: string; answer: string }) => (
              <div key={item.question}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>{item.question}</h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.recentWork.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.recentWork.headline}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            {c.recentWork.items.map((item: { tag: string; body: string }) => (
              <div key={item.tag} style={{ padding: "28px", background: "oklch(94% 0.015 70)", borderRadius: "4px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{item.tag}</span>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(35% 0.015 60)", margin: "10px 0 0" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>{c.cta.headline}</h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>{c.cta.body}</p>
          <a href={c.cta.buttonHref} style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>{c.cta.buttonLabel}</a>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
