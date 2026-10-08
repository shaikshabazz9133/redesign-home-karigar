import { site } from "@/content/site";
import { absoluteUrl } from "./metadata";

type Json = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;

/** The studio as a local business (schema.org HomeAndConstructionBusiness). */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.legalName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl("/images/home/1.png"),
    email: site.email,
    telephone: site.phones[0].e164,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: "Bengaluru" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.schema.days,
        opens: site.hours.schema.opens,
        closes: site.hours.schema.closes,
      },
    ],
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function imageGallerySchema(input: {
  name: string;
  description: string;
  path: string;
  images: { src: string; caption: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    creator: { "@id": ORG_ID },
    image: input.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(img.src),
      caption: img.caption,
    })),
  };
}

export function videoListSchema(videos: { youtubeId: string; title: string; thumb: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.youtube.com/watch?v=${v.youtubeId}`,
      name: v.title,
      image: v.thumb,
    })),
  };
}
