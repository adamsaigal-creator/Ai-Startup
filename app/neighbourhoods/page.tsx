import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Neighbourhoods We Serve — Saigal Realty Inc., Brokerage",
  description:
    "Explore 50+ neighbourhoods across Milton, Oakville, Burlington, Mississauga, and beyond.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Neighbourhoods"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Directory
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 12px" }}>
            Neighbourhoods We Serve
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0 0 32px" }}>
            Eighty neighbourhood guides across Milton, Oakville, Burlington, Mississauga, and Waterloo Region — each with local schools, parks, and commute detail.
          </p>
          <img alt="Aerial view of Halton region" id="neighbourhoods-hero" src="/images/neighbourhoods-hero.png" style={{ width: "100%", height: "280px", borderRadius: "4px", display: "block" }} />
        </section>
        <section style={{ padding: "0 56px 80px", maxWidth: "640px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", fontSize: "14px", fontWeight: "600" }}>
          <a href="#milton">
            Milton
          </a>
          <a href="#oakville">
            Oakville
          </a>
          <a href="#burlington">
            Burlington
          </a>
          <a href="#mississauga">
            Mississauga
          </a>
          <a href="#kitchener">
            Kitchener
          </a>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
          <div id="milton">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0", color: "oklch(58% 0.16 45)" }}>
                Milton
              </h2>
              <a href="/neighbourhoods/milton" style={{ fontSize: "14px", fontWeight: "600" }}>
                Milton overview →
              </a>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
              One of the GTA's fastest-growing towns, offering stronger value than Oakville or Burlington with easy access to the Escarpment, GO transit, and top schools.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
              <a href="/old-milton">
                Old Milton
              </a>
              <a href="/beaty-milton">
                Beaty
              </a>
              <a href="/scott-milton">
                Scott
              </a>
              <a href="/ford-milton">
                Ford
              </a>
              <a href="/timberlea-milton">
                Timberlea
              </a>
              <a href="/bronte-meadows-milton">
                Bronte Meadows
              </a>
              <a href="/clarke-milton">
                Clarke
              </a>
              <a href="/harrison-milton">
                Harrison
              </a>
              <a href="/coates-milton">
                Coates
              </a>
              <a href="/cobban-milton">
                Cobban
              </a>
              <a href="/dempsey">
                Dempsey
              </a>
              <a href="/dorset-park-milton">
                Dorset Park
              </a>
              <a href="/walker-milton">
                Walker
              </a>
              <a href="/willmott-milton">
                Willmott
              </a>
            </div>
          </div>
          <div id="oakville">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0", color: "oklch(58% 0.16 45)" }}>
                Oakville
              </h2>
              <a href="/neighbourhoods/oakville" style={{ fontSize: "14px", fontWeight: "600" }}>
                Oakville overview →
              </a>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
              Heritage streets, Lake Ontario waterfront, and some of the GTA's most sought-after schools — spanning starter condos to significant estates.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
              <a href="/old-oakville">
                Old Oakville
              </a>
              <a href="/glen-abbey-oakville">
                Glen Abbey
              </a>
              <a href="/bronte-east-oakville">
                Bronte East
              </a>
              <a href="/bronte-west-oakville">
                Bronte West
              </a>
              <a href="/river-oaks-oakville">
                River Oaks
              </a>
              <a href="/west-oak-trails-oakville">
                West Oak Trails
              </a>
              <a href="/uptown-core-oakville">
                Uptown Core
              </a>
              <a href="/clearview-oakville">
                Clearview
              </a>
              <a href="/eastlake-oakville">
                Eastlake
              </a>
              <a href="/college-park-oakville">
                College Park
              </a>
              <a href="/iroquois-ridge-north-oakville">
                Iroquois Ridge North
              </a>
              <a href="/iroquois-ridge-south-oakville">
                Iroquois Ridge South
              </a>
              <a href="/palermo-west-oakville">
                Palermo West
              </a>
              <a href="/rural-oakville">
                Rural Oakville
              </a>
              <a href="/winston-park-oakville">
                Winston Park
              </a>
            </div>
          </div>
          <div id="burlington">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0", color: "oklch(58% 0.16 45)" }}>
                Burlington
              </h2>
              <a href="/neighbourhoods/burlington" style={{ fontSize: "14px", fontWeight: "600" }}>
                Burlington overview →
              </a>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
              Where the Niagara Escarpment meets Lake Ontario — waterfront living, hiking trails, and a walkable downtown at a discount to Oakville.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
              <a href="/aldershot-burlington">
                Aldershot
              </a>
              <a href="/tyandaga-burlington">
                Tyandaga
              </a>
              <a href="/shoreacres-burlington">
                Shoreacres
              </a>
              <a href="/roseland-burlington">
                Roseland
              </a>
              <a href="/millcroft-burlington">
                Millcroft
              </a>
              <a href="/headon-burlington">
                Headon Forest
              </a>
              <a href="/alton-burlington">
                Alton Village
              </a>
              <a href="/brant-hills-burlington">
                Brant Hills
              </a>
              <a href="/appleby-burlington">
                Appleby
              </a>
              <a href="/bayview-burlington">
                Bayview
              </a>
              <a href="/brant-burlington">
                Brant
              </a>
              <a href="/freeman-burlington">
                Freeman
              </a>
              <a href="/grindstone-burlington">
                Grindstone
              </a>
              <a href="/lasalle-burlington">
                LaSalle
              </a>
              <a href="/mountainside-burlington">
                Mountainside
              </a>
              <a href="/orchard-burlington">
                The Orchard
              </a>
              <a href="/palmer-burlington">
                Palmer
              </a>
              <a href="/rose-burlington">
                Rose
              </a>
              <a href="/rural-burlington">
                Rural Burlington
              </a>
              <a href="/tansley-burlington">
                Tansley
              </a>
              <a href="/uptown-burlington">
                Uptown
              </a>
            </div>
          </div>
          <div id="mississauga">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0 0 20px", color: "oklch(58% 0.16 45)" }}>
              Mississauga
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
              From Port Credit's lakeside village to Lorne Park's estates and City Centre's condo towers — Canada's sixth-largest city spans nearly every price point and property type.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
              <a href="/port-credit-mississauga">
                Port Credit
              </a>
              <a href="/lorne-park-mississauga">
                Lorne Park
              </a>
              <a href="/mineola-mississauga">
                Mineola
              </a>
              <a href="/clarkson-mississauga">
                Clarkson
              </a>
              <a href="/streetsville">
                Streetsville
              </a>
              <a href="/erin-mills-mississauga">
                Erin Mills
              </a>
              <a href="/central-erin-mills-mississauga">
                Central Erin Mills
              </a>
              <a href="/churchill-meadows-mississauga">
                Churchill Meadows
              </a>
              <a href="/city-centre-mississauga">
                City Centre
              </a>
              <a href="/cooksville-mississauga">
                Cooksville
              </a>
              <a href="/applewood-mississauga">
                Applewood
              </a>
              <a href="/dixie-mississauga">
                Dixie
              </a>
              <a href="/east-credit-mississauga">
                East Credit
              </a>
              <a href="/erindale-mississauga">
                Erindale
              </a>
              <a href="/creditview-mississauga">
                Creditview
              </a>
              <a href="/gateway-mississauga">
                Gateway
              </a>
              <a href="/hurontario-mississauga">
                Hurontario
              </a>
              <a href="/lakeview-mississauga">
                Lakeview
              </a>
              <a href="/lisgar-mississauga">
                Lisgar
              </a>
              <a href="/malton-mississauga">
                Malton
              </a>
              <a href="/mavis-erindale-mississauga">
                Mavis-Erindale
              </a>
              <a href="/meadwovale-mississauga">
                Meadowvale
              </a>
              <a href="/meadowvale-village-mississauga">
                Meadowvale Village
              </a>
              <a href="/mississauga-valleys-mississauga">
                Mississauga Valleys
              </a>
              <a href="/northeast-mississauga">
                Northeast Mississauga
              </a>
              <a href="/rathwood-mississauga">
                Rathwood
              </a>
              <a href="/sheridan-mississauga">
                Sheridan
              </a>
              <a href="/sheridan-park">
                Sheridan Park
              </a>
              <a href="/southdown-mississauga">
                Southdown
              </a>
            </div>
          </div>
          <div id="kitchener">
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "0 0 20px", color: "oklch(58% 0.16 45)" }}>
              Kitchener & Waterloo Region
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", maxWidth: "760px", margin: "0 0 28px" }}>
              Accessible pricing, strong rental demand, and continued transit and tech-sector investment make Waterloo Region a frequent focus for our investor clients.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px 20px", fontSize: "14px" }}>
              <a href="/kitchener-east">
                Kitchener East
              </a>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", paddingTop: "56px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Why We Focus on Halton
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Depth beats breadth. Knowing which streets hold value street-by-street is only possible by staying close to our core markets.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Local Comparables
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              We track recent sales at the neighbourhood level, so pricing advice reflects what's actually happening on your street, not a citywide average.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "0 0 10px" }}>
              Not Sure Where to Start?
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Tell us your budget and priorities and we'll recommend the neighbourhoods worth touring first.
              <a href="/contact">
                Get in touch →
              </a>
            </p>
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
