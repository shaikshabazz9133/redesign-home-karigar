import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Inter_Tight, Pinyon_Script } from "next/font/google";
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

/* The whole site is set in three faces:
   Display — Inter Tight: headings, numerals and the hero, in tight grotesk capitals.
   Text    — Inter: body copy, navigation, buttons and small uppercase labels.
   Accent  — Cormorant Garamond: the logo wordmark and italic emphasis inside headings.
   Plus one flourish: Pinyon Script, a copperplate hand, for the hero's "beautifully." alone. */
const display = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter-tight", display: "swap" });
const text = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const accent = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });

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
    <html lang="en-IN" className={`${display.variable} ${text.variable} ${accent.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only once JS is available, and picks the intro style to preview
            (`?intro=doors` / `?intro=monolith`) before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');var s=new URLSearchParams(location.search).get('intro');if(s==='doors'||s==='monolith')d.dataset.introStyle=s})()",
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
        <RevealObserver />
        <ParallaxController />
        <SmoothScroll />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
