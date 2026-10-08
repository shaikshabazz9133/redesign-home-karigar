/** Services, process, FAQs, team and tours — the studio's editorial content. */

export interface Service {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  image: { src: string; alt: string; width: number; height: number };
}

export const services: Service[] = [
  {
    slug: "false-ceiling-and-lighting",
    title: "False Ceilings & Lighting",
    summary:
      "Sculpted ceilings for living and dining spaces, with cove lighting and spotlights planned around how each room is used.",
    details: [
      "Layered cove, profile and spot lighting",
      "Curved and stepped ceiling profiles",
      "Lighting planned with furniture layout",
    ],
    image: {
      src: "/images/home/1.png",
      alt: "Living room with a curved false ceiling, warm cove lighting and a statement chandelier",
      width: 1536,
      height: 1024,
    },
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchens",
    summary:
      "Kitchens built on BWP 710 plywood carcasses with soft-close hardware from Hettich, Häfele or Ebco and marble-finish back panels.",
    details: ["BWP 710 plywood carcass", "Hettich · Häfele · Ebco hardware", "Marble-finish back panels"],
    image: {
      src: "/images/13272/4.jpg",
      alt: "Modular kitchen with high-gloss shutters and lit glass display cabinets",
      width: 1500,
      height: 1125,
    },
  },
  {
    slug: "wardrobes-and-storage",
    title: "Wardrobes & Storage",
    summary:
      "Wardrobes with drawers, hanging space and premium handles — built in Greenply or Century ply with Hettich fittings.",
    details: ["Greenply / Century ply", "Hettich fittings", "Drawers, lofts and hanging space"],
    image: {
      src: "/images/17242/9.jpeg",
      alt: "Floor-to-ceiling bedroom wardrobes framing a window seat with built-in storage",
      width: 1500,
      height: 1125,
    },
  },
  {
    slug: "tv-unit-foyer-and-pooja",
    title: "TV Units, Foyers & Pooja",
    summary:
      "Designer TV units, entrance foyers, pooja units, study and dressing — composed as one curated scope across the home.",
    details: ["Entrance foyer & shoe units", "TV and display walls", "Pooja, study and dressing units"],
    image: {
      src: "/images/17024/17.jpeg",
      alt: "TV wall with fluted wood panels, lit display shelving and a glossy white overhead cabinet",
      width: 1280,
      height: 960,
    },
  },
];

export const pillars = [
  {
    title: "Design",
    body: "Every project begins with an understanding of your lifestyle and how you intend to use each space. Concepts and layouts balance vision with practicality, so the home feels personal and lasts.",
  },
  {
    title: "Detail",
    body: "Concepts become drawings, and drawings become precise details. Materials are curated for function, comfort and longevity — every element considered before it reaches site.",
  },
  {
    title: "Distinction",
    body: "Execution is coordinated end to end — vendors, site work and final installation — so the home is delivered exactly as it was designed.",
  },
];

/** How a project runs — and how payments are tied to it. */
export const processSteps = [
  {
    title: "Consultation & brief",
    body: "We study your floor plan, routines and taste, then audit the layout and propose concept directions.",
    promise: "No payment required",
  },
  {
    title: "3D design approval",
    body: "Your home is designed in 3D, room by room, and refined with you until every detail is right.",
    promise: "No advance until you approve the 3D designs",
  },
  {
    title: "Branded materials, delivered",
    body: "Branded plywood and hardware arrive on site. Each item carries its own QR code so you can inspect and authenticate it.",
    promise: "Advance is collected only after material delivery",
  },
  {
    title: "Execution on site",
    body: "The advance commences the framework exactly as per approved designs and drawings. Further payments follow visible progress.",
    promise: "Pay as work progresses",
  },
  {
    title: "Inspection & handover",
    body: "We walk the finished home with you. You hold 10% of the project value until the final inspection is complete.",
    promise: "10% retained by you until sign-off",
  },
];

