import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Milton Real Estate — Saigal Realty Inc., Brokerage",
  description:
    "Milton real estate — homes for sale, market stats, schools, parks, and commute.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={undefined} ctaLabel="Book a Consultation" ctaHref="/#contact" ctaSize="md" />
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
            Milton
          </span>
        </div>
        <section style={{ position: "relative", height: "56vh", minHeight: "420px", width: "100%", marginTop: "18px" }}>
          <img alt="Milton streetscape / downtown" id="milton-hero" src="/uploads/Milton's Mill Pond at Golden Hour.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.25), oklch(15% 0.01 60 / 0.65))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 56px 48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "14px" }}>
              Halton Region
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              Milton Real Estate
            </h1>
          </div>
        </section>
        <section style={{ padding: "64px 56px 20px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            Milton has grown from a quiet Halton crossroads into one of the GTA's fastest-growing communities — and one of its most livable. Families are drawn to the town's mix of established neighbourhoods like Old Milton and newer master-planned communities near the Escarpment, all within easy reach of the Milton GO station and Highway 401. Whether you're searching for a starter townhome, a family home near top-rated schools, or a custom build backing onto the Niagara Escarpment, Milton offers a range few other Halton communities can match — often at a better value than neighbouring Oakville or Burlington.
          </p>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            We've represented buyers and sellers across Milton's core neighbourhoods for years, and we bring that street-level knowledge — school catchments, upcoming developments, which streets hold value — to every conversation.
          </p>
        </section>
        <section style={{ padding: "20px 56px 80px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", textAlign: "center" }}>
          <div style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              $965K
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
              18
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
              140K+
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
              Living in Milton
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Schools, Parks & Commute
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Schools
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                Milton is served by strong public and Catholic school boards, with several highly-rated elementary and secondary schools concentrated in the newer north-end communities.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Parks & Recreation
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                The Niagara Escarpment, Kelso Conservation Area, and an extensive trail network give Milton some of the best outdoor access in the GTA.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Commute
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                Milton GO connects downtown in under an hour, and Highway 401 access makes commuting to Mississauga and the western GTA straightforward.
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
                  Featured Milton Listings
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
                IDX feed placeholder — connect Proptx
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }}>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
                <img alt="Listing photo" id="listing-1" src="/images/listing-old-milton.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $899,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    3 bed · 2 bath · Old Milton
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
                <img alt="Listing photo" id="listing-2" src="/images/listing-scott.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $1,150,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    4 bed · 3 bath · Scott
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden" }}>
                <img alt="Listing photo" id="listing-3" src="/images/listing-beaty.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $749,900
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    2 bed · 2 bath · Beaty
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
              Milton Real Estate FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Is Milton a good place to buy a home right now?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Milton continues to offer stronger value than Oakville or Burlington while providing comparable access to the Escarpment, GO transit, and top schools — making it attractive to both first-time buyers and move-up families.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What are the best neighbourhoods in Milton for families?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Beaty, Scott, and the Ford neighbourhoods are popular for their newer builds, parks, and school proximity, while Old Milton offers mature streets and larger lots closer to downtown.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How long does it typically take to sell a home in Milton?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Well-priced homes in desirable Milton neighbourhoods commonly sell within a few weeks; condition, presentation, and pricing strategy remain the biggest factors in a faster sale.
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
            <a href="/neighbourhoods/oakville">
              Oakville
            </a>
            <a href="/neighbourhoods/burlington">
              Burlington
            </a>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Thinking about Milton?
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            Let's talk about what's happening on your street.
          </p>
          <a href="/#contact" style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
            Book a Consultation
          </a>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
