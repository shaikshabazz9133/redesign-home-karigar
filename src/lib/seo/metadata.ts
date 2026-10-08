import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/projects". */
  path: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  noIndex?: boolean;
  /** Use the title as-is instead of applying the "| Home Karigar" template. */
  absoluteTitle?: boolean;
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
}: PageMetaInput): Metadata {
  const ogImages = image
    ? [{ url: image.src, alt: image.alt, width: image.width, height: image.height }]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
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
