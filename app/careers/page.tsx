import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Careers — Saigal Realty Inc., Brokerage",
  description:
    "Join the Saigal Realty team serving Milton, Oakville, and Burlington.",
};

const NAV = [{ label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={"Careers"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "48vh", minHeight: "380px", width: "100%" }}>
          <img alt="Team working together" id="careers-hero" src="/uploads/sraa.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.3), oklch(15% 0.01 60 / 0.7))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "820px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "18px" }}>
              Careers
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "52px", lineHeight: "1.1", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0" }}>
              Join Our Team
            </h1>
          </div>
        </section>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "17px", lineHeight: "1.85", color: "oklch(35% 0.015 60)" }}>
            We're a small brokerage by design — big enough to give you real support, small enough that you're never just a number. If you believe in honest counsel over volume sales, and want to build a career serving Milton, Oakville, and Burlington with a team that stands behind its name, we'd like to hear from you.
          </p>
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 12px" }}>
              Mentorship
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Direct, hands-on guidance from our Broker of Record and senior agents — not a generic training video.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 12px" }}>
              Local Reputation
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Decades of trust built in Halton means warmer leads and a name that opens doors in Milton, Oakville, and Burlington.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 12px" }}>
              Room to Grow
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Residential, commercial, and pre-construction opportunities — build the practice that fits how you want to work.
            </p>
          </div>
        </section>
        <section style={{ padding: "0 56px 100px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              How It Works
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "30px", fontWeight: "600", margin: "14px 0 0" }}>
              Our Hiring Process
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                01
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 8px" }}>
                Apply
              </h4>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)" }}>
                Send us your background and goals below.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                02
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 8px" }}>
                Conversation
              </h4>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)" }}>
                A no-pressure chat with our Broker of Record.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                03
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 8px" }}>
                Shadow a Deal
              </h4>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)" }}>
                See how we work before you commit.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", color: "oklch(58% 0.16 45)" }}>
                04
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 8px" }}>
                Onboard
              </h4>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "oklch(46% 0.02 60)" }}>
                Get set up with tools, leads, and a mentor.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "80px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Open Roles
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "14px 0 40px", color: "oklch(99% 0.004 90)" }}>
            Currently Hiring
          </h2>
          <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1px", background: "oklch(35% 0.015 60)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "oklch(23% 0.012 60)" }}>
              <span style={{ fontSize: "16px", color: "oklch(99% 0.004 90)", fontWeight: "500" }}>
                Residential Sales Agent
              </span>
              <span style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(70% 0.02 60)" }}>
                Milton / Oakville
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "oklch(23% 0.012 60)" }}>
              <span style={{ fontSize: "16px", color: "oklch(99% 0.004 90)", fontWeight: "500" }}>
                Commercial Leasing Associate
              </span>
              <span style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(70% 0.02 60)" }}>
                Burlington
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "oklch(23% 0.012 60)" }}>
              <span style={{ fontSize: "16px", color: "oklch(99% 0.004 90)", fontWeight: "500" }}>
                Licensed Assistant / Coordinator
              </span>
              <span style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(70% 0.02 60)" }}>
                Head Office
              </span>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "oklch(65% 0.02 60)", margin: "24px 0 0" }}>
            Don't see your fit? Apply anyway — we're always open to the right person.
          </p>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Apply
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 0" }}>
              Tell Us About Yourself
            </h2>
          </div>
          <form action="mailto:info@saigalrealty.ca" encType="text/plain" method="post" style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input name="Name" placeholder="Full name" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="text" />
              <input name="Email" placeholder="Email address" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="email" />
            </div>
            <input name="Phone" placeholder="Phone" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="tel" />
            <input name="License Status" placeholder="Are you currently licensed? (RECO status)" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="text" />
            <textarea name="Message" placeholder="Tell us about your experience and goals" rows={4} style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)", resize: "vertical" }}></textarea>
            <button style={{ padding: "16px 40px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer", justifySelf: "center" }} type="submit">
              Submit Application
            </button>
          </form>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
