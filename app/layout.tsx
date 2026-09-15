import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Saigal Realty Inc., Brokerage",
  description:
    "A boutique brokerage built on honest counsel and quiet precision — guiding discerning buyers and sellers across Halton's most sought-after communities.",
};

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
