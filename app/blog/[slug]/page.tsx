import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data/blog";
import { getSiteSettings } from "@/lib/data/site-settings";

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

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo_title ?? `${post.title} — Saigal Realty Inc., Brokerage`,
    description: post.seo_description ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getBlogPostBySlug(slug), getSiteSettings()]);
  if (!post) notFound();

  const paragraphs = (post.body ?? "").split("\n\n");

  return (
    <>
      <SiteHeader nav={NAV} activeLabel="Blog" ctaLabel="Book a Consultation" ctaHref="/contact" ctaSize="md" logoUrl={settings.logo_url ?? undefined} brokerageName={settings.brokerage_name} />
      <div style={{ fontFamily: "var(--font-work-sans), sans-serif", color: "oklch(23% 0.012 60)", background: "oklch(97% 0.012 75)", width: "100%", overflowX: "hidden" }}>
        <section style={{ padding: "60px 56px 120px", maxWidth: "820px", margin: "0 auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={post.title}
            src={post.featured_image ?? "/uploads/sraa.png"}
            style={{ width: "100%", height: "320px", borderRadius: "4px", marginBottom: "28px" }}
          />
          <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(58% 0.16 45)" }}>
            {post.category}
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "36px", fontWeight: 600, margin: "12px 0 24px", lineHeight: "1.2" }}>
            {post.title}
          </h1>
          {paragraphs.map((paragraph, i) => {
            const isLast = i === paragraphs.length - 1;
            return (
              <p
                key={i}
                style={{ fontSize: "16px", lineHeight: "1.85", color: "oklch(35% 0.015 60)", margin: isLast ? "0" : "0 0 16px" }}
              >
                {paragraph}{isLast ? " " : null}
                {isLast && post.cta_href && post.cta_label ? <a href={post.cta_href}>{post.cta_label}</a> : null}
              </p>
            );
          })}
          <div style={{ marginTop: "48px" }}>
            <a href="/blog" style={{ fontSize: "14px", fontWeight: 600 }}>
              ← Back to all articles
            </a>
          </div>
        </section>
      </div>
      <SiteFooter links={FOOTER_LINKS} brokerageName={settings.brokerage_name} copyrightText={settings.copyright_text ?? ""} />
    </>
  );
}
