import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamCarousel, type TeamMember } from "@/components/TeamCarousel";

export const metadata: Metadata = {
  title: "Saigal Realty Inc., Brokerage — Milton, Oakville, Burlington Real Estate",
  description:
    "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
};

const NAV = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Search", href: "/search" },
  { label: "Neighbourhoods", href: "#neighbourhoods" },
  { label: "Commercial", href: "/commercial" },
  { label: "Luxury", href: "/luxury" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "/about" },
];

const TEAM_MEMBERS: TeamMember[] = [
  { id: "nomi", name: "Nomi Saigal", role: "Broker of Record", photo: "/uploads/sraa.png" },
  { id: "kamranm", name: "Kamran Mustafa", role: "Realtor®", photo: "/uploads/sraa.png" },
  { id: "zak", name: "Zak Abdelnour", role: "Realtor®", photo: "/uploads/sraa.png" },
  { id: "alam", name: "Alam Arbi", role: "Realtor®", photo: "/uploads/sraa.png" },
  { id: "kamrans", name: "Kamran Saeed", role: "Realtor®", photo: "/uploads/sraa.png" },
  { id: "numan", name: "Numan Shafiq", role: "Realtor®", photo: "/uploads/sraa.png" },
  { id: "haider", name: "Haider Mohammad", role: "Agent · Dallas, TX", photo: "/uploads/sraa.png" },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which areas does Saigal Realty serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We focus on Milton, Oakville, and Burlington, with additional coverage across Cambridge, Kitchener, Toronto, Mississauga, and York Region.",
      },
    },
    {
      "@type": "Question",
      name: "How is Saigal Realty different from a large national brokerage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As a boutique brokerage, every client works directly with a small, senior team, prioritizing honest counsel and transparent numbers over transaction volume.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer a free home evaluation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide a complimentary comparative market analysis for anyone considering selling in Milton, Oakville, or Burlington.",
      },
    },
    {
      "@type": "Question",
      name: "Can Saigal Realty help with commercial real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we handle office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington in addition to residential buying and selling.",
      },
    },
    {
      "@type": "Question",
      name: "How do I start searching for homes for sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the search bar at the top of the homepage to filter by location, price, and bedrooms, or book a consultation for custom alerts.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {/* Homepage-only selection color, matching the original page's own <style> block */}
      <style>{`::selection{background:oklch(58% 0.16 45 / 0.25)}`}</style>
      <SiteHeader nav={NAV} ctaLabel="Book a Consultation" ctaHref="#contact" ctaSize="sm" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "88vh", minHeight: "640px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Drop hero photo — Milton/Oakville/Burlington skyline or signature listing" id="hero" src="/images/hero-estate-blue-hour.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.35), oklch(15% 0.01 60 / 0.6))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "900px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "20px" }}>
              Milton · Oakville · Burlington
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "68px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 24px" }}>
              Navigating Your Next Move, Together
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "620px", margin: "0 0 36px" }}>
              A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton&apos;s most sought-after communities.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/search" style={{ padding: "16px 32px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
                Search Listings
              </a>
              <a href="#contact" style={{ padding: "16px 32px", border: "1px solid oklch(94% 0.01 70 / 0.6)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
                Book a Consultation
              </a>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "64px", alignItems: "center" }}>
          <div style={{ minWidth: "0" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Our Philosophy
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", lineHeight: "1.3", margin: "18px 0 24px" }}>
              Real estate, practiced with passion, integrity, and transparency.
            </h2>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "oklch(46% 0.02 60)" }}>
              We built Saigal Realty because we believe our clients deserve more than a transaction — they deserve a trusted advisor. Every recommendation we make is grounded in honest counsel, careful research, and a genuine investment in your outcome, not ours. Whether you are buying your first home in Milton, selling a family property in Oakville, or building a portfolio across Burlington, we bring the same quiet rigor and care to every relationship.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Team or office photo" id="philosophy-img" src="/images/philosophy-lounge.png" style={{ width: "100%", height: "420px", borderRadius: "4px", minWidth: "0" }} />
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "48px" }}>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
              01
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "14px 0 10px" }}>
              Passion
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              We treat every home as if it were our own — because your milestones matter to us as much as they matter to you.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
              02
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "14px 0 10px" }}>
              Integrity
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Straightforward advice, even when it isn&apos;t what you hoped to hear. Your trust is earned, never assumed.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
              03
            </span>
            <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "14px 0 10px" }}>
              Transparency
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
              Clear numbers, clear timelines, clear next steps — so you always know exactly where you stand.
            </p>
          </div>
        </section>
        <section id="neighbourhoods" style={{ padding: "0 56px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "36px" }}>
            <div>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Where We Work
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                Featured Cities
              </h2>
            </div>
            <a href="#all-neighbourhoods" style={{ fontSize: "14px", fontWeight: "600" }}>
              View all neighbourhoods →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "24px" }}>
            <a href="/neighbourhoods/milton" style={{ display: "block", position: "relative", height: "400px", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Milton streetscape" id="area-milton" src="/images/city-milton.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, transparent 40%, oklch(15% 0.01 60 / 0.75))", pointerEvents: "none" }}></div>
              <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "22px", zIndex: "2" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 6px" }}>
                  Milton
                </h3>
                <span style={{ fontSize: "13px", color: "oklch(90% 0.03 60)" }}>
                  Explore Milton real estate →
                </span>
              </div>
            </a>
            <a href="/neighbourhoods/oakville" style={{ display: "block", position: "relative", height: "400px", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Oakville waterfront" id="area-oakville" src="/images/city-oakville.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, transparent 40%, oklch(15% 0.01 60 / 0.75))", pointerEvents: "none" }}></div>
              <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "22px", zIndex: "2" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 6px" }}>
                  Oakville
                </h3>
                <span style={{ fontSize: "13px", color: "oklch(90% 0.03 60)" }}>
                  Explore Oakville real estate →
                </span>
              </div>
            </a>
            <a href="/neighbourhoods/burlington" style={{ display: "block", position: "relative", height: "400px", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Burlington lakeshore" id="area-burlington" src="/images/city-burlington.png" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, transparent 40%, oklch(15% 0.01 60 / 0.75))", pointerEvents: "none" }}></div>
              <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "22px", zIndex: "2" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 6px" }}>
                  Burlington
                </h3>
                <span style={{ fontSize: "13px", color: "oklch(90% 0.03 60)" }}>
                  Explore Burlington real estate →
                </span>
              </div>
            </a>
          </div>
        </section>
        <section style={{ padding: "140px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                How We Help
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                Buy. Sell. Invest.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              <div id="buy" style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Buying photo" id="service-buy" src="/images/service-buying.png" style={{ width: "100%", height: "140px" }} />
                <div style={{ padding: "32px 30px 36px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 14px" }}>
                    Buying
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: "oklch(46% 0.02 60)", margin: "0 0 20px" }}>
                    From your first search to closing day, we help you understand true value, negotiate with confidence, and secure financing — so your biggest investment starts on solid ground.
                  </p>
                  <a href="#contact" style={{ fontSize: "14px", fontWeight: "600" }}>
                    Start your search →
                  </a>
                </div>
              </div>
              <div id="sell" style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Selling photo" id="service-sell" src="/images/service-selling.png" style={{ width: "100%", height: "140px" }} />
                <div style={{ padding: "32px 30px 36px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 14px" }}>
                    Selling
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: "oklch(46% 0.02 60)", margin: "0 0 20px" }}>
                    A precise market analysis, considered presentation, and a marketing plan built for today&apos;s buyer — priced right, positioned well, and negotiated firmly on your behalf.
                  </p>
                  <a href="#contact" style={{ fontSize: "14px", fontWeight: "600" }}>
                    Get a home evaluation →
                  </a>
                </div>
              </div>
              <div style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Investing photo" id="service-invest" src="/images/service-investing.png" style={{ width: "100%", height: "140px" }} />
                <div style={{ padding: "32px 30px 36px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 14px" }}>
                    Investing
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: "oklch(46% 0.02 60)", margin: "0 0 20px" }}>
                    Building or refining a portfolio across the GTA and Halton region takes local knowledge and a clear-eyed read of the numbers — we bring both to every opportunity we bring you.
                  </p>
                  <a href="#contact" style={{ fontSize: "14px", fontWeight: "600" }}>
                    Discuss your goals →
                  </a>
                </div>
              </div>
              <div id="commercial" style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Commercial photo" id="service-commercial" src="/images/service-commercial.png" style={{ width: "100%", height: "140px" }} />
                <div style={{ padding: "32px 30px 36px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 14px" }}>
                    Commercial
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: "oklch(46% 0.02 60)", margin: "0 0 20px" }}>
                    Office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington — backed by the same careful, transparent approach we bring to every residential client.
                  </p>
                  <a href="#contact" style={{ fontSize: "14px", fontWeight: "600" }}>
                    Talk commercial →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" style={{ padding: "140px 56px", maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Meet The Team
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
              The People Behind Saigal Realty
            </h2>
          </div>
          <TeamCarousel members={TEAM_MEMBERS} />
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/about" style={{ display: "inline-block", padding: "16px 44px", border: "1px solid oklch(23% 0.012 60)", color: "oklch(23% 0.012 60)", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Meet the Team
            </a>
          </div>
        </section>
        <section style={{ padding: "140px 56px", background: "oklch(23% 0.012 60)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Client Stories
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0", color: "oklch(99% 0.004 90)" }}>
                What Our Clients Say
              </h2>
            </div>
            <div style={{ display: "flex", gap: "28px", overflowX: "auto", paddingBottom: "12px", scrollSnapType: "x mandatory" }}>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;Nomi not only understood our must-haves but also found us a dream house in Oakville at an ideal location. His professionalism and commitment to client satisfaction truly set him apart.&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Mahrukh A, Google review
                </span>
              </div>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;I was a first time home buyer and Nomi was incredible and so trustworthy throughout the process! He took away all the stress and uncertainty of buying a place for the first time.&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Sana Wain, Google review
                </span>
              </div>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;He was open and honest which made me feel at ease when making decisions. He got me what I wanted and made the whole process very easy for me.&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Yeraldyn Valencia, Google review
                </span>
              </div>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;Nomi &amp; Kamran did a spectacular job helping me sell my house then finding me the perfect apartment, always top of their game with the right locations.&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Scrib Ler, Google review
                </span>
              </div>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;Nomi worked diligently to get us the best possible price for our home and finding us the perfect new forever home. We highly recommend Team Saigal for all your real estate needs.&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Ramnik S, Google review
                </span>
              </div>
              <div style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                  &quot;He always had my best interests in mind and worked hard to get me a great deal on the home. He is never hesitant and is always positive. Highly recommend!&quot;
                </p>
                <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                  — Arun K, Google review
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="all-neighbourhoods" style={{ padding: "120px 56px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Serving Southern Ontario
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 12px" }}>
              All Neighbourhoods
            </h2>
            <p style={{ fontSize: "15px", color: "oklch(46% 0.02 60)", maxWidth: "560px", margin: "0 auto" }}>
              We cover 50+ neighbourhoods across Halton and the GTA — a few highlights below, or browse the complete directory.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "40px" }}>
            <div>
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(23% 0.012 60)", margin: "0 0 16px" }}>
                Milton
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="/neighbourhoods/milton">
                  Milton Overview
                </a>
                <a href="/old-milton">
                  Old Milton
                </a>
                <a href="/beaty-milton">
                  Beaty
                </a>
                <a href="/scott-milton">
                  Scott
                </a>
                <a href="/neighbourhoods#milton" style={{ fontWeight: "600" }}>
                  View all Milton areas →
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(23% 0.012 60)", margin: "0 0 16px" }}>
                Oakville
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="/neighbourhoods/oakville">
                  Oakville Overview
                </a>
                <a href="/old-oakville">
                  Old Oakville
                </a>
                <a href="/glen-abbey-oakville">
                  Glen Abbey
                </a>
                <a href="/bronte-west-oakville">
                  Bronte
                </a>
                <a href="/neighbourhoods#oakville" style={{ fontWeight: "600" }}>
                  View all Oakville areas →
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(23% 0.012 60)", margin: "0 0 16px" }}>
                Burlington
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="/neighbourhoods/burlington">
                  Burlington Overview
                </a>
                <a href="/aldershot-burlington">
                  Aldershot
                </a>
                <a href="/tyandaga-burlington">
                  Tyandaga
                </a>
                <a href="/shoreacres-burlington">
                  Shoreacres
                </a>
                <a href="/neighbourhoods#burlington" style={{ fontWeight: "600" }}>
                  View all Burlington areas →
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(23% 0.012 60)", margin: "0 0 16px" }}>
                Also Serving
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="/neighbourhoods/cambridge">
                  Cambridge
                </a>
                <a href="/neighbourhoods/kitchener">
                  Kitchener
                </a>
                <a href="/neighbourhoods/toronto">
                  Toronto
                </a>
                <a href="/neighbourhoods/mississauga">
                  Mississauga
                </a>
                <a href="/neighbourhoods/york">
                  York Region
                </a>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <a href="/neighbourhoods" style={{ display: "inline-block", padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
              Browse the Full Neighbourhood Directory
            </a>
          </div>
        </section>
        <section id="blog" style={{ padding: "120px 56px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "56px" }}>
            <div>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Insights
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                From the Blog
              </h2>
            </div>
            <a href="/blog" style={{ fontSize: "14px", fontWeight: "600" }}>
              View all articles →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", alignItems: "start" }}>
            <a href="/blog#milton-market-update-2026" style={{ display: "block", textDecoration: "none", color: "inherit", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Article image" id="blog-1" src="/images/blog-milton-market.png" style={{ width: "100%", height: "200px", borderRadius: "4px", marginBottom: "20px" }} />
              <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Market Update
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "10px 0 8px", lineHeight: "1.3" }}>
                Milton Market Update: What Buyers and Sellers Should Know
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                A look at pricing trends, inventory, and where the Milton market is headed.
              </p>
            </a>
            <a href="/blog#oakville-neighbourhood-guide" style={{ display: "block", textDecoration: "none", color: "inherit", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Article image" id="blog-2" src="/images/blog-oakville-guide.png" style={{ width: "100%", height: "200px", borderRadius: "4px", marginBottom: "20px" }} />
              <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Neighbourhood Guide
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "10px 0 8px", lineHeight: "1.3" }}>
                A Buyer&apos;s Guide to Oakville&apos;s Most Sought-After Streets
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Where to look in Oakville depending on your lifestyle and budget.
              </p>
            </a>
            <a href="/blog#selling-in-burlington-tips" style={{ display: "block", textDecoration: "none", color: "inherit", minWidth: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Article image" id="blog-3" src="/images/blog-seller-prep.png" style={{ width: "100%", height: "200px", borderRadius: "4px", marginBottom: "20px" }} />
              <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                Seller Tips
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "10px 0 8px", lineHeight: "1.3" }}>
                5 Things to Fix Before Listing Your Burlington Home
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Small, high-return fixes that help Burlington homes sell faster.
              </p>
            </a>
          </div>
        </section>
        <section style={{ padding: "120px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              Common Questions
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 8px" }}>
              Frequently Asked Questions
            </h2>
            <a href="/faq" style={{ fontSize: "14px", fontWeight: "600" }}>
              View all FAQs →
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
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
                How is Saigal Realty different from a large national brokerage?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                As a boutique brokerage, every client works directly with a small, senior team — not a call centre. We prioritize honest counsel and transparent numbers over transaction volume.
              </p>
            </div>
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
                Can Saigal Realty help with commercial real estate?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Yes — we handle office, retail, and industrial leasing and sales across Milton, Oakville, and Burlington in addition to residential buying and selling.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                How do I start searching for homes for sale?
              </h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                Use the search bar at the top of this page to filter by location, price, and bedrooms, or book a consultation and we&apos;ll set up custom alerts for you.
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Global Reach
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 20px", color: "oklch(99% 0.004 90)" }}>
            International Exposure
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.75", color: "oklch(85% 0.02 60)", maxWidth: "700px", margin: "0 auto 48px" }}>
            Beyond Halton and the GTA, our network extends across five international markets — giving clients and referral partners a genuine global reach for cross-border buyers, sellers, and investors. In Rabat, Dubai, and Costa Rica, we also help clients purchase Airbnb and vacation-home properties.
          </p>
          <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "32px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Dallas, Texas
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                United States
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Rabat
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Morocco
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Dubai
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                United Arab Emirates
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Karachi
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Pakistan
              </p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Costa Rica
              </span>
              <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                Vacation &amp; Airbnb homes
              </p>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(58% 0.16 45)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
              Ready to make your next move?
            </h2>
            <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 40px" }}>
              Let&apos;s talk about your goals — no pressure, just an honest conversation.
            </p>
          </div>
          <form action="mailto:info@saigalrealty.ca" encType="text/plain" method="post" style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input name="Name" placeholder="Full name" required style={{ padding: "14px 16px", border: "none", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif" }} type="text" />
              <input name="Email" placeholder="Email address" required style={{ padding: "14px 16px", border: "none", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif" }} type="email" />
            </div>
            <input name="Phone" placeholder="Phone (optional)" style={{ padding: "14px 16px", border: "none", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif" }} type="tel" />
            <textarea name="Message" placeholder="Tell us about your goals" rows={4} style={{ padding: "14px 16px", border: "none", borderRadius: "2px", fontSize: "15px", fontFamily: "var(--font-work-sans), sans-serif", resize: "vertical" }}></textarea>
            <button style={{ padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", border: "none", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em", cursor: "pointer", justifySelf: "center" }} type="submit">
              Send Message
            </button>
          </form>
        </section>
        <footer id="contact" style={{ padding: "100px 56px 40px", background: "oklch(20% 0.01 60)", color: "oklch(85% 0.015 70)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto 80px", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", color: "oklch(99% 0.004 90)", letterSpacing: "0.05em" }}>
              SAIGAL REALTY INC., BROKERAGE
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(70% 0.14 45)", margin: "20px 0 0", lineHeight: "1.3" }}>
              Boutique real estate, practiced with passion, integrity, and transparency.
            </h2>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto 60px", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "40px", borderTop: "1px solid oklch(35% 0.015 60)", borderBottom: "1px solid oklch(35% 0.015 60)", padding: "36px 0" }}>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 10px" }}>
                Address
              </h5>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(70% 0.02 60)", margin: "0" }}>
                585 Ontario St S #204
                <br />
                Milton, ON L9T 2N2, Canada
              </p>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 10px" }}>
                Phone &amp; Email
              </h5>
              <a href="tel:9058764126" style={{ fontSize: "14px", color: "oklch(70% 0.02 60)", display: "block", marginBottom: "6px" }}>
                (905) 876-4126
              </a>
              <a href="mailto:info@saigalrealty.ca" style={{ fontSize: "14px", color: "oklch(70% 0.02 60)" }}>
                info@saigalrealty.ca
              </a>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 10px" }}>
                Exclusive Market Updates
              </h5>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input placeholder="Email Address" style={{ flex: "1", minWidth: "140px", background: "transparent", border: "none", borderBottom: "1px solid oklch(50% 0.02 60)", padding: "8px 2px", fontSize: "14px", color: "oklch(95% 0.01 70)", fontFamily: "var(--font-work-sans), sans-serif" }} type="email" />
                <button style={{ padding: "8px 20px", border: "1px solid oklch(70% 0.14 45)", background: "transparent", color: "oklch(70% 0.14 45)", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px" }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "60px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "24px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                Saigal Realty Inc., Brokerage
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.7", margin: "16px 0 20px", maxWidth: "320px", color: "oklch(70% 0.02 60)" }}>
                Saigal Realty Inc., Brokerage — serving Milton, Oakville, Burlington and the wider Halton and GTA region with honest, considered representation.
              </p>
              <span style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                585 Ontario St S #204, Milton, ON L9T 2N2
              </span>
              <br />
              <a href="tel:9058764126" style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                (905) 876-4126
              </a>
              <br />
              <a href="mailto:info@saigalrealty.ca" style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                info@saigalrealty.ca
              </a>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 16px" }}>
                Company
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="#about" style={{ color: "oklch(80% 0.02 60)" }}>
                  About
                </a>
                <a href="/luxury" style={{ color: "oklch(80% 0.02 60)" }}>
                  Luxury
                </a>
                <a href="/careers" style={{ color: "oklch(80% 0.02 60)" }}>
                  Careers
                </a>
                <a href="/faq" style={{ color: "oklch(80% 0.02 60)" }}>
                  FAQ
                </a>
                <a href="/contact" style={{ color: "oklch(80% 0.02 60)" }}>
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 16px" }}>
                Areas
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="/neighbourhoods/milton" style={{ color: "oklch(80% 0.02 60)" }}>
                  Milton
                </a>
                <a href="/neighbourhoods/oakville" style={{ color: "oklch(80% 0.02 60)" }}>
                  Oakville
                </a>
                <a href="/neighbourhoods/burlington" style={{ color: "oklch(80% 0.02 60)" }}>
                  Burlington
                </a>
                <a href="/neighbourhoods" style={{ color: "oklch(80% 0.02 60)" }}>
                  All neighbourhoods
                </a>
              </div>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 16px" }}>
                Follow
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <a href="#" style={{ color: "oklch(80% 0.02 60)" }}>
                  Instagram
                </a>
                <a href="#" style={{ color: "oklch(80% 0.02 60)" }}>
                  Facebook
                </a>
                <a href="#" style={{ color: "oklch(80% 0.02 60)" }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "24px", borderTop: "1px solid oklch(35% 0.015 60)", fontSize: "12px", color: "oklch(55% 0.015 60)" }}>
            © 2026 Saigal Realty Inc., Brokerage. Independently Owned and Operated.
          </div>
        </footer>
      </div>
    </>
  );
}
