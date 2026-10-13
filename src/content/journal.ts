/**
 * Design Journal — the studio's notes on materials, light and process.
 * Every claim here mirrors what the studio already publishes elsewhere on the
 * site (services, process and FAQs), so the journal never promises more.
 */

export interface JournalImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface JournalArticle {
  slug: string;
  title: string;
  category: "Materials" | "Lighting" | "Storage" | "Process" | "Detail";
  excerpt: string;
  readMinutes: number;
  image: JournalImage;
  sections: { heading: string; body: string[] }[];
  /** A line from the article, set large as the pull quote. */
  quote: string;
  /** Which magazine page the article is laid out as (see components/journal/ArticleLayouts). */
  layout: "reshuffle" | "monograph" | "maison" | "beauty" | "character";
  /** The short headline set large on the page, line by line; `script` is a word set in the copperplate. */
  display: { script?: string; lines: string[] };
  /**
   * Photographs for the page beyond the cover image, in the order its layout places them. These are
   * stand-ins from delivered homes until the client's own photographs arrive.
   */
  gallery: JournalImage[];
  /** Where a reader who wants this for their own home should go next. */
  next: { label: string; href: string };
}

export const journal: JournalArticle[] = [
  {
    slug: "why-we-build-kitchens-on-bwp-710-plywood",
    title: "Why every kitchen we build starts with BWP 710 plywood",
    category: "Materials",
    excerpt:
      "A kitchen is the wettest, hardest-working room in the home. What sits behind the shutters decides how it ages — so that is where we start.",
    readMinutes: 4,
    image: {
      src: "/images/13272/4.jpg",
      alt: "Modular kitchen with high-gloss shutters and lit glass display cabinets",
      width: 1500,
      height: 1125,
    },
    sections: [
      {
        heading: "The part you never see",
        body: [
          "Shutters, handles and back panels are what you choose a kitchen by. The carcass — the boxes everything hangs on — is what decides whether it still closes square in ten years.",
          "Around a sink and hob, water and steam are daily facts. That is why our kitchen carcasses are built on BWP 710 plywood, a boiling-water-proof grade made for exactly these conditions.",
        ],
      },
      {
        heading: "Hardware that is felt, not heard",
        body: [
          "Every drawer and door runs on soft-close hardware from Hettich, Häfele or Ebco. A heavy pan drawer should glide shut on its own, every time, without a slam.",
          "We plan drawers before doors: deep drawers for pots and everyday plates, so nothing has to be dug out from the back of a low cabinet.",
        ],
      },
      {
        heading: "Materials you can check yourself",
        body: [
          "Branded plywood and hardware arrive on site before the advance is collected, and each item carries its own QR code so you can inspect and authenticate it.",
          "It is a simple rule: you should be able to see what your kitchen is made of before you pay for it to be built.",
        ],
      },
    ],
    quote: "You should be able to see what your kitchen is made of before you pay for it to be built.",
    layout: "reshuffle",
    display: { lines: ["Behind the", "Shutters"] },
    gallery: [
      { src: "/images/17242/24.jpeg", alt: "Tall kitchen unit with built-in oven, glass-fronted uppers and handle-less drawers", width: 781, height: 1080 },
      { src: "/images/12263/13.jpeg", alt: "Pull-out wicker basket on soft-close runners inside a kitchen cabinet", width: 960, height: 1280 },
    ],
    next: { label: "Explore our kitchens", href: "/services#modular-kitchen" },
  },
  {
    slug: "layering-light-false-ceilings",
    title: "Layering light: a false ceiling planned around how you live",
    category: "Lighting",
    excerpt:
      "Good lighting is three layers, not one fixture. We draw the ceiling around the furniture plan, so light lands where life actually happens.",
    readMinutes: 5,
    image: {
      src: "/images/home/2.png",
      alt: "Dining space under a curved false ceiling with warm cove lighting and a tiered chandelier",
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: "Start with the furniture, not the ceiling",
        body: [
          "A ceiling drawn before the layout is decided is a guess. We fix where the sofa, dining table and TV wall sit first, then shape the ceiling to frame them.",
          "The curve of a profile can echo the line of a sofa; a stepped edge can define a dining zone in an open plan without a single wall.",
        ],
      },
      {
        heading: "Three layers of light",
        body: [
          "Cove lighting washes the ceiling with a soft, indirect glow — the light you live in through the evening.",
          "Spotlights do the work: over the counter, the dining table, a reading chair. A statement fixture, like a chandelier over the table, gives the room its centre.",
          "With all three on separate circuits, one room can be bright for a dinner party and calm for a film.",
        ],
      },
      {
        heading: "Curves, steps and restraint",
        body: [
          "Curved and stepped profiles bring movement to a flat slab, but every edge also catches light and dust. We keep profiles purposeful — one gesture per room, done well.",
        ],
      },
    ],
    quote: "Good lighting is three layers, not one fixture — one gesture per room, done well.",
    layout: "monograph",
    display: { lines: ["The", "Layered", "Ceiling"] },
    gallery: [
      { src: "/images/12263/15.jpeg", alt: "Curved false ceiling edged with a band of warm cove light", width: 960, height: 1280 },
      { src: "/images/17242/2.jpeg", alt: "Hallway lit by linear ceiling lights running towards the living room", width: 1200, height: 1600 },
    ],
    next: { label: "See false ceilings & lighting", href: "/services#false-ceiling-and-lighting" },
  },
  {
    slug: "designing-a-wardrobe-that-lasts",
    title: "Designing a wardrobe you will still love in ten years",
    category: "Storage",
    excerpt:
      "Drawers, lofts and hanging space in the right proportions — and the ply and fittings that keep the doors aligned long after move-in day.",
    readMinutes: 4,
    image: {
      src: "/images/17242/9.jpeg",
      alt: "Floor-to-ceiling bedroom wardrobes framing a window seat with built-in storage",
      width: 1500,
      height: 1125,
    },
    sections: [
      {
        heading: "Measure the wardrobe, then the clothes",
        body: [
          "Before we draw a single shutter we ask what goes inside: long dresses or shirts, folded or hung, how many shoes, what lives in a suitcase until next season.",
          "That decides the split between hanging rails, drawers and shelves — and how high the loft should start so it is useful rather than forgotten.",
        ],
      },
      {
        heading: "Built to stay square",
        body: [
          "Tall doors are unforgiving: a little sag at the hinge becomes a visible gap at the top. Our wardrobes are built in Greenply or Century ply with Hettich fittings, so doors stay aligned and drawers keep running smoothly.",
        ],
      },
      {
        heading: "Let it frame the room",
        body: [
          "A wardrobe is often the largest surface in a bedroom. Running it floor to ceiling, or wrapping it around a window seat, turns storage into architecture instead of furniture pushed against a wall.",
        ],
      },
    ],
    quote: "Storage should read as architecture, not furniture pushed against a wall.",
    layout: "maison",
    display: { lines: ["A", "Wardrobe", "for", "Ten Years"] },
    gallery: [
      { src: "/images/12263/27.jpeg", alt: "Floor-to-ceiling wardrobe with a lit dressing niche and oval mirror", width: 960, height: 1280 },
    ],
    next: { label: "Explore wardrobes & storage", href: "/services#wardrobes-and-storage" },
  },
  {
    slug: "what-to-approve-before-you-pay",
    title: "What your 3D design should settle before you pay anything",
    category: "Process",
    excerpt:
      "We don't take an advance until you have approved your home in 3D. Here is what that approval should cover, room by room.",
    readMinutes: 5,
    image: {
      src: "/images/home/1.png",
      alt: "Living room with a curved false ceiling, warm cove lighting and a statement chandelier",
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: "Approval is the contract",
        body: [
          "Your home is designed in 3D, room by room, and refined with you until every detail is right. Only then — and only once branded materials are delivered to site — is an advance collected.",
          "Because execution follows the approved designs and drawings exactly, the 3D stage is where every decision should be made.",
        ],
      },
      {
        heading: "A checklist for every room",
        body: [
          "Layout: walking clearances, door swings, and where every switch and socket sits relative to the furniture.",
          "Finishes: shutter colours and textures, handles, counter and back-panel materials, viewed together rather than as separate samples.",
          "Storage: what each cabinet holds, drawer counts, loft heights.",
          "Light: the ceiling profile, cove and spot positions, and which fixtures share a switch.",
        ],
      },
      {
        heading: "After approval",
        body: [
          "Payments follow visible progress on site, and you retain 10% of the project value until the final inspection is complete. The 3D you approved is the yardstick the finished home is measured against.",
        ],
      },
    ],
    quote: "The 3D you approve is the yardstick the finished home is measured against.",
    layout: "beauty",
    display: { script: "The", lines: ["Design", "You Approve"] },
    gallery: [
      { src: "/images/12263/14.jpeg", alt: "Living room under a stepped false ceiling with cove lighting", width: 960, height: 1280 },
      { src: "/images/17242/3.jpeg", alt: "Dining room with a crockery unit backed in mirror and lit shelving", width: 1200, height: 1600 },
      { src: "/images/12263/23.jpeg", alt: "TV wall in veined marble-effect panels with a timber console", width: 960, height: 1280 },
    ],
    next: { label: "How a project runs", href: "/services" },
  },
  {
    slug: "composing-foyer-tv-wall-and-pooja",
    title: "Foyer, TV wall and pooja: composing the home as one",
    category: "Detail",
    excerpt:
      "The small built-ins are where a home's character shows. Designed together, they make every room feel like part of the same story.",
    readMinutes: 4,
    image: {
      src: "/images/home/3.png",
      alt: "Living room with panelled walls, a wave-shaped lit false ceiling and soft neutral sofas",
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: "One palette, many pieces",
        body: [
          "Entrance foyers, shoe units, TV and display walls, pooja units, study and dressing — designed separately, they become a collection of nice objects. Designed as one curated scope, they become a home.",
          "We carry a small set of materials, tones and proportions through every built-in, so the foyer quietly introduces the living room.",
        ],
      },
      {
        heading: "The first three steps inside",
        body: [
          "A foyer has to work hard in very little space: somewhere to sit, somewhere for shoes and keys, and a moment of calm before the rest of the home opens up.",
        ],
      },
      {
        heading: "A pooja unit with presence",
        body: [
          "A pooja unit should feel deliberate rather than squeezed in — with its own light, a considered backdrop and storage for everything used in daily prayer kept close at hand.",
        ],
      },
    ],
    quote: "Designed separately, they are nice objects. Designed as one, they become a home.",
    layout: "character",
    display: { script: "A", lines: ["Home", "Composed as One."] },
    gallery: [
      { src: "/images/17242/19.jpeg", alt: "Entrance foyer with a photo wall above a timber shoe unit", width: 1200, height: 1600 },
      { src: "/images/17242/6.jpeg", alt: "TV wall with lit display shelving above a round timber coffee table", width: 1200, height: 1600 },
    ],
    next: { label: "See TV units, foyers & pooja", href: "/services#tv-unit-foyer-and-pooja" },
  },
];

export const getJournal = () => journal;
export const getArticle = (slug: string) => journal.find((a) => a.slug === slug);
export const articleHref = (a: JournalArticle) => `/journal/${a.slug}`;
