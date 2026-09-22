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

// No nonce-based CSP here (see the Next.js CSP guide,
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md):
// nonces require every page to be dynamically rendered, which would drop
// this app's existing static/ISR rendering (Pages/Neighbourhoods/Blog use
// revalidatePath, not per-request dynamic rendering - see Phase 4G-4I).
// This app also renders styling exclusively via React's `style={{}}` prop
// (never a `<style>` tag), which the browser treats as an inline style
// attribute under CSP - there's no nonce mechanism for style attributes, so
// 'unsafe-inline' in style-src is required regardless of the script-src
// approach chosen. script-src needs 'unsafe-inline' too, since Next.js's
// App Router streams RSC payloads via inline `<script>` tags on every page
// even without nonces configured. This still meaningfully constrains
// object-src, frame-ancestors, base-uri, form-action, connect-src and
// img-src/font-src to same-origin - verified against this app's actual
// resource usage: next/font self-hosts fonts (no fonts.googleapis.com
// request), no external fetch()/analytics/iframes/maps exist anywhere in
// app/lib/components, and the only non-http(s) image sources are the
// MediaPicker upload preview (blob:) and self-hosted /media/... uploads.
function buildCsp(isDev: boolean) {
  return [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Server Actions default to a 1MB request body cap; Phase 4F's media
  // upload action needs room for the 10MB image cap enforced in
  // lib/media/storage.ts, plus multipart/form-data's own boundary/header
  // overhead (see the serverActions.bodySizeLimit docs).
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: buildCsp(isDev) },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Superseded by CSP's frame-ancestors above for modern browsers,
          // kept as defense-in-depth for the few that only honor this.
          { key: "X-Frame-Options", value: "DENY" },
          // Only meaningful over HTTPS (production, behind Nginx/Certbot -
          // see docs/DEPLOYMENT.md); harmless but pointless to send in local
          // HTTP dev, so it's conditioned on isDev like the CSP above.
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]),
        ],
      },
    ];
  },
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
      // /listings and /rentals were skipped in Phase 2 (their destination,
      // /search, didn't exist yet) - now built in Phase 2B.
      { source: "/listings", destination: "/search", permanent: true },
      { source: "/rentals", destination: "/search", permanent: true },
    ];
  },
};

export default nextConfig;
