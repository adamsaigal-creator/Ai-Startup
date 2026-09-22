import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin/* also carries its own per-route `robots: noindex` metadata
      // (see every app/admin/**/page.tsx) - disallowing the whole tree
      // here additionally keeps crawlers from even requesting it.
      disallow: "/admin",
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
