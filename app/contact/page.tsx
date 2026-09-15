import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Saigal Realty — Saigal Realty Inc., Brokerage",
  description:
    "Book a consultation with the Saigal Realty team.",
};

const NAV = [{ label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }];

export default function Page() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel={undefined} ctaLabel="Contact" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 40px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Get In Touch
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 32px" }}>
            Let's Talk About Your Next Move
          </h1>
          <img alt="Office exterior or handshake photo" id="contact-hero" src="/images/contact-hero.png" style={{ width: "100%", height: "280px", borderRadius: "4px", display: "block" }} />
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "64px" }}>
          <form action="mailto:info@saigalrealty.ca" encType="text/plain" method="post" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input name="Name" placeholder="Full name" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="text" />
              <input name="Email" placeholder="Email address" required style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="email" />
            </div>
            <input name="Phone" placeholder="Phone (optional)" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }} type="tel" />
            <select name="Reason" style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)" }}>
              <option>
                I'm looking to buy
              </option>
              <option>
                I'm looking to sell
              </option>
              <option>
                I'm interested in commercial
              </option>
              <option>
                I'm interested in luxury real estate
              </option>
              <option>
                Other
              </option>
            </select>
            <textarea name="Message" placeholder="Tell us about your goals" rows={5} style={{ padding: "14px 16px", border: "1px solid oklch(83% 0.015 70)", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", background: "oklch(99% 0.004 90)", resize: "vertical" }}></textarea>
            <button style={{ padding: "16px 40px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer" }} type="submit">
              Send Message
            </button>
          </form>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", padding: "40px", background: "oklch(23% 0.012 60)", borderRadius: "4px", color: "oklch(94% 0.01 70)" }}>
            <div>
              <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", margin: "0 0 8px" }}>
                Office
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.6", margin: "0" }}>
                585 Ontario St S #204
                <br />
                Milton, ON L9T 2N2
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", margin: "0 0 8px" }}>
                Phone
              </h4>
              <a href="tel:9058764126" style={{ fontSize: "15px", color: "oklch(94% 0.01 70)" }}>
                (905) 876-4126
              </a>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", margin: "0 0 8px" }}>
                Email
              </h4>
              <a href="mailto:info@saigalrealty.ca" style={{ fontSize: "15px", color: "oklch(94% 0.01 70)" }}>
                info@saigalrealty.ca
              </a>
            </div>
            <div>
              <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", margin: "0 0 8px" }}>
                Serving
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.6", margin: "0" }}>
                Milton, Oakville, Burlington, Cambridge, Kitchener, Toronto, Mississauga
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "24px", fontWeight: "600", margin: "0 0 20px" }}>
              Office Hours
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px", color: "oklch(35% 0.015 60)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid oklch(88% 0.012 70)", paddingBottom: "8px" }}>
                <span>
                  Monday – Friday
                </span>
                <span>
                  9:00 AM – 7:00 PM
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid oklch(88% 0.012 70)", paddingBottom: "8px" }}>
                <span>
                  Saturday
                </span>
                <span>
                  10:00 AM – 5:00 PM
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px" }}>
                <span>
                  Sunday
                </span>
                <span>
                  By appointment
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "24px", fontWeight: "600", margin: "0 0 20px" }}>
              What Happens Next
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                  01
                </span>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  We respond within one business day, usually sooner.
                </p>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                  02
                </span>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  A short call to understand your goals and timeline.
                </p>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "20px", color: "oklch(58% 0.16 45)", flexShrink: "0" }}>
                  03
                </span>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  We match you with the right agent on our team.
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
