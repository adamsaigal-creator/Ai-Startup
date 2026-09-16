import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Property Search — Saigal Realty Inc., Brokerage",
  description:
    "Search active listings across Halton by location, price, property type, and more.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Search"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "64px 56px 0", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Milton · Oakville · Burlington
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "44px", fontWeight: "600", margin: "16px 0 12px" }}>
            Property Search
          </h1>
          <p style={{ fontSize: "16px", color: "oklch(46% 0.02 60)", maxWidth: "640px", margin: "0 auto 40px" }}>
            Search active listings across Halton by location, price, property type, and more.
          </p>
        </section>
        <section style={{ padding: "0 56px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", boxShadow: "0 10px 30px oklch(20% 0.01 60 / 0.08)", padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "end", gap: "20px", flexWrap: "wrap" }}>
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
                  <option>
                    Cambridge
                  </option>
                  <option>
                    Kitchener
                  </option>
                  <option>
                    Toronto
                  </option>
                  <option>
                    Mississauga
                  </option>
                  <option>
                    York Region
                  </option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "130px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                  Status
                </label>
                <select style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }}>
                  <option>
                    For Sale
                  </option>
                  <option>
                    For Rent
                  </option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "100px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                  Min Price
                </label>
                <input placeholder="No min" style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }} type="text" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1", minWidth: "100px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                  Max Price
                </label>
                <input placeholder="No max" style={{ border: "none", borderBottom: "1px solid oklch(83% 0.015 70)", padding: "6px 2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "transparent", color: "oklch(23% 0.012 60)" }} type="text" />
              </div>
              <button style={{ padding: "13px 34px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer", flexShrink: "0" }}>
                Search
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", borderTop: "1px solid oklch(90% 0.012 70)", paddingTop: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                  Property Type
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(23% 0.012 60)", borderRadius: "20px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Residential
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Townhomes
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Condos
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Multi-Family
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Commercial
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Land
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Co-op
                  </button>
                  <button style={{ padding: "8px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "20px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Other
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)" }}>
                  Beds
                </label>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(23% 0.012 60)", borderRadius: "4px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Any
                  </button>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "4px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    Studio
                  </button>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "4px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    1
                  </button>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "4px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    2
                  </button>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "4px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    3
                  </button>
                  <button style={{ padding: "8px 14px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "4px", background: "transparent", color: "oklch(35% 0.015 60)", fontSize: "13px", fontFamily: "var(--font-work-sans), sans-serif", cursor: "pointer" }}>
                    4+
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "oklch(46% 0.02 60)", textAlign: "center", margin: "14px 0 0" }}>
            Live IDX results will populate here once connected to Proptx.
          </p>
        </section>
        <section style={{ padding: "60px 56px 100px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
            <div>
              <img alt="Listing photo" id="listing-1" src="/uploads/sraa.png" style={{ width: "100%", height: "220px", borderRadius: "4px", display: "block", marginBottom: "14px" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                For Sale · Milton
              </span>
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "8px 0 4px" }}>
                Sample Listing
              </h4>
              <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0" }}>
                3 bd · 2 ba · Placeholder
              </p>
            </div>
            <div>
              <img alt="Listing photo" id="listing-2" src="/uploads/sraa.png" style={{ width: "100%", height: "220px", borderRadius: "4px", display: "block", marginBottom: "14px" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                For Sale · Oakville
              </span>
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "8px 0 4px" }}>
                Sample Listing
              </h4>
              <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0" }}>
                4 bd · 3 ba · Placeholder
              </p>
            </div>
            <div>
              <img alt="Listing photo" id="listing-3" src="/uploads/sraa.png" style={{ width: "100%", height: "220px", borderRadius: "4px", display: "block", marginBottom: "14px" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                For Sale · Burlington
              </span>
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "8px 0 4px" }}>
                Sample Listing
              </h4>
              <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0" }}>
                2 bd · 2 ba · Placeholder
              </p>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
