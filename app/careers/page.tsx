import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";

const NAV = [{ label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("careers");
  return {
    title: page?.seo_title ?? "Careers — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Join the Saigal Realty team serving Milton, Oakville, and Burlington.",
  };
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("careers"), getSiteSettings()]);
  const c = page!.content;
  const formAction = `mailto:${settings.contact_form_destination_email}`;

  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Careers"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "48vh", minHeight: "380px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Team working together" id="careers-hero" src={c.hero.image} style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "820px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "18px" }}>{c.hero.eyebrow}</span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>{c.hero.headline}</h1>
          </div>
        </section>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>{c.intro.body}</p>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
          {c.benefits.items.map((item: { title: string; body: string }) => (
            <div key={item.title} style={{ textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 12px" }}>{item.title}</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>{item.body}</p>
            </div>
          ))}
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.process.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "14px 0 0" }}>{c.process.headline}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
            {c.process.items.map((item: { number: string; title: string; body: string }) => (
              <div key={item.number} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>{item.number}</span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 8px" }}>{item.title}</h4>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "80px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.openRoles.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "14px 0 40px", color: "oklch(99% 0.004 90)" }}>{c.openRoles.headline}</h2>
          <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1px", background: "oklch(35% 0.015 60)" }}>
            {c.openRoles.items.map((role: { title: string; location: string }) => (
              <div key={role.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "oklch(23% 0.012 60)" }}>
                <span style={{ fontSize: "16px", color: "oklch(99% 0.004 90)", fontWeight: "500" }}>{role.title}</span>
                <span style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(70% 0.02 60)" }}>{role.location}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "oklch(65% 0.02 60)", margin: "24px 0 0" }}>{c.openRoles.footnote}</p>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.applyForm.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>{c.applyForm.headline}</h2>
          </div>
          <form action={formAction} method="post" encType="text/plain" style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input type="text" name="Name" placeholder="Full name" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} />
              <input type="email" name="Email" placeholder="Email address" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} />
            </div>
            <input type="tel" name="Phone" placeholder="Phone" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} />
            <input type="text" name="License Status" placeholder="Are you currently licensed? (RECO status)" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} />
            <textarea name="Message" placeholder="Tell us about your experience and goals" rows={4} style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)", resize: "vertical" }}></textarea>
            <button type="submit" style={{ padding: "16px 40px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer", justifySelf: "center" }}>{c.applyForm.buttonLabel}</button>
          </form>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
