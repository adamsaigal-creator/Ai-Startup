import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Luxury Real Estate — Saigal Realty Inc., Brokerage",
  description:
    "Discreet, considered representation for the region's finest properties.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Luxury"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "60vh", minHeight: "460px", width: "100%" }}>
          <img alt="Signature luxury listing — estate home or waterfront property" id="luxury-hero" src="/images/luxury-hero.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "820px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "18px" }}>
              Milton · Oakville · Burlington
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "56px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
              Luxury Real Estate
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>
              Discreet, senior-level representation for Halton's most significant estates, waterfront properties, and legacy homes.
            </p>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            Luxury real estate is a different discipline. Pricing depends less on square footage and more on lot size, privacy, waterfront or Escarpment access, and the quality of finishes and craftsmanship. Marketing depends less on volume and more on precision — the right buyer, found quietly, at the right time. Our team brings senior-level experience to every high-value engagement, from private previews to closing, in Oakville's Old Oakville and Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate properties.
          </p>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          <div style={{ position: "relative", height: "340px", borderRadius: "4px", overflow: "hidden" }}>
            <img alt="Estate property" id="luxury-1" src="/images/luxury-estate.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "relative", height: "340px", borderRadius: "4px", overflow: "hidden" }}>
            <img alt="Waterfront property" id="luxury-2" src="/images/luxury-waterfront.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "relative", height: "340px", borderRadius: "4px", overflow: "hidden" }}>
            <img alt="Custom build interior" id="luxury-3" src="/images/luxury-interior.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", borderBottom: "1px solid oklch(85% 0.015 70)", paddingTop: "48px", paddingBottom: "48px" }}>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              1:7
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Client-to-agent ratio
            </p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              5
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              International markets for cross-border buyers
            </p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              100%
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Senior-agent involvement, every file
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Where We Focus
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Halton's Luxury Pockets
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px", color: "oklch(58% 0.16 45)" }}>
                Old Oakville & Bronte
              </h4>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Heritage estates and Lake Ontario waterfront lots, many held within families for generations. Discretion matters as much as marketing here.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px", color: "oklch(58% 0.16 45)" }}>
                Shoreacres & Tyandaga
              </h4>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Burlington's premier addresses combine mature tree cover, larger lots, and easy Escarpment and waterfront access.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 10px", color: "oklch(58% 0.16 45)" }}>
                Escarpment Estates, Milton
              </h4>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Larger acreage properties bordering the Niagara Escarpment offer privacy and scale increasingly rare closer to Toronto.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Our Approach
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0", color: "oklch(99% 0.004 90)" }}>
                The Signature Marketing Program
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              <div>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  01
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px", color: "oklch(99% 0.004 90)" }}>
                  Private Strategy Session
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(75% 0.02 60)" }}>
                  A confidential walkthrough of pricing, timing, and positioning before anything goes public.
                </p>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  02
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px", color: "oklch(99% 0.004 90)" }}>
                  Professional Presentation
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(75% 0.02 60)" }}>
                  Architectural photography, staging guidance, and a listing narrative built around the property's story.
                </p>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  03
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px", color: "oklch(99% 0.004 90)" }}>
                  Targeted Outreach
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(75% 0.02 60)" }}>
                  Direct introductions to qualified buyers and top agents across our local and international network.
                </p>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  04
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px", color: "oklch(99% 0.004 90)" }}>
                  Discreet Negotiation
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(75% 0.02 60)" }}>
                  Senior-level negotiation that protects your privacy and your position through to closing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Common Questions
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Luxury Real Estate FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What makes luxury real estate in Ontario unique?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Luxury in Milton, Oakville, and Burlington isn't just square footage — it's lot size, waterfront and Escarpment proximity, top school catchments, and finishes that hold their value.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Why choose Saigal Realty for a luxury purchase or sale?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                As a boutique brokerage, our senior team personally handles every high-value transaction — from private showings to negotiation — with the discretion and attention a significant purchase deserves.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Which areas are best for luxury homes near Milton, Oakville, and Burlington?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Old Oakville and the Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate lots are consistently the strongest performers for luxury buyers in Halton.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What should I know before buying a luxury home?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Review zoning and severance restrictions, well/septic or heritage designations where applicable, and get a clear read on comparable sales — luxury inventory is thin.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How do you ensure a luxury home sells at the best price?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                We pair a precise pricing strategy with targeted marketing — professional photography, a considered listing narrative, and direct outreach to qualified buyers and agent networks.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What should I know about maintaining a luxury property?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Larger lots, pools, and premium finishes carry higher upkeep and insurance costs — we help clients budget realistically for maintenance.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Beyond Halton
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "16px 0 20px" }}>
            A Global Network for Global Clients
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", maxWidth: "700px", margin: "0 auto 32px" }}>
            Many of our luxury clients also hold or seek property abroad. Through our offices and partners in Texas, Dubai, Rabat, Karachi, and Costa Rica, we connect Halton buyers and sellers to vetted opportunities — and vice versa — across borders.
          </p>
          <a href="/about" style={{ fontSize: "14px", fontWeight: "600" }}>
            Learn about our international reach →
          </a>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Considering a luxury purchase or sale?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            A discreet, senior-level conversation — no pressure.
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
