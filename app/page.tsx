import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamCarousel } from "@/components/TeamCarousel";
import { getPage } from "@/lib/data/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getBlogPostsBySlugs } from "@/lib/data/blog";
import { getPublishedTeamMembers } from "@/lib/data/team";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/organization-json-ld";

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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("homepage");
  return buildPageMetadata({
    title: page?.seo_title ?? "Saigal Realty Inc., Brokerage — Milton, Oakville, Burlington Real Estate",
    description:
      page?.seo_description ??
      "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
    path: "/",
    ogTitle: page?.og_title,
    ogDescription: page?.og_description,
    ogImage: page?.og_image,
  });
}

type FeaturedCity = { name: string; slug: string; image: string; tagline: string };
type ServiceItem = { id: string; title: string; image: string; body: string; ctaLabel: string; ctaHref: string };
type Testimonial = { quote: string; author: string };
type NeighbourhoodLink = { label: string; href: string };
type NeighbourhoodColumn = { heading: string; overviewHref?: string; links: NeighbourhoodLink[]; viewAllLabel?: string; viewAllHref?: string };
type FaqPreviewItem = { question: string; answer: string };
type OfficeItem = { city: string; country: string };

export default async function HomePage() {
  const [page, settings, teamMembers] = await Promise.all([getPage("homepage"), getSiteSettings(), getPublishedTeamMembers()]);
  const c = page!.content;
  const blogPosts = await getBlogPostsBySlugs(c.blogPreview.slugs as string[]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (c.faqPreview.items as FaqPreviewItem[]).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={buildOrganizationJsonLd(settings)} />
      <JsonLd data={buildWebSiteJsonLd()} />
      <JsonLd data={faqJsonLd} />
      {/* Homepage-only selection color, matching the original page's own <style> block */}
      <style>{`::selection{background:oklch(58% 0.16 45 / 0.25)}`}</style>
      <SiteHeader nav={NAV} ctaLabel="Book a Consultation" ctaHref="#contact" ctaSize="sm" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ position: "relative", height: "88vh", minHeight: "640px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Drop hero photo — Milton/Oakville/Burlington skyline or signature listing" id="hero" src={c.hero.image} style={{ objectFit: "cover", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, oklch(20% 0.01 60 / 0.35), oklch(15% 0.01 60 / 0.6))", pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: "2", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: "900px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(90% 0.03 60)", marginBottom: "20px" }}>
              {c.hero.eyebrow}
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "68px", lineHeight: "1.05", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 24px" }}>
              {c.hero.headline}
            </h1>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", maxWidth: "620px", margin: "0 0 36px" }}>
              {c.hero.subhead}
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href={c.hero.ctaPrimary.href} style={{ padding: "16px 32px", background: "oklch(58% 0.16 45)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
                {c.hero.ctaPrimary.label}
              </a>
              <a href={c.hero.ctaSecondary.href} style={{ padding: "16px 32px", border: "1px solid oklch(94% 0.01 70 / 0.6)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
                {c.hero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </section>
        <section style={{ padding: "100px 56px", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "64px", alignItems: "center" }}>
          <div style={{ minWidth: "0" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.philosophy.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", lineHeight: "1.3", margin: "18px 0 24px" }}>
              {c.philosophy.headline}
            </h2>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "oklch(46% 0.02 60)" }}>
              {c.philosophy.body}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" alt="Team or office photo" id="philosophy-img" src={c.philosophy.image} style={{ objectFit: "cover", width: "100%", height: "420px", borderRadius: "4px", minWidth: "0" }} />
        </section>
        <section style={{ padding: "0 56px 120px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "48px" }}>
          {c.pillars.items.map((p: { number: string; title: string; body: string }) => (
            <div key={p.number} style={{ textAlign: "center", padding: "0 16px" }}>
              <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "32px", color: "oklch(58% 0.16 45)" }}>
                {p.number}
              </span>
              <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "14px 0 10px" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </section>
        <section id="neighbourhoods" style={{ padding: "0 56px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "36px" }}>
            <div>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                {c.featuredCities.eyebrow}
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                {c.featuredCities.headline}
              </h2>
            </div>
            <a href={c.featuredCities.viewAllHref} style={{ fontSize: "14px", fontWeight: "600" }}>
              {c.featuredCities.viewAllLabel}
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "24px" }}>
            {(c.featuredCities.items as FeaturedCity[]).map((city) => (
              <a key={city.slug} href={`/neighbourhoods/${city.slug}`} style={{ display: "block", position: "relative", height: "400px", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" alt={`${city.name} streetscape`} id={`area-${city.slug}`} src={city.image} style={{ objectFit: "cover", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, transparent 40%, oklch(15% 0.01 60 / 0.75))", pointerEvents: "none" }}></div>
                <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "22px", zIndex: "2" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "26px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 6px" }}>
                    {city.name}
                  </h3>
                  <span style={{ fontSize: "13px", color: "oklch(90% 0.03 60)" }}>
                    {city.tagline}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
        <section style={{ padding: "140px 56px", background: "oklch(94% 0.015 70)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                {c.services.eyebrow}
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                {c.services.headline}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              {(c.services.items as ServiceItem[]).map((item) => (
                <div key={item.id} id={item.id} style={{ background: "oklch(99% 0.004 90)", borderRadius: "4px", overflow: "hidden", minWidth: "0" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" alt={`${item.title} photo`} id={`service-${item.id}`} src={item.image} style={{ objectFit: "cover", width: "100%", height: "140px" }} />
                  <div style={{ padding: "32px 30px 36px" }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", margin: "0 0 14px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.75", color: "oklch(46% 0.02 60)", margin: "0 0 20px" }}>
                      {item.body}
                    </p>
                    <a href={item.ctaHref} style={{ fontSize: "14px", fontWeight: "600" }}>
                      {item.ctaLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="about" style={{ padding: "140px 56px", maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.team.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
              {c.team.headline}
            </h2>
          </div>
          <TeamCarousel
            members={teamMembers.map((m) => ({ id: m.slug, name: m.name, role: m.role, photo: m.photo }))}
          />
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href={c.team.ctaHref} style={{ display: "inline-block", padding: "16px 44px", border: "1px solid oklch(23% 0.012 60)", color: "oklch(23% 0.012 60)", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {c.team.ctaLabel}
            </a>
          </div>
        </section>
        <section style={{ padding: "140px 56px", background: "oklch(23% 0.012 60)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                {c.testimonials.eyebrow}
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0", color: "oklch(99% 0.004 90)" }}>
                {c.testimonials.headline}
              </h2>
            </div>
            <div style={{ display: "flex", gap: "28px", overflowX: "auto", paddingBottom: "12px", scrollSnapType: "x mandatory" }}>
              {(c.testimonials.items as Testimonial[]).map((t) => (
                <div key={t.author} style={{ padding: "32px", border: "1px solid oklch(38% 0.015 60)", flex: "0 0 340px", scrollSnapAlign: "start" }}>
                  <p style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "18px", lineHeight: "1.6", color: "oklch(94% 0.01 70)", fontStyle: "italic", margin: "0 0 20px" }}>
                    &quot;{t.quote}&quot;
                  </p>
                  <span style={{ fontSize: "13px", color: "oklch(70% 0.03 60)" }}>
                    — {t.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="all-neighbourhoods" style={{ padding: "120px 56px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.allNeighbourhoods.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 12px" }}>
              {c.allNeighbourhoods.headline}
            </h2>
            <p style={{ fontSize: "15px", color: "oklch(46% 0.02 60)", maxWidth: "560px", margin: "0 auto" }}>
              {c.allNeighbourhoods.body}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "40px" }}>
            {(c.allNeighbourhoods.columns as NeighbourhoodColumn[]).map((col) => (
              <div key={col.heading}>
                <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(23% 0.012 60)", margin: "0 0 16px" }}>
                  {col.heading}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                  {col.links.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                  ))}
                  {col.viewAllLabel && col.viewAllHref && (
                    <a href={col.viewAllHref} style={{ fontWeight: "600" }}>{col.viewAllLabel}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <a href={c.allNeighbourhoods.ctaHref} style={{ display: "inline-block", padding: "16px 40px", background: "oklch(23% 0.012 60)", color: "oklch(99% 0.004 90)", borderRadius: "2px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.03em" }}>
              {c.allNeighbourhoods.ctaLabel}
            </a>
          </div>
        </section>
        <section id="blog" style={{ padding: "120px 56px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "56px" }}>
            <div>
              <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                {c.blogPreview.eyebrow}
              </span>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "38px", fontWeight: "600", margin: "14px 0 0" }}>
                {c.blogPreview.headline}
              </h2>
            </div>
            <a href={c.blogPreview.ctaHref} style={{ fontSize: "14px", fontWeight: "600" }}>
              {c.blogPreview.ctaLabel}
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", alignItems: "start" }}>
            {blogPosts.map((post, i) => (
              <a key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit", minWidth: "0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" alt="Article image" id={`blog-${i + 1}`} src={post.featured_image ?? "/images/neighbourhoods-hero.png"} style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "4px", marginBottom: "20px" }} />
                <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                  {post.category}
                </span>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: "600", margin: "10px 0 8px", lineHeight: "1.3" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </section>
        <section style={{ padding: "120px 56px", maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
              {c.faqPreview.eyebrow}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 8px" }}>
              {c.faqPreview.headline}
            </h2>
            <a href={c.faqPreview.ctaHref} style={{ fontSize: "14px", fontWeight: "600" }}>
              {c.faqPreview.ctaLabel}
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {(c.faqPreview.items as FaqPreviewItem[]).map((item) => (
              <div key={item.question}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                  {item.question}
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(23% 0.012 60)", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            {c.internationalReach.eyebrow}
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "34px", fontWeight: "600", margin: "14px 0 20px", color: "oklch(99% 0.004 90)" }}>
            {c.internationalReach.headline}
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.75", color: "oklch(85% 0.02 60)", maxWidth: "700px", margin: "0 auto 48px" }}>
            {c.internationalReach.body}
          </p>
          <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "32px" }}>
            {(c.internationalReach.offices as OfficeItem[]).map((o) => (
              <div key={o.city}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: "600", color: "oklch(99% 0.004 90)" }}>
                  {o.city}
                </span>
                <p style={{ fontSize: "13px", color: "oklch(70% 0.02 60)", margin: "8px 0 0" }}>
                  {o.country}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ padding: "100px 56px", background: "oklch(58% 0.16 45)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(99% 0.004 90)", margin: "0 0 20px" }}>
              {c.finalCta.headline}
            </h2>
            <p style={{ fontSize: "16px", color: "oklch(99% 0.004 90 / 0.9)", margin: "0 0 40px" }}>
              {c.finalCta.body}
            </p>
          </div>
          <form action={`mailto:${settings.contact_form_destination_email}`} encType="text/plain" method="post" style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
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
              {settings.brokerage_name.toUpperCase()}
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: "600", color: "oklch(70% 0.14 45)", margin: "20px 0 0", lineHeight: "1.3" }}>
              {settings.footer_tagline}
            </h2>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto 60px", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "40px", borderTop: "1px solid oklch(35% 0.015 60)", borderBottom: "1px solid oklch(35% 0.015 60)", padding: "36px 0" }}>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 10px" }}>
                Address
              </h5>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "oklch(70% 0.02 60)", margin: "0" }}>
                {settings.address_line1}
                <br />
                {settings.address_line2}
              </p>
            </div>
            <div>
              <h5 style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(99% 0.004 90)", margin: "0 0 10px" }}>
                Phone &amp; Email
              </h5>
              <a href={`tel:${(settings.phone ?? "").replace(/\D/g, "")}`} style={{ fontSize: "14px", color: "oklch(70% 0.02 60)", display: "block", marginBottom: "6px" }}>
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} style={{ fontSize: "14px", color: "oklch(70% 0.02 60)" }}>
                {settings.email}
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
                {settings.brokerage_name}
              </span>
              <p style={{ fontSize: "14px", lineHeight: "1.7", margin: "16px 0 20px", maxWidth: "320px", color: "oklch(70% 0.02 60)" }}>
                {settings.footer_tagline}
              </p>
              <span style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                {settings.address_line1}, {settings.address_line2}
              </span>
              <br />
              <a href={`tel:${(settings.phone ?? "").replace(/\D/g, "")}`} style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                {settings.phone}
              </a>
              <br />
              <a href={`mailto:${settings.email}`} style={{ fontSize: "13px", color: "oklch(60% 0.02 60)" }}>
                {settings.email}
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
                <a href={settings.social_instagram ?? "#"} style={{ color: "oklch(80% 0.02 60)" }}>
                  Instagram
                </a>
                <a href={settings.social_facebook ?? "#"} style={{ color: "oklch(80% 0.02 60)" }}>
                  Facebook
                </a>
                <a href={settings.social_linkedin ?? "#"} style={{ color: "oklch(80% 0.02 60)" }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "24px", borderTop: "1px solid oklch(35% 0.015 60)", fontSize: "12px", color: "oklch(55% 0.015 60)" }}>
            {settings.copyright_text}
          </div>
        </footer>
      </div>
    </>
  );
}
