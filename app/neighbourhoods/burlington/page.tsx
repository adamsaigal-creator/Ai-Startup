import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Burlington Real Estate — Saigal Realty Inc., Brokerage",
  description:
    "Burlington real estate — homes for sale, market stats, schools, waterfront, and commute.",
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
            Burlington
          </span>
        </div>
        <section style={{ position: "relative", height: "56vh", minHeight: "420px", width: "100%", marginTop: "18px" }}>
          <img alt="Burlington lakeshore / downtown" id="burlington-hero" src="/uploads/Golden Hour Over Burlington's Brant Street Pier.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.25), oklch(15% 0.01 60 / 0.65))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 56px 48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "14px" }}>
              Halton Region
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              Burlington Real Estate
            </h1>
          </div>
        </section>
        <section style={{ padding: "64px 56px 20px", maxWidth: "820px", margin: "0 auto" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            Burlington sits where the Niagara Escarpment meets Lake Ontario, giving it a rare combination of waterfront living, hiking trails, and a walkable downtown — all within commuting distance of Toronto and Hamilton. Established neighbourhoods like Aldershot and Shoreacres offer mature lots close to the lake, while Tyandaga and the city's north end appeal to families seeking newer builds and top-rated schools at a comparative discount to Oakville.
          </p>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            Our team tracks Burlington's neighbourhood-level trends closely, from waterfront premiums to which streets near the Escarpment are seeing the strongest demand.
          </p>
        </section>
        <section style={{ padding: "20px 56px 80px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", textAlign: "center" }}>
          <div style={{ padding: "32px", background: "oklch(94% 0.015 70)" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              $1.09M
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
              19
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
              190K+
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
              Living in Burlington
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
                Burlington offers strong public and Catholic school options across the city, with several highly-rated schools in the Tyandaga and Millcroft areas.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Waterfront & Escarpment
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                The Beachway waterfront trail, Spencer Smith Park, and Escarpment hiking access give Burlington an outdoor lifestyle unmatched by most Halton communities.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "0 0 12px" }}>
                Commute
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.75", color: "oklch(46% 0.02 60)" }}>
                Burlington GO and easy QEW/403 access make commuting to Toronto, Hamilton, and Oakville straightforward.
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
                  Featured Burlington Listings
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "oklch(46% 0.02 60)" }}>
                IDX feed placeholder — connect Proptx
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="bur-listing-1" src="/images/listing-scott.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $949,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    3 bed · 2 bath · Tyandaga
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="bur-listing-2" src="/images/luxury-waterfront.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $1,725,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    4 bed · 3 bath · Shoreacres
                  </p>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                <img alt="Listing photo" id="bur-listing-3" src="/images/listing-beaty.png" style={{ width: "100%", height: "220px" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600" }}>
                    $815,000
                  </span>
                  <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "6px 0 0" }}>
                    3 bed · 2 bath · Aldershot
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
              Burlington Real Estate FAQ
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                Is Burlington a good place to buy a home right now?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Burlington offers waterfront and Escarpment access at a meaningful discount to Oakville, making it attractive to buyers who want the lifestyle without the top-tier price tag.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                What are the best neighbourhoods in Burlington for families?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Tyandaga and Millcroft are popular for newer builds and school access, while Aldershot and Shoreacres appeal to buyers prioritizing proximity to the lake.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How long does it typically take to sell a home in Burlington?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Well-priced homes in strong Burlington neighbourhoods commonly sell within a few weeks; waterfront-adjacent listings often move even faster with the right marketing.
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
            <a href="/neighbourhoods/milton">
              Milton
            </a>
            <a href="/luxury">
              Luxury Homes
            </a>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Thinking about Burlington?
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
