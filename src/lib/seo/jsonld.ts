import { deliveryStats, site } from "@/content/site";
import { services } from "@/content/studio";
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
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.png"), width: 1200, height: 856 },
    image: [absoluteUrl("/images/home/1.png"), absoluteUrl("/images/home/2.png"), absoluteUrl("/images/home/3.png")],
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
    // Where the studio works: the city, and the communities it has delivered in (deliveryStats).
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Place", name: "Sarjapur Road, Bengaluru" },
      ...deliveryStats.communities.map((c) => ({ "@type": "Place", name: `${c.name}, Bengaluru` })),
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English"],
    })),
    knowsAbout: [
      "Interior design",
      "Home interiors",
      "Modular kitchens",
      "Wardrobes",
      "False ceilings",
      "Lighting design",
      "TV units",
      "Pooja units",
      "3D interior design",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior design services",
      itemListElement: services.map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.title, description: sv.summary, url: absoluteUrl(`/services#${sv.slug}`) },
      })),
    },
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

/** The studio's services, each as a schema.org Service offered in Bengaluru. */
export function servicesSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} interior design services`,
    itemListElement: services.map((sv, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": absoluteUrl(`/services#${sv.slug}`),
        name: sv.title,
        serviceType: sv.title,
        description: `${sv.summary} ${sv.details.join(". ")}.`,
        image: absoluteUrl(sv.image.src),
        url: absoluteUrl(`/services#${sv.slug}`),
        areaServed: { "@type": "City", name: "Bengaluru" },
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

/** A Design Journal article, published by the studio. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  section: string;
  images: string[];
  readMinutes: number;
  keywords: string[];
  /** A signed piece is credited to its author; otherwise to the studio. */
  author?: { name: string; role: string; honorific?: string };
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    articleSection: input.section,
    keywords: input.keywords.join(", "),
    inLanguage: "en-IN",
    image: input.images.map((i) => absoluteUrl(i)),
    url: absoluteUrl(input.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
    timeRequired: `PT${input.readMinutes}M`,
    author: input.author ? { "@type": "Person", name: input.author.name, honorificPrefix: input.author.honorific, jobTitle: input.author.role, worksFor: { "@id": ORG_ID } } : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}
