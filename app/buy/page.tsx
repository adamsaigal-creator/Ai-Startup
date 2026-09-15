import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Buy a Home — Saigal Realty Inc., Brokerage",
  description:
    "Honest guidance from search to closing across Milton, Oakville, and Burlington.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Sell", href: "/sell" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Buy"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "52vh", minHeight: "420px", width: "100%" }}>
          <img alt="Family walking into their new home" id="buy-hero" src="/images/buy-hero.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>
              Milton · Oakville · Burlington
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 18px" }}>
              Buying a Home
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>
              Honest guidance from search to closing — so your biggest investment starts on solid ground.
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
                <option>
                  Milton
                </option>
                <option>
                  Oakville
                </option>
                <option>
                  Burlington
                </option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "140px" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                Price Range
              </label>
              <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                <option>
                  Any
                </option>
                <option>
                  $500K–$800K
                </option>
                <option>
                  $800K–$1.2M
                </option>
                <option>
                  $1.2M–$2M
                </option>
                <option>
                  $2M+
                </option>
              </select>
            </div>
            <button style={{ padding: "13px 34px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer" }}>
              Search Listings
            </button>
          </div>
          <p style={{ fontSize: "12px", color: "oklch(46% 0.02 60)", textAlign: "center", margin: "14px 0 0" }}>
            IDX feed placeholder — connect Proptx
          </p>
        </section>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              How It Works
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Your Path to a New Home
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                01
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Get Pre-Approved
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                We connect you with trusted mortgage contacts so you know your real budget before you shop.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                02
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Search & Tour
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                Custom alerts and private showings across Milton, Oakville, and Burlington neighbourhoods.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                03
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Offer & Negotiate
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                Sharp local comps and firm negotiation to protect your interests, even in competitive markets.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                04
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Close With Confidence
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                Inspection, financing, and closing coordination handled — clear steps, no surprises.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Buyer Representation
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>
              Someone in your corner, not the seller's.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0 0 16px" }}>
              A listing agent works for the seller. As your buyer's representative, we work exclusively for you — surfacing red flags, pushing back on price, and making sure conditions protect your interests.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0" }}>
              Our fee is typically covered through the transaction, so working with a dedicated buyer's agent usually costs you nothing extra.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Off-market and pre-listing access through our local network
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Street-level pricing knowledge across 50+ Halton neighbourhoods
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Trusted referrals for inspectors, lenders, and lawyers
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Common Questions
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Buying FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Do I need to be pre-approved before viewing homes?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                We recommend it — it clarifies your budget and makes your offer stronger once you find the right home.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Which Milton, Oakville, or Burlington neighbourhood is right for me?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                It depends on budget, school priorities, and commute — visit our
                <a href="/neighbourhoods">
                  Neighbourhoods directory
                </a>
                or book a call and we'll narrow it down together.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How competitive is the current market?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Conditions vary street by street across Halton — we'll walk you through current comps for any specific area you're considering.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Does it cost anything to work with a buyer's agent?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                In most transactions, our fee is covered by the seller's side of the deal — so dedicated representation typically costs you nothing extra.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Can you help me find off-market listings?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — our local network often surfaces homes before they're publicly listed, giving you a head start in competitive pockets.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Ready to start your search?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let's talk about what you're looking for.
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
