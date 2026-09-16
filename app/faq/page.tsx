import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Saigal Realty Inc., Brokerage",
  description:
    "Answers to common questions about buying, selling, and working with Saigal Realty.",
};

const NAV = [{ label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"FAQ"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Answers
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 32px" }}>
            Frequently Asked Questions
          </h1>
          <img alt="Team consultation photo" id="faq-hero" src="/uploads/sraa.png" style={{ width: "100%", height: "280px", borderRadius: "4px", display: "block" }} />
        </section>
        <section style={{ padding: "0 56px 60px", maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          <a href="#milton" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>
            Milton Real Estate FAQs
          </a>
          <a href="#buyers" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>
            Buyer FAQs
          </a>
          <a href="#sellers" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>
            Seller FAQs
          </a>
          <a href="#team" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>
            Working with Our Team FAQs
          </a>
          <a href="#market" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>
            General Market & Investment FAQs
          </a>
          <a href="#luxury" style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", fontSize: "15px", fontWeight: "500" }}>
            Luxury Real Estate FAQs
          </a>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
          <div id="milton">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              Milton Real Estate
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Is Milton a good place to buy a home right now?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Milton continues to offer stronger value than Oakville or Burlington while providing comparable access to the Escarpment, GO transit, and top schools.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  What are the best neighbourhoods in Milton for families?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Beaty, Scott, and the Ford neighbourhoods are popular for newer builds and school proximity, while Old Milton offers mature streets closer to downtown.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  What is the average home price in Milton?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Pricing varies significantly by neighbourhood and property type — request a free comparative market analysis and we'll give you current, street-level numbers rather than a citywide average.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Is Milton well connected to Toronto for commuters?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Milton GO offers direct service to Union Station, and the 401/407 corridor makes driving commutes to Mississauga and the west GTA straightforward.
                </p>
              </div>
            </div>
          </div>
          <div id="buyers">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              Buyer FAQs
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  How do I start searching for homes for sale?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Use the search tool on our homepage to filter by location, price, and bedrooms, or book a consultation and we'll set up custom alerts.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Do I need to be pre-approved before viewing homes?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  We recommend it — it clarifies your budget and makes your offer stronger once you find the right home. We can connect you with trusted mortgage contacts.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  What costs should I budget for beyond the purchase price?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Land transfer tax, legal fees, home inspection, and moving costs typically add 2-4% of the purchase price — we'll walk you through the exact numbers for your situation.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Can you help me buy and sell at the same time?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Yes — we coordinate closing dates, bridge financing conversations, and offer conditions so your sale and purchase move in step.
                </p>
              </div>
            </div>
          </div>
          <div id="sellers">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              Seller FAQs
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Do you offer a free home evaluation?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Yes — we provide a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  How long does it typically take to sell a home?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Well-priced homes in desirable neighbourhoods commonly sell within a few weeks; condition, presentation, and pricing strategy are the biggest factors.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Should I renovate before selling?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Rarely for major projects — most renovations don't return their full cost at sale. We'll advise on the small, high-return fixes worth making before your listing goes live.
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
            </div>
          </div>
          <div id="team">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              Working with Our Team
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  How is Saigal Realty different from a large national brokerage?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  As a boutique brokerage, every client works directly with a small, senior team — not a call centre. We prioritize honest counsel over transaction volume.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Which languages does your team speak?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Between our agents we speak English, Urdu, Hindi, Punjabi, and Arabic.
                </p>
              </div>
            </div>
          </div>
          <div id="market">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              General Market & Investment
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Which areas does Saigal Realty serve?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  We focus on Milton, Oakville, and Burlington, with additional coverage across Cambridge, Kitchener, Toronto, Mississauga, and York Region.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Can Saigal Realty help with commercial real estate?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Yes — we handle office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington in addition to residential buying and selling.
                </p>
              </div>
            </div>
          </div>
          <div id="luxury">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>
              Luxury Real Estate
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  What makes luxury real estate in Ontario unique?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Luxury in Milton, Oakville, and Burlington is defined by lot size, waterfront and Escarpment proximity, top school catchments, and finishes that hold their value.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  Which areas are best for luxury homes?
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Old Oakville and the Bronte waterfront, Burlington's Shoreacres and Tyandaga, and Milton's Escarpment-adjacent estate lots. See our
                  <a href="/luxury">
                    Luxury page
                  </a>
                  for more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
