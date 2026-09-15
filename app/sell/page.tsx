import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Sell Your Home — Saigal Realty Inc., Brokerage",
  description:
    "A precise market analysis and a marketing plan built for today's buyer.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Buy", href: "/buy" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Sell"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "52vh", minHeight: "420px", width: "100%" }}>
          <img alt="Beautifully staged home exterior" id="sell-hero" src="/images/sell-hero.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>
              Milton · Oakville · Burlington
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 18px" }}>
              Selling Your Home
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>
              Precise pricing, considered presentation, and firm negotiation — priced right, positioned well.
            </p>
          </div>
        </section>
        <section style={{ padding: "56px 56px 20px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", margin: "0 0 14px" }}>
            What's Your Home Worth?
          </h2>
          <p style={{ fontSize: "15px", color: "oklch(46% 0.02 60)", margin: "0 0 24px" }}>
            Get a complimentary comparative market analysis — no obligation.
          </p>
          <a href="/contact" style={{ display: "inline-block", padding: "15px 36px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
            Request a Free Home Evaluation
          </a>
        </section>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              How It Works
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Selling With Confidence
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                01
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Pricing Strategy
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                A precise comparative market analysis grounded in real, recent local sales — not guesswork.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                02
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Presentation
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                Staging guidance and professional photography that show your home at its best.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                03
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Marketing
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                A listing strategy built for today's buyer, reaching qualified prospects and agent networks.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", color: "oklch(58% 0.16 45)" }}>
                04
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "12px 0 8px" }}>
                Negotiate & Close
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                Firm negotiation on your behalf, and clear coordination through to closing day.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            The Difference
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "16px 0 40px" }}>
            Why Sellers Choose Saigal Realty
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            <div style={{ padding: "32px 24px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
                1:7
              </span>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                Client-to-agent ratio kept low so every listing gets senior-level attention
              </p>
            </div>
            <div style={{ padding: "32px 24px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
                50+
              </span>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                Neighbourhoods of hands-on pricing knowledge across Halton
              </p>
            </div>
            <div style={{ padding: "32px 24px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
                0%
              </span>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                Pressure — honest advice even when it isn't what you hoped to hear
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
              Selling FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Do you offer a free home evaluation?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How long does it typically take to sell a home?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Well-priced homes in desirable neighbourhoods commonly sell within a few weeks; condition and pricing strategy are the biggest factors.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Should I make repairs before listing?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Small, high-return fixes often pay off — we'll walk your home with you and point out what's worth doing before photos.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What are your commission rates?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Commission is negotiable and discussed transparently at your listing consultation — no surprises, no pressure.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How do you market my listing?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Professional photography, a considered listing narrative, MLS/Proptx syndication, and direct outreach to our buyer and agent network.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Thinking about selling?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let's talk about your timeline and goals.
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
