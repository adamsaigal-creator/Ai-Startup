import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/data/site-settings";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("luxury");
  return buildPageMetadata({
    title: page?.seo_title ?? "Luxury Real Estate — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Discreet, considered representation for the region's finest properties.",
    path: "/luxury",
    ogTitle: page?.og_title,
    ogDescription: page?.og_description,
    ogImage: page?.og_image,
  });
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("luxury"), getSiteSettings()]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Luxury"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "60vh", minHeight: "460px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Signature luxury listing — estate home or waterfront property" id="luxury-hero" src={c.hero.image} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "820px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "18px" }}>{c.hero.eyebrow}</span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "56px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>{c.hero.headline}</h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>{c.hero.subhead}</p>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>{c.intro.body}</p>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {c.imageGrid.images.map((img: { src: string; alt: string }) => (
            <div key={img.src} style={{ position: "relative", height: "340px", borderRadius: "4px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" alt={img.alt} src={img.src} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", borderBottom: "1px solid oklch(85% 0.015 70)", paddingTop: "48px", paddingBottom: "48px" }}>
          {c.stats.items.map((s: { value: string; label: string }) => (
            <div key={s.value}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>{s.value}</span>
              <p style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.pockets.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.pockets.headline}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            {c.pockets.items.map((item: { title: string; body: string }) => (
              <div key={item.title}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px", color: "oklch(58% 0.16 45)" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.program.eyebrow}</span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0", color: "oklch(99% 0.004 90)" }}>{c.program.headline}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              {c.program.items.map((item: { number: string; title: string; body: string }) => (
                <div key={item.number}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>{item.number}</span>
                  <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px", color: "oklch(99% 0.004 90)" }}>{item.title}</h4>
                  <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(75% 0.02 60)" }}>{item.body}</p>
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
        <section style={{ padding: "100px 56px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.globalNetwork.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "16px 0 20px" }}>{c.globalNetwork.headline}</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", maxWidth: "700px", margin: "0 auto 32px" }}>{c.globalNetwork.body}</p>
          <a href={c.globalNetwork.linkHref} style={{ fontSize: "14px", fontWeight: "600" }}>{c.globalNetwork.linkLabel}</a>
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
