/**
 * Single source of truth for company facts.
 * Everything that appears in copy, the footer, contact page and
 * structured data reads from here.
 */
export const site = {
  name: "Home Karigar",
  legalName: "Home Karigar Interiors",
  tagline: "Redefine Your Living",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://homekarigar.in").replace(/\/$/, ""),
  locale: "en_IN",
  description:
    "Home Karigar is a Bengaluru interior design studio delivering complete residential interiors, from 3D design to handover, with no advance until your designs are approved.",
  foundedYearsAgo: 8,
  email: "query.homekarigar@gmail.com",
  phones: [
    { display: "+91 86605 22278", e164: "+918660522278" },
    { display: "+91 81236 74218", e164: "+918123674218" },
  ],
  whatsapp: "918660522278",
  hours: {
    display: "Mon – Sat · 10 AM – 7 PM",
    schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  },
  address: {
    street: "The Prestige City, Sarjapur Road, Yamare Village",
    locality: "Bengaluru",
    region: "Karnataka",
    country: "IN",
    display: "The Prestige City, Sarjapur Road, Yamare Village, Bengaluru",
  },
  mapQuery: "The Prestige City Sarjapur Road Yamare Village Bengaluru Karnataka",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/home_karigar_interiors" },
    { label: "YouTube", href: "https://youtube.com/@homekarigar" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/homekarigar" },
  ],
} as const;

export type SocialLabel = (typeof site.socials)[number]["label"];

export const primaryNav = [
  { label: "Projects", href: "/projects" },
  { label: "What We Do", href: "/services" },
  // { label: "Films", href: "/tours" },
  { label: "Design Journal", href: "/journal" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Delivery record, as published by the studio. */
export const deliveryStats = {
  homesDelivered: "400+",
  communities: [
    {
      count: "138+",
      name: "Prestige Finsbury Park",
      note: "Our largest delivered community: designed, built and handed over to homeowners.",
    },
    {
      count: "62+",
      name: "Prestige Waterford",
      note: "Refined residential interiors crafted with precision and delivered as envisioned.",
    },
    {
      count: "48+",
      name: "The Prestige City",
      note: "Actively executing across multiple towers.",
      breakdown: [
        { count: "42+", name: "Avlon Park" },
        { count: "8+", name: "Eden Park" },
        { count: "8+", name: "Meridian Park" },
      ],
    },
  ],
} as const;
