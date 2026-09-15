import type { NextConfig } from "next";

const LEGACY_DC_HTML_REDIRECTS: Record<string, string> = {
  "/Homepage.dc.html": "/",
  "/Buy.dc.html": "/buy",
  "/Sell.dc.html": "/sell",
  "/Luxury.dc.html": "/luxury",
  "/Commercial.dc.html": "/commercial",
  "/About.dc.html": "/about",
  "/Contact.dc.html": "/contact",
  "/Neighbourhoods.dc.html": "/neighbourhoods",
  "/Search.dc.html": "/search",
  "/Blog.dc.html": "/blog",
  "/FAQ.dc.html": "/faq",
  "/Careers.dc.html": "/careers",
  "/Neighbourhood-Milton.dc.html": "/neighbourhoods/milton",
  "/Neighbourhood-Oakville.dc.html": "/neighbourhoods/oakville",
  "/Neighbourhood-Burlington.dc.html": "/neighbourhoods/burlington",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Sub-Neighbourhood.dc.html?slug=<slug> -> the clean root-level slug
      // URL, per the original project's own URL-MAP.md ("Live URL should
      // be: https://saigalrealty.ca/<slug>").
      {
        source: "/Sub-Neighbourhood.dc.html",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/:slug",
        permanent: true,
      },
      ...Object.entries(LEGACY_DC_HTML_REDIRECTS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Legacy pre-rebuild saigalrealty.ca paths preserved 1:1 in URL-MAP.md.
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/free-home-evaluation", destination: "/sell", permanent: true },
      { source: "/sitemap", destination: "/neighbourhoods", permanent: true },
    ];
  },
};

export default nextConfig;
