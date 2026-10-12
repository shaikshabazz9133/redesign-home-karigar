import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Imperial_Script, Instrument_Sans, Inter, Jost, Montserrat } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Preloader } from "@/components/layout/Preloader";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ParallaxController } from "@/components/motion/ParallaxController";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/common/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/* Logo faces: Cormorant Garamond for the wordmark, Montserrat standing in for Gotham on the tagline. */
const brand = Cormorant_Garamond({ subsets: ["latin"], weight: "700", variable: "--font-cormorant", display: "swap" });
/* Light Cormorant, upright and italic, for the home hero's headline. */
const heroSerif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-cormorant-light", display: "swap" });
/* Hero line one: light Jost capitals with Imperial Script copperplate capitals for the D and S. */
const heroCaps = Jost({ subsets: ["latin"], weight: "300", variable: "--font-jost", display: "swap" });
const heroScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial", display: "swap" });
/* Heavy grotesk for the full-bleed HOME KARIGAR’S wordmark at the foot of the home hero. */
const grotesk = Inter({ subsets: ["latin"], weight: "700", variable: "--font-inter", display: "swap" });
const tagline = Montserrat({ subsets: ["latin"], weight: "400", variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Luxury Home Interiors in Bengaluru`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1815" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${instrument.variable} ${brand.variable} ${heroSerif.variable} ${heroCaps.variable} ${heroScript.variable} ${grotesk.variable} ${tagline.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only once JS is available. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
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
        <RevealObserver />
        <ParallaxController />
        <SmoothScroll />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
