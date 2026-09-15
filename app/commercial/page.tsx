import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Commercial Real Estate — Saigal Realty Inc., Brokerage",
  description:
    "Office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Commercial"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "52vh", minHeight: "420px", width: "100%" }}>
          <img alt="Office or retail storefront exterior" id="commercial-hero" src="/images/commercial-hero.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>
              Milton · Oakville · Burlington
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 18px" }}>
              Commercial Real Estate
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "600px", margin: "0" }}>
              Office, retail, and industrial leasing and sales — backed by the same careful, transparent approach we bring to every residential client.
            </p>
          </div>
        </section>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              What We Handle
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Sectors We Serve
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
              <img alt="Office space" id="commercial-office" src="/images/commercial-office.png" style={{ width: "100%", height: "160px" }} />
              <div style={{ padding: "28px 26px" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
                  Office
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Leasing and sales for professional office space across Milton, Oakville, and Burlington's business corridors.
                </p>
              </div>
            </div>
            <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
              <img alt="Retail storefront" id="commercial-retail" src="/images/commercial-retail.png" style={{ width: "100%", height: "160px" }} />
              <div style={{ padding: "28px 26px" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
                  Retail
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Storefront and plaza opportunities in high-traffic locations, matched to your customer base.
                </p>
              </div>
            </div>
            <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
              <img alt="Industrial warehouse" id="commercial-industrial" src="/images/commercial-industrial.png" style={{ width: "100%", height: "160px" }} />
              <div style={{ padding: "28px 26px" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
                  Industrial
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  Warehouse and flex-space transactions supporting Halton's growing logistics and manufacturing base.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 40px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Why Us
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>
              Commercial deals need residential-grade attention to detail.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0 0 16px" }}>
              Small business owners and investors are often underserved by commercial brokers focused on volume. We bring the same boutique, senior-level attention to a 1,500 sq ft storefront lease that we do to a multi-million dollar estate sale.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0" }}>
              That means real answers on zoning, permitted use, and lease structure — not a generic template pushed through quickly.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Local zoning and permitted-use knowledge across Milton, Oakville, and Burlington
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Lease-term negotiation covering escalations, CAM charges, and renewal options
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px", background: "oklch(99% 0.004 90)", borderRadius: "4px" }}>
              <span style={{ fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                ✓
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(35% 0.015 60)", margin: "0" }}>
                Direct connections to lenders, contractors, and commercial legal counsel
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                How We Work
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
                Our Commercial Process
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  01
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px" }}>
                  Needs Assessment
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                  We define space, budget, timeline, and zoning requirements upfront.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  02
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px" }}>
                  Market Search
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                  We identify available and off-market opportunities that fit your criteria.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  03
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px" }}>
                  Negotiation
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                  We negotiate rent, terms, and total occupancy cost — not just the headline rate.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                  04
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "12px 0 8px" }}>
                  Closing
                </h4>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "oklch(46% 0.02 60)" }}>
                  We coordinate legal, financing, and due diligence through to possession.
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
              Commercial FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Do you handle both leasing and sales?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — we represent landlords, tenants, buyers, and sellers across office, retail, and industrial commercial real estate.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Which areas do you cover for commercial?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Our core focus is Milton, Oakville, and Burlington, with additional reach across the wider GTA and Halton region.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Can you help with investment properties?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — from single retail units to multi-tenant industrial buildings, we help investors evaluate and acquire commercial assets.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What should I know about total occupancy cost?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Base rent is only part of the cost — common area charges, utilities, taxes, and insurance pass-throughs can add significantly to your total spend. We break this down before you sign anything.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Do you represent landlords as well as tenants?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — we represent both sides of commercial transactions, always disclosing our role clearly to protect your interests.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Recent Work
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              The Kind of Deals We Handle
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px" }}>
            <div style={{ padding: "28px", background: "oklch(94% 0.015 70)", borderRadius: "4px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Retail Lease
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(35% 0.015 60)", margin: "10px 0 0" }}>
                Secured a 5-year lease with a capped renewal option for a growing Milton retailer, saving roughly 12% in projected occupancy cost over the term.
              </p>
            </div>
            <div style={{ padding: "28px", background: "oklch(94% 0.015 70)", borderRadius: "4px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Office Sale
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(35% 0.015 60)", margin: "10px 0 0" }}>
                Represented the seller of a professional office building in Oakville, coordinating tenant estoppels and closing in under 60 days.
              </p>
            </div>
            <div style={{ padding: "28px", background: "oklch(94% 0.015 70)", borderRadius: "4px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Industrial Acquisition
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(35% 0.015 60)", margin: "10px 0 0" }}>
                Guided an investor through zoning due diligence on a Burlington flex-space property ahead of a successful acquisition.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Have a commercial need?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let's talk about your space or investment goals.
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
