import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getPublishedTeamMembers } from "@/lib/data/team";

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("about");
  return buildPageMetadata({
    title: page?.seo_title ?? "About Saigal Realty — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "A boutique brokerage built on honest counsel and quiet precision.",
    path: "/about",
    ogTitle: page?.og_title,
    ogDescription: page?.og_description,
    ogImage: page?.og_image,
  });
}

export default async function Page() {
  const [page, settings, teamMembers] = await Promise.all([getPage("about"), getSiteSettings(), getPublishedTeamMembers()]);
  const c = page!.content;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"About"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "48vh", minHeight: "380px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Team or office photo" id="about-hero" src={c.hero.image} style={{ objectFit: "cover", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>{c.hero.eyebrow}</span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "50px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>{c.hero.headline}</h1>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.philosophy.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", lineHeight: "1.3", margin: "18px 0 24px" }}>{c.philosophy.headline}</h2>
          <p style={{ fontSize: "17px", lineHeight: "1.8", color: "oklch(46% 0.02 60)" }}>{c.philosophy.body}</p>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", borderBottom: "1px solid oklch(85% 0.015 70)", paddingTop: "48px", paddingBottom: "48px" }}>
          {c.stats.items.map((s: { value: string; label: string }) => (
            <div key={s.label}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>{s.value}</span>
              <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" alt="Agent with clients in home" id="about-boutique" src={c.boutique.image} style={{ objectFit: "cover", width: "100%", height: "420px", borderRadius: "4px", display: "block" }} />
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.boutique.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>{c.boutique.headline}</h2>
            {c.boutique.body.map((p: string, i: number) => (
              <p key={i} style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: i === c.boutique.body.length - 1 ? "0" : "0 0 16px" }}>{p}</p>
            ))}
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "48px" }}>
          {c.pillars.items.map((p: { number: string; title: string; body: string }) => (
            <div key={p.number} style={{ textAlign: "center", padding: "0 16px" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", color: "oklch(58% 0.16 45)" }}>{p.number}</span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "14px 0 10px" }}>{p.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>{p.body}</p>
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.team.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.team.headline}</h2>
          </div>
          {/* Final Design pass (About.dc.html): studio portrait above a navy
              name panel, one shared stage height so every card lines up.
              Roster, order and photos still come from /admin/team. */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", columnGap: "32px", rowGap: "72px", paddingTop: "40px" }}>
            {teamMembers.map((m) => (
              <div key={m.id} data-agent={m.slug} style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <div style={{ position: "relative", height: "clamp(330px, 30vw, 400px)", width: "100%", overflow: "hidden", background: "#fff" }}>
                  {m.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" alt={`Portrait of ${m.name}`} id={`about-${m.slug}`} src={m.photo} width={1122} height={1402} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  )}
                </div>
                <div style={{ position: "relative", zIndex: 1, background: "oklch(15% 0.02 250)", height: "88px", boxSizing: "border-box", padding: "0 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", letterSpacing: "0.03em", lineHeight: "1.2", whiteSpace: "nowrap", margin: "0 0 6px", color: "oklch(78% 0.11 75)" }}>{m.name}</h4>
                  <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(72% 0.02 60)" }}>{m.role}</span>
                </div>
                <div style={{ textAlign: "center", padding: "16px 8px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "0" }}>{m.languages}</p>
                  {m.phoneHref && <a href={m.phoneHref} style={{ fontSize: "13px" }}>{m.phone}</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.internationalReach.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "14px 0 20px", color: "oklch(99% 0.004 90)" }}>{c.internationalReach.headline}</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.75", color: "oklch(85% 0.02 60)", maxWidth: "700px", margin: "0 auto 48px" }}>{c.internationalReach.body}</p>
          <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "32px" }}>
            {c.internationalReach.offices.map((o: { city: string; country: string }) => (
              <div key={o.city}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>{o.city}</span>
                <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>{o.country}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.careersCta.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "14px 0 16px" }}>{c.careersCta.headline}</h2>
          <p style={{ fontSize: "15px", color: "oklch(46% 0.02 60)", margin: "0 0 28px" }}>{c.careersCta.body}</p>
          <a href={c.careersCta.buttonHref} style={{ display: "inline-block", padding: "15px 36px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>{c.careersCta.buttonLabel}</a>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>{c.cta.headline}</h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>{c.cta.body}</p>
          <a href={c.cta.buttonHref} style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>{c.cta.buttonLabel}</a>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
