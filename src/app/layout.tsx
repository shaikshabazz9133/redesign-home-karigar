import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SocialRail } from "@/components/layout/SocialRail";
import { Preloader } from "@/components/layout/Preloader";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ParallaxController } from "@/components/motion/ParallaxController";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/common/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { SITE_KEYWORDS } from "@/lib/seo/metadata";
import "./globals.css";

/* The whole site is set in three faces:
   Display — Inter Tight: headings, numerals and the hero, in tight grotesk capitals.
   Text    — Inter: body copy, navigation, buttons and small uppercase labels.
   Accent  — Cormorant Garamond: the logo wordmark and italic emphasis inside headings.
   Plus one flourish: Pinyon Script, a copperplate hand, for the hero's "beautifully." alone. */
/* Self-hosted from ./fonts (the Latin subsets from Google Fonts, as variable fonts where available), so builds
   never depend on downloading fonts — the Google fetch in next/font/google failed intermittently. */
const display = localFont({ src: "./fonts/inter-tight-normal.woff2", weight: "300 600", variable: "--font-inter-tight", display: "swap" });
const text = localFont({ src: "./fonts/inter-normal.woff2", weight: "400 600", variable: "--font-inter", display: "swap" });
const accent = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-normal.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const script = localFont({ src: "./fonts/pinyon-script-normal.woff2", weight: "400", variable: "--font-pinyon", display: "swap" });
/* Journal reading text is set in Tiempos Text where it is installed; Source Serif is its free stand-in. */
const bodySerif = localFont({
  src: [
    { path: "./fonts/source-serif-4-normal.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/source-serif-4-italic.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Luxury Home Interiors in Bengaluru`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: SITE_KEYWORDS,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Interior design",
  // Search Console and Bing Webmaster verification codes, set per deployment.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }),
  },
  // Regional signals for local search.
  other: { "geo.region": "IN-KA", "geo.placename": "Bengaluru" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1815" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable} ${accent.variable} ${script.variable} ${bodySerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only once JS is available, and picks the intro style to preview
            (`?intro=arch` / `?intro=doors` / `?intro=monolith`) before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');var s=new URLSearchParams(location.search).get('intro');if(s==='arch'||s==='doors'||s==='monolith')d.dataset.introStyle=s})()",
          }}
        />
        <noscript>
          <style>{"#hk-preloader{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm text-ivory transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <SocialRail />
        <RevealObserver />
        <ParallaxController />
        <SmoothScroll />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