export const faqs = [
  {
    q: "Do you take an advance before work begins?",
    a: "No. We don't take any advance payment until your 3D designs are confirmed and materials are delivered to your site. The advance collected after delivery is used to commence the framework as per the approved designs and drawings.",
  },
  {
    q: "How are payments structured after that?",
    a: "Further payments are made according to the progress of work on site. You retain 10% of the total project amount until the final inspection and completion, and release it only once the project is complete.",
  },
  {
    q: "Which materials and hardware do you use?",
    a: "Only branded materials. Kitchens are built on BWP 710 plywood carcasses with soft-close hardware from Hettich, Häfele or Ebco. Wardrobes use Greenply or Century ply with Hettich fittings. Every material delivered to site has an individual QR code for inspection and authentication.",
  },
  {
    q: "Which communities and areas do you work in?",
    a: "We design complete residential interiors across Bengaluru and have delivered over 400 homes — including Prestige Finsbury Park, Prestige Waterford and The Prestige City (Avlon Park, Eden Park and Meridian Park).",
  },
  {
    q: "What does a complete home interior include?",
    a: "Typically false ceilings and lighting, a modular kitchen, wardrobes and storage, TV unit, entrance foyer, pooja unit, study and dressing — designed and executed under one curated scope.",
  },
  {
    q: "How do I get started?",
    a: "Share your requirements through our enquiry form, WhatsApp or a phone call. Our studio is open Monday to Saturday, 10 AM to 7 PM, and the first consultation carries no obligation.",
  },
];

export const team = [
  { name: "Ar. Mohammed Zuber", role: "Architect & Founder" },
  { name: "Mohammed Nadeem", role: "Marketing Head" },
  { name: "ID. Wajeeda Mullani", role: "Senior Interior Designer" },
  { name: "ID. Shahid Mecci", role: "Interior Designer" },
  { name: "ID. Durga Kumari", role: "Interior Designer" },
  { name: "ID. Apurva Nalabale", role: "Brand Manager" },
  { name: "Hemanta Manna", role: "General Manager & Sales" },
  { name: "Farhaan Khan", role: "Site Manager & Sales" },
  { name: "Farhat Banu", role: "Sales Executive" },
];

export interface Tour {
  youtubeId: string;
  title: string;
  kind: "Home tour" | "Client story";
}

export const tours: Tour[] = [
  { youtubeId: "x9yu9KIZULc", title: "A 1,629 sq. ft. home at Meridian Park, The Prestige City", kind: "Home tour" },
  { youtubeId: "y6x07bnYu7k", title: "3BHK Signature Living", kind: "Home tour" },
  { youtubeId: "P5jEn8-EQeM", title: "From empty space to complete home — 3.5 BHK", kind: "Home tour" },
  { youtubeId: "vCsrterpYik", title: "Voices of happy homeowners", kind: "Client story" },
  { youtubeId: "xFK7xzl3H9A", title: "A 3BHK home by Home Karigar Interiors", kind: "Home tour" },
  { youtubeId: "oF56Q5OLSkE", title: "A 4.5 BHK rental home where practicality meets premium design", kind: "Home tour" },
  { youtubeId: "y-uREkKJsCc", title: "Client stories — designed for living", kind: "Client story" },
  { youtubeId: "P_6DljNS3jk", title: "A complete 3 BHK tour, designed for modern living", kind: "Home tour" },
  { youtubeId: "KhJTw2XmLzg", title: "Complete home interior at Meridian Park, Bengaluru", kind: "Home tour" },
  { youtubeId: "x0rHT-EkhB4", title: "Welcome to a Home Karigar home tour", kind: "Home tour" },
  { youtubeId: "yEKpyhu3FIU", title: "When design meets client satisfaction", kind: "Client story" },
  { youtubeId: "9m9qDTgr7Zc", title: "Rental living, elevated — thoughtful design in every corner", kind: "Home tour" },
];

export const tourThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const tourUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
