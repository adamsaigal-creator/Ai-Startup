import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "The Saigal Realty Blog — Saigal Realty Inc., Brokerage",
  description: "Market updates, neighbourhood guides, and advice for buyers and sellers across Milton, Oakville, and Burlington.",
};

const NAV = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Search", href: "/search" },
  { label: "Neighbourhoods", href: "/neighbourhoods" },
  { label: "Luxury", href: "/luxury" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Luxury", href: "/luxury" },
  { label: "Neighbourhoods", href: "/neighbourhoods" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader nav={NAV} activeLabel="Blog" ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "100px 56px 60px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            Insights
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "46px", fontWeight: 600, margin: "16px 0 0" }}>
            The Saigal Realty Blog
          </h1>
        </section>
        <section style={{ padding: "20px 56px 120px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "32px", alignItems: "start" }}>
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ display: "block", textDecoration: "none", color: "inherit", minWidth: "0" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Article image"
                  src={post.image}
                  style={{ width: "100%", height: "200px", borderRadius: "4px", marginBottom: "20px" }}
                />
                <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
                  {post.category}
                </span>
                <h3 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "21px", fontWeight: 600, margin: "10px 0 8px", lineHeight: "1.3" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "oklch(46% 0.02 60)", margin: "0" }}>
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} />
    </>
  );
}
