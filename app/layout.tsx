import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import { siteUrl } from "@/lib/seo/site-url";
import { getSiteSettings } from "@/lib/data/site-settings";
import "./globals.css";

// Matches the Google Fonts <link> loaded by every migrated .dc.html source
// page: family=Cormorant+Garamond:wght@500;600&family=Work+Sans:wght@400;500;600
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: "Saigal Realty Inc., Brokerage",
      template: `%s — ${settings.brokerage_name}`,
    },
    description:
      "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
    // Falls back to app/favicon.ico (Next's own file-convention default)
    // when unset - only overrides it once an admin sets one in
    // /admin/settings (SiteSettings.faviconUrl).
    ...(settings.favicon_url ? { icons: { icon: settings.favicon_url } } : {}),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${workSans.variable}`}
    >
      <body style={{ fontFamily: "var(--font-work-sans), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
