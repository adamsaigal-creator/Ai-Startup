import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Oakville Real Estate — Saigal Realty Inc., Brokerage",
  description:
    "Oakville real estate — homes for sale, market stats, schools, waterfront, and commute.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={undefined} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <div style={{ padding: "18px 56px 0", fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
          <a href="/">
            Home
          </a>
          /
          <a href="/neighbourhoods">
            Neighbourhoods
          </a>
          /
          <span>
            Oakville
          </span>
        </div>
        <section style={{ position: "relative", height: "56vh", minHeight: "420px", width: "100%", marginTop: "18px" }}>
          <img alt="Oakville waterfront / downtown" id="oakville-hero" src="/uploads/Oakville Harbour and Historic Lighthouse.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.25), oklch(15% 0.01 60 / 0.65))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 56px 48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "14px" }}>
              Halton Region
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              Oakville Real Estate
            </h1>
          </div>
        </section>
        <section style={{ padding: "64px 56px 20px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            Oakville pairs small-town character with some of the most sought-after real estate in the GTA. From the tree-lined heritage streets of Old Oakville and the Lake Ontario shoreline at Bronte, to family-friendly newer developments in Glen Abbey and West Oak Trails, the town offers a range that spans starter condos to significant waterfront estates. Excellent schools, a walkable downtown, and GO and QEW access make it a consistent draw for families and professionals commuting into Toronto or Mississauga.
          </p>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            We work across Oakville's core neighbourhoods regularly, and bring detailed knowledge of pricing by street, school catchments, and where value remains to every buyer and seller conversation.
          </p>
        </section>
        <section style={{ padding: "20px 56px 80px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", textAlign: "center" }}>
          <div style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              $1.38M
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Avg. Sale Price
              <span style={{ opacity: "0.6" }}>
                (sample)
              </span>
            </p>
          </div>
          <div style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              21
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Avg. Days on Market
              <span style={{ opacity: "0.6" }}>
                (sample)
              </span>
            </p>
          </div>
          <div style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              220K+
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Population
              <span style={{ opacity: "0.6" }}>
                (sample)
              </span>
            </p>
          </div>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Living in Oakville
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Schools, Waterfront & Commute
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Schools
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                Oakville is home to some of Halton's highest-ranked public and independent schools, a major factor driving demand in neighbourhoods like Glen Abbey and River Oaks.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Waterfront & Parks
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                The Lake Ontario waterfront trail, Bronte Harbour, and Coronation Park give Oakville a lifestyle few GTA communities can match.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Commute
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                Oakville GO offers a direct line to downtown Toronto, and QEW access makes commuting to Mississauga and the western GTA straightforward.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "20px 56px 100px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "40px" }}>
              <div>
                <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                  Current Inventory
                </span>
                <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
                  Featured Oakville Listings
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
                IDX feed placeholder — connect Proptx
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="ov-listing-1" src="/images/listing-glen-abbey.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $1,295,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    4 bed · 3 bath · Glen Abbey
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="ov-listing-2" src="/images/luxury-estate.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $2,450,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    5 bed · 4 bath · Old Oakville
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="ov-listing-3" src="/images/listing-old-milton.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $989,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    3 bed · 2 bath · River Oaks
                  </p>
                </div>
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
              Oakville Real Estate FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Is Oakville a good place to buy a home right now?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Oakville consistently ranks among the GTA's most desirable communities for schools, waterfront access, and long-term value retention, though it commands a premium over Milton and Burlington.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What are the best neighbourhoods in Oakville for families?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Glen Abbey, River Oaks, and West Oak Trails offer newer builds close to top schools, while Old Oakville and Bronte suit buyers prioritizing heritage character or waterfront living.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How competitive is the Oakville market for buyers?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Well-located, well-priced homes still move quickly, particularly in top school catchments — a clear pre-approval and a responsive strategy matter more here than in most surrounding markets.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Nearby
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "14px 0 28px" }}>
            Explore Neighbouring Communities
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", fontSize: "15px", fontWeight: "500" }}>
            <a href="/neighbourhoods/milton">
              Milton
            </a>
            <a href="/neighbourhoods/burlington">
              Burlington
            </a>
            <a href="/neighbourhoods/mississauga">
              Mississauga
            </a>
            <a href="/luxury">
              Luxury Homes
            </a>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Thinking about Oakville?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let's talk about what's happening on your street.
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
