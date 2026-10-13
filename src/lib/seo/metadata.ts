import type { Metadata } from "next";
import { site } from "@/content/site";

/** The searches the studio wants to be found for, carried by every page. */
export const SITE_KEYWORDS = [
  "interior designers in Bengaluru",
  "interior design Bangalore",
  "home interiors Bengaluru",
  "luxury interior design Bengaluru",
  "modular kitchen Bengaluru",
  "wardrobe design Bengaluru",
  "false ceiling Bengaluru",
  "interior designers Sarjapur Road",
  "The Prestige City interiors",
  "3BHK interior design Bengaluru",
  "Home Karigar",
];

interface PageMetaInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/projects". */
  path: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  noIndex?: boolean;
  /** Use the title as-is instead of applying the "| Home Karigar" template. */
  absoluteTitle?: boolean;
  /** "article" for Design Journal notes, so link previews and crawlers treat them as articles. */
  type?: "website" | "article";
  /** Extra search phrases for this page, added to the site-wide set. */
  keywords?: string[];
}

/**
 * Builds unique, complete metadata for a page: canonical URL,
 * Open Graph and X/Twitter cards. The default OG image is
 * provided by `app/opengraph-image.tsx` when `image` is omitted.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  absoluteTitle,
  type = "website",
  keywords,
}: PageMetaInput): Metadata {
  const ogImages = image
    ? [{ url: image.src, alt: image.alt, width: image.width, height: image.height }]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords && { keywords: [...keywords, ...SITE_KEYWORDS] }),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      ...(ogImages && { images: ogImages }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages && { images: ogImages.map((i) => i.url) }),
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
