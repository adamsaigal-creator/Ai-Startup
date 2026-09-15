import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Saigal Realty — Saigal Realty Inc., Brokerage",
  description:
    "A boutique brokerage built on honest counsel and quiet precision.",
};

const NAV = [{ label: "Buy", href: "/buy" }, { label: "Sell", href: "/sell" }, { label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Commercial", href: "/commercial" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"About"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "48vh", minHeight: "380px", width: "100%" }}>
          <img alt="Team or office photo" id="about-hero" src="/images/philosophy-lounge.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "780px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "16px" }}>
              About Us
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "50px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              Saigal Realty Inc., Brokerage
            </h1>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Our Philosophy
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", lineHeight: "1.3", margin: "18px 0 24px" }}>
            Real estate, practiced with passion, integrity, and transparency.
          </h2>
          <p style={{ fontSize: "17px", lineHeight: "1.8", color: "oklch(46% 0.02 60)" }}>
            We built Saigal Realty because we believe our clients deserve more than a transaction — they deserve a trusted advisor. Every recommendation we make is grounded in honest counsel, careful research, and a genuine investment in your outcome, not ours. Whether you are buying your first home in Milton, selling a family property in Oakville, or building a portfolio across Burlington, we bring the same quiet rigor and care to every relationship.
          </p>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px", textAlign: "center", borderTop: "1px solid oklch(85% 0.015 70)", borderBottom: "1px solid oklch(85% 0.015 70)", paddingTop: "48px", paddingBottom: "48px" }}>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              7
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Agents
            </p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              50+
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Neighbourhoods Served
            </p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              5
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              Languages Spoken
            </p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", color: "oklch(58% 0.16 45)" }}>
              5
            </span>
            <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(46% 0.02 60)", margin: "8px 0 0" }}>
              International Markets
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <img alt="Agent with clients in home" id="about-boutique" src="/images/about-advisory.png" style={{ width: "100%", height: "420px", borderRadius: "4px", display: "block" }} />
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Why Boutique
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "16px 0 20px", lineHeight: "1.25" }}>
              Small enough to know your name. Sharp enough to win your negotiation.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0 0 16px" }}>
              Large franchise offices measure success in transaction volume. We measure it in outcomes for the seven families we're working with this month — because that's how many we can serve without cutting corners.
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "oklch(46% 0.02 60)", margin: "0" }}>
              Every listing gets the Broker of Record's direct attention. Every offer is reviewed by someone who has walked the street it's on. That's the boutique advantage, and it's the reason our clients become referrals.
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "48px" }}>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", color: "oklch(58% 0.16 45)" }}>
              01
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "14px 0 10px" }}>
              Passion
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              We treat every home as if it were our own — because your milestones matter to us as much as they matter to you.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", color: "oklch(58% 0.16 45)" }}>
              02
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "14px 0 10px" }}>
              Integrity
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Straightforward advice, even when it isn't what you hoped to hear. Your trust is earned, never assumed.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", color: "oklch(58% 0.16 45)" }}>
              03
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", margin: "14px 0 10px" }}>
              Transparency
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Clear numbers, clear timelines, clear next steps — so you always know exactly where you stand.
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Meet The Team
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              The People Behind Saigal Realty
            </h2>
          </div>
          <div style={{ display: "flex", gap: "40px", overflowX: "auto", paddingBottom: "12px", scrollSnapType: "x mandatory" }}>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-nomi" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Nomi Saigal
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Broker of Record
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                English, Urdu, Hindi
              </p>
              <a href="tel:9058764126" style={{ fontSize: "13px" }}>
                (905) 876-4126
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-kamranm" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Kamran Mustafa
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Realtor®
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                English, Urdu, Hindi, Punjabi
              </p>
              <a href="tel:4168022012" style={{ fontSize: "13px" }}>
                (416) 802-2012
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-zak" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Zak Abdelnour
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Realtor®
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                English, Arabic
              </p>
              <a href="tel:6476389233" style={{ fontSize: "13px" }}>
                (647) 638-9233
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-alam" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Alam Arbi
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Realtor®
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                Residential & Commercial · English, Urdu, Hindi
              </p>
              <a href="tel:9052799991" style={{ fontSize: "13px" }}>
                (905) 279-9991
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-kamrans" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Kamran Saeed
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Realtor®
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                English, Urdu, Hindi, Punjabi
              </p>
              <a href="tel:4165532626" style={{ fontSize: "13px" }}>
                (416) 553-2626
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-numan" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Numan Shafiq
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Realtor®
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                English, Urdu, Hindi, Punjabi
              </p>
              <a href="tel:6472749241" style={{ fontSize: "13px" }}>
                (647) 274-9241
              </a>
            </div>
            <div style={{ textAlign: "center", flex: "0 0 200px", scrollSnapAlign: "start" }}>
              <img alt="Headshot" id="about-haider" src="/uploads/sraa.png" style={{ width: "160px", height: "160px", margin: "0 auto 18px" }} />
              <h4 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "19px", fontWeight: "600", margin: "0 0 4px" }}>
                Haider Mohammad
              </h4>
              <span style={{ fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Agent · Licensed in Dallas, TX
              </span>
              <p style={{ fontSize: "13px", color: "oklch(46% 0.02 60)", margin: "10px 0 0" }}>
                Pre-construction · English
              </p>
              <a href="tel:4694504352" style={{ fontSize: "13px" }}>
                (469) 450-4352
              </a>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Global Reach
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", margin: "14px 0 20px", color: "oklch(99% 0.004 90)" }}>
            International Exposure
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.75", color: "oklch(85% 0.02 60)", maxWidth: "700px", margin: "0 auto 48px" }}>
            Beyond Halton and the GTA, our network extends across five international markets — giving clients and referral partners a genuine global reach for cross-border buyers, sellers, and investors. In Rabat, Dubai, and Costa Rica, we also help clients purchase Airbnb and vacation-home properties.
          </p>
          <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "32px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Dallas, Texas
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                United States
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Rabat
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Morocco
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Dubai
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                United Arab Emirates
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Karachi
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Pakistan
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Costa Rica
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Vacation & Airbnb homes
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Careers
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "14px 0 16px" }}>
            Interested in Joining Our Team?
          </h2>
          <p style={{ fontSize: "15px", color: "oklch(46% 0.02 60)", margin: "0 0 28px" }}>
            We're always looking for agents who share our commitment to honest, client-first service.
          </p>
          <a href="/careers" style={{ display: "inline-block", padding: "15px 36px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
            View Careers
          </a>
        </section>
        <section style={{ padding: "100px 56px", textAlign: "center", background: "oklch(58% 0.16 45)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
            Let's work together.
          </h2>
          <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 32px" }}>
            A conversation costs nothing — reach out any time.
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
