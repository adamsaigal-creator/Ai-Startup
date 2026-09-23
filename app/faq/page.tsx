import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPage } from "@/lib/data/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/data/site-settings";

const NAV = [{ label: "Search", href: "/search" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Luxury", href: "/luxury" }, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "FAQ", href: "/faq" }];
const FOOTER_LINKS = [{ label: "Home", href: "/" }, { label: "Luxury", href: "/luxury" }, { label: "Neighbourhoods", href: "/neighbourhoods" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("faq");
  return buildPageMetadata({
    title: page?.seo_title ?? "Frequently Asked Questions — Saigal Realty Inc., Brokerage",
    description: page?.seo_description ?? "Answers to common questions about buying, selling, and working with Saigal Realty.",
    path: "/faq",
    ogTitle: page?.og_title,
    ogDescription: page?.og_description,
    ogImage: page?.og_image,
  });
}

type FaqItem = { question: string; answer: string; links?: { text: string; href: string }[] };
type FaqCategory = { anchor: string; heading: string; items: FaqItem[] };

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("faq"), getSiteSettings()]);
  const c = page!.content;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (c.categories as FaqCategory[]).flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteHeader nav={NAV} activeLabel={"FAQ"} ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>{c.hero.eyebrow}</span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: "600", margin: "16px 0 32px" }}>{c.hero.headline}</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Team consultation photo" id="faq-hero" src={c.hero.image} style={{ objectFit: "cover", width: "100%", height: "280px", borderRadius: "4px", display: "block" }} />
        </section>
        <section style={{ padding: "0 56px 60px", maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          {c.categoryNav.map((item: { label: string; href: string }, i: number) => (
            <a key={item.href} href={item.href} style={{ padding: "16px 20px", background: "oklch(99% 0.004 90)", borderBottom: i === c.categoryNav.length - 1 ? "none" : "1px solid oklch(89% 0.012 70)", fontSize: "15px", fontWeight: "500" }}>{item.label}</a>
          ))}
        </section>
        <section style={{ padding: "20px 56px 100px", maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
          {c.categories.map((cat: FaqCategory) => (
            <div key={cat.anchor} id={cat.anchor}>
              <h2 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "28px", fontWeight: "600", margin: "0 0 28px", color: "oklch(58% 0.16 45)" }}>{cat.heading}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {cat.items.map((item) => (
                  <div key={item.question}>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>{item.question}</h4>
                    <p style={{ fontSize: "15px", lineHeight: "1.7", color: "oklch(46% 0.02 60)", margin: "0" }}>
                      {item.answer}
                      {item.links?.map((link) => <a key={link.href} href={link.href}> {link.text}</a>)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
