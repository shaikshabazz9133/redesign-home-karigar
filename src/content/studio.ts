/** Services, process, FAQs, team and tours — the studio's editorial content. */

export interface Service {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** 3D renders of this work from the Shoib Residence, played as the service's slideshow. */
  gallery: string[];
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
      src: "/images/services/false-ceiling-and-lighting.jpg",
      alt: "3D design of a living room under a cove-lit false ceiling with a sculptural chandelier and calligraphy wall",
      width: 2400,
      height: 1846,
    },
    gallery: [
      "/images/services/shoib/ceiling-1.jpg",
      "/images/services/shoib/ceiling-2.jpg",
      "/images/services/shoib/ceiling-3.jpg",
      "/images/services/shoib/ceiling-4.jpg",
      "/images/services/shoib/ceiling-5.jpg",
      "/images/services/shoib/ceiling-6.jpg",
      "/images/services/shoib/ceiling-7.jpg",
      "/images/services/shoib/ceiling-8.jpg",
    ],
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchens",
    summary:
      "Kitchens built on BWP 710 plywood carcasses with soft-close hardware from Hettich, Häfele or Ebco and marble-finish back panels.",
    details: ["BWP 710 plywood carcass", "Hettich · Häfele · Ebco hardware", "Marble-finish back panels"],
    image: {
      src: "/images/services/modular-kitchen.jpg",
      alt: "3D design of an L-shaped modular kitchen with lit glass-fronted uppers, a chimney hood and handle-less lower cabinets",
      width: 2400,
      height: 1846,
    },
    gallery: [
      "/images/services/shoib/kitchen-1.jpg",
      "/images/services/shoib/kitchen-2.jpg",
      "/images/services/shoib/kitchen-3.jpg",
      "/images/services/shoib/kitchen-4.jpg",
      "/images/services/shoib/kitchen-5.jpg",
    ],
  },
  {
    slug: "wardrobes-and-storage",
    title: "Wardrobes & Storage",
    summary:
      "Wardrobes with drawers, hanging space and premium handles, built in Greenply or Century ply with Hettich fittings.",
    details: ["Greenply / Century ply", "Hettich fittings", "Drawers, lofts and hanging space"],
    image: {
      src: "/images/services/wardrobes-and-storage.jpg",
      alt: "3D design of a walk-in wardrobe with lit glass-fronted shutters, open hanging bays and a drawer island",
      width: 2400,
      height: 1846,
    },
    gallery: [
      "/images/services/shoib/wardrobe-1.jpg",
      "/images/services/shoib/wardrobe-2.jpg",
      "/images/services/shoib/wardrobe-3.jpg",
      "/images/services/shoib/wardrobe-4.jpg",
      "/images/services/shoib/wardrobe-5.jpg",
      "/images/services/shoib/wardrobe-6.jpg",
      "/images/services/shoib/wardrobe-7.jpg",
    ],
  },
  {
    slug: "tv-unit-foyer-and-pooja",
    title: "TV Units, Foyers & Pooja",
    summary:
      "Designer TV units, entrance foyers, pooja units, study and dressing, composed as one curated scope across the home.",
    details: ["Entrance foyer & shoe units", "TV and display walls", "Pooja, study and dressing units"],
    image: {
      src: "/images/services/tv-unit-foyer-and-pooja.jpg",
      alt: "3D design of a TV wall with lit display niches and a textured feature wall in a double-height living room",
      width: 2400,
      height: 1846,
    },
    gallery: [
      "/images/services/shoib/tv-1.jpg",
      "/images/services/shoib/tv-2.jpg",
      "/images/services/shoib/tv-3.jpg",
      "/images/services/shoib/tv-4.jpg",
      "/images/services/shoib/tv-5.jpg",
      "/images/services/shoib/tv-6.jpg",
      "/images/services/shoib/tv-7.jpg",
    ],
  },
];

export const pillars = [
  {
    title: "Design",
    body: "Every project begins with an understanding of your lifestyle and how you intend to use each space. Concepts and layouts balance vision with practicality, so the home feels personal and lasts.",
  },
  {
    title: "Detail",
    body: "Concepts become drawings, and drawings become precise details. Materials are curated for function, comfort and longevity, every element considered before it reaches site.",
  },
  {
    title: "Distinction",
    body: "Execution is coordinated end to end (vendors, site work and final installation) so the home is delivered exactly as it was designed.",
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

/**
 * Homeowners' words for the home page's testimonials.
 * The first is a real client's handwritten note (22 Oct 2026); the rest are DRAFT copy written for layout, not
 * real clients' words — swap each for a real homeowner's words, name and home (with their consent) before going live.
 */
export const testimonials: { quote: string; name: string; home: string }[] = [
  {
    quote:
      "We got a space, you converted it into a home. Your consultation, emphasis on prioritizing the ask and balancing design with utility stood out for me. A huge shout-out to your team. Execution is your strength. Your team is a strong foundation. Kudos! All the best!",
    name: "Surabhi Choudhary",
    home: "Sr. HRP · Amazon India",
  },
  {
    quote:
      "We were nervous about handing over our first home, but the 3D designs took away all the guesswork. What we saw on screen is exactly what we walked into on handover day. The team was patient with every change we asked for.",
    name: "Homeowner",
    home: "3 BHK · Sarjapur Road",
  },
  {
    quote:
      "No advance until we approved the designs, and a clear payment schedule after that. That transparency is what made us choose Home Karigar, and they stuck to the timeline they promised.",
    name: "Homeowner",
    home: "Villa · Whitefield",
  },
  {
    quote:
      "The kitchen is easily our favourite room now. They planned the storage around how we actually cook, and the finish on the cabinets is excellent. Site updates every week meant we never had to chase anyone.",
    name: "Homeowner",
    home: "2 BHK · Electronic City",
  },
  {
    quote:
      "From the false ceiling to the wardrobes, everything was handled under one roof. The site supervisor kept the place clean and walked us through every stage. Our home feels warm and very us.",
    name: "Homeowner",
    home: "3 BHK · HSR Layout",
  },
  {
    quote:
      "They balanced our budget with the look we wanted without cutting corners on materials. Small details like the lighting and the wall panelling make a big difference. Highly recommend them to anyone in Bengaluru.",
    name: "Homeowner",
    home: "4 BHK · Hebbal",
  },
];

/** Answers are paragraphs split by a blank line; **double asterisks** mark the emphasised phrases. */
export const faqs = [
  {
    q: "Do you take an advance before work begins?",
    a: [
      "Unlike many interior companies, we don't ask for a percentage of the project value upfront. We only collect a small **design booking fee** to initiate the design process.",
      "Before creating your 3D designs, we conduct two detailed sessions with you. The first is a **Requirement Discussion**, where we understand your lifestyle, needs, preferences, and vision for your home. The second is a **Moodboard Presentation**, where we walk you through design concepts, material options, color palettes, and various possibilities, helping you visualize your future home before the designing begins.",
      "Only after these discussions do we proceed with your customized 3D designs. Once the designs are finalized and approved, we move forward with material planning and execution as per the approved designs.",
    ].join("\n\n"),
  },
  {
    q: "How are payments structured after that?",
    a: [
      "After the design phase, payments are linked to clearly defined project milestones and are made as the work progresses on-site. This ensures complete transparency and allows you to pay based on the actual progress of your project.",
      "For your peace of mind, you retain **10% of the total project value** until the final inspection and handover, releasing it only after you are fully satisfied with the completed work.",
    ].join("\n\n"),
  },
  {
    q: "Which materials and hardware do you use?",
    a: [
      "We use only premium-quality, branded materials and hardware to ensure lasting durability and superior performance.",
      "Our kitchens are built using **BWP 710-grade plywood carcasses** paired with premium soft-close hardware from trusted brands such as **Hettich, Häfele, or Ebco**. For wardrobes and other cabinetry, we use **Greenply, CenturyPly** or **Neem Ply** with high-quality Hettich fittings.",
      "To maintain complete transparency, every sheet of plywood and major material delivered to your site comes with its own **QR code**, allowing you to verify its authenticity and specifications before installation.",
    ].join("\n\n"),
  },
  {
    q: "What does a complete home interior include?",
    a: [
      "Our complete home interior solution is designed to cover every essential space in your home, providing a seamless experience from design to execution.",
      "It includes **living room interiors** such as foyer design, feature walls, TV unit, sofa setup, coffee table, crockery unit, dining area, decorative wall treatments, and custom partitions. For **bedrooms**, we design wardrobes, hydraulic beds, dressing units, study units, bay window seating, and customized wall décor. Our **kitchen and utility** solutions include a fully customized modular kitchen, utility storage, and optimized space planning.",
      "We also take care of **false ceilings, lighting layouts, electrical point planning, balcony designs, bathroom storage and premium hardware fittings, tile modifications wherever required**, along with other design elements that enhance the overall look and functionality of your home.",
      "From concept development and 3D visualization to material selection and final execution, every element is thoughtfully designed to create a cohesive, functional, and beautifully finished home, all under one roof.",
    ].join("\n\n"),
  },
  {
    q: "How do I get started?",
    a: [
      "Getting started is simple. Reach out to us by filling out our enquiry form, calling us, or sending us a message on WhatsApp. Our team will schedule an initial consultation to understand your requirements, lifestyle, design preferences, and project goals.",
      "The first consultation is completely **free and carries no obligation**. From there, we'll guide you through our structured design process, beginning with a detailed requirement discussion, followed by a curated moodboard presentation, before moving on to your personalized 3D designs.",
      "Our studio is open **Monday to Saturday, from 10:00 AM to 7:00 PM**, and we're always happy to assist you in planning your dream home.",
    ].join("\n\n"),
  },
  {
    q: "How long does a complete home interior take?",
    a: [
      "The project timeline depends on the scope of work, site readiness, and the level of customization involved. Before execution begins, we provide you with a detailed project schedule outlining every stage of the process.",
      "For a typical **3 BHK home**, **factory-finished interiors** are generally completed within **30–45 working days**, while **carpentry work executed on-site** typically takes around **60 working days**. Throughout the project, our dedicated team ensures timely coordination, regular progress updates, and strict quality checks to deliver your home as planned.",
    ].join("\n\n"),
  },
  {
    q: "Do you provide only on-site carpentry work, or do you also offer factory-finished interiors?",
    a: [
      "We offer **both on-site carpentry and factory-finished interiors**, allowing you to choose the solution that best suits your preferences, budget, and project requirements. Our design team will help you understand the advantages of each approach and recommend the most suitable option for your home.",
      "We also take pride in having a highly skilled **in-house carpentry team** with years of experience in crafting premium, customized interiors. Whether you choose factory-finished modules or on-site carpentry, we maintain the same commitment to quality, precision, and craftsmanship throughout the execution process.",
    ].join("\n\n"),
  },
  {
    q: "What makes Home Karigar different from other interior companies?",
    a: [
      "At **Home Karigar**, we believe exceptional interiors begin with understanding the people who will live in them. Every project starts with a structured design journey, including detailed requirement discussions and curated moodboard presentations, so your home is designed around your lifestyle, not a standard template.",
      "What sets us apart is our commitment to **transparent pricing with no hidden costs**, **premium branded materials**, **QR code verification for material authenticity**, **high-quality craftsmanship**, and **timely project delivery**. Whether you choose factory-finished interiors or our expert in-house carpentry, every detail is executed with precision and attention to finish.",
      "We're proud to be a **trusted interior partner for homeowners across Bengaluru**, with a particularly strong presence in **The Prestige City** and other premium residential communities. Every project is managed by a dedicated team, ensuring clear communication, regular progress updates, and strict quality checks from design to handover.",
      "Our goal isn't just to create beautiful interiors; it's to deliver a home that reflects your personality, maximizes functionality, and provides a smooth, transparent, and stress-free experience from start to finish.",
    ].join("\n\n"),
  },
  {
    q: "Will I receive regular project updates?",
    a: [
      "Absolutely. We believe complete transparency is essential throughout your interior journey. Our team keeps you informed at every stage of the project with **daily progress updates**, including **site videos**, photos, and milestone updates, so you always know exactly how your home is progressing, even if you're unable to visit the site.",
      "You're also welcome to **visit the site at any time** during the execution to personally inspect the work and interact with our project team. A dedicated project manager coordinates the entire process, ensures timely communication, addresses your queries, and keeps the project on track from start to finish.",
      "With Home Karigar, you'll always have complete visibility into your project's progress, quality, and timeline.",
    ].join("\n\n"),
  },
  {
    q: "Who supervises the work on-site?",
    a: [
      "Every project is supervised by a **dedicated site supervisor** who oversees the day-to-day execution, coordinates with the carpentry and installation teams, monitors workmanship, maintains quality standards, and ensures the project progresses according to schedule.",
      "Since our projects are concentrated within the same region, our **design, execution, and management teams are regularly present on-site**, allowing us to closely monitor every stage of the work and respond quickly whenever required. This collaborative, hands-on approach ensures better coordination, faster decision-making, consistent quality, and a smoother experience throughout your project.",
    ].join("\n\n"),
  },
  {
    q: "Do you handle electrical, plumbing, and civil work?",
    a: [
      "Yes. We provide **complete end-to-end interior execution**, including electrical, plumbing, and civil work wherever required as part of your project. From electrical point planning and lighting provisions to plumbing modifications, tiling, and necessary civil work, every aspect is professionally coordinated by our team.",
      "By managing all trades under one roof, we ensure seamless execution, consistent quality, timely completion, and a hassle-free experience, so you don't have to coordinate with multiple contractors.",
    ].join("\n\n"),
  },
  {
    q: "Can you work within my budget?",
    a: [
      "Absolutely. We understand that every homeowner has a different budget, and we design solutions that align with your financial goals without compromising on quality, functionality, or aesthetics.",
      "During the planning stage, we discuss your budget in detail and recommend the most suitable materials, finishes, and design options to maximize value. Our transparent pricing ensures there are **no hidden costs**, allowing you to make informed decisions while creating a home that reflects your style and requirements.",
    ].join("\n\n"),
  },
];

export const team = [
  { name: "Ar. Mohammed Zuber", role: "Founder & CEO" },
  { name: "Mohammed Nadeem", role: "CO-Founder & Marketing Head" },
  { name: "ID. Wajeeda Mullani", role: "Senior Interior Designer" },
  { name: "ID. Durga Kumari", role: "Interior Designer" },
  { name: "ID. Apurva Nalabale", role: "Principle Designer & Brand Manager" },
  { name:"Sanjna", role:"Marketing"},
  { name: "Farhat Banu", role: "Senior Sales Executive" },
  { name: "Syed Adeeba", role: "Sales Executive" },
  { name: "Zuner", role: "Site Supervision Manager" },
  { name: "Farhaan Khan", role: "Site Manager & Sales" },


];

export interface Tour {
  youtubeId: string;
  title: string;
  kind: "Home tour" | "Client story";
}

export const tours: Tour[] = [
  { youtubeId: "x9yu9KIZULc", title: "A 1,629 sq. ft. home at Meridian Park, The Prestige City", kind: "Home tour" },
  { youtubeId: "y6x07bnYu7k", title: "3BHK Signature Living", kind: "Home tour" },
  { youtubeId: "P5jEn8-EQeM", title: "From empty space to complete home, 3.5 BHK", kind: "Home tour" },
  { youtubeId: "vCsrterpYik", title: "Voices of happy homeowners", kind: "Client story" },
  { youtubeId: "xFK7xzl3H9A", title: "A 3BHK home by Home Karigar Interiors", kind: "Home tour" },
  { youtubeId: "oF56Q5OLSkE", title: "A 4.5 BHK rental home where practicality meets premium design", kind: "Home tour" },
  { youtubeId: "y-uREkKJsCc", title: "Client stories: designed for living", kind: "Client story" },
  { youtubeId: "P_6DljNS3jk", title: "A complete 3 BHK tour, designed for modern living", kind: "Home tour" },
  { youtubeId: "KhJTw2XmLzg", title: "Complete home interior at Meridian Park, Bengaluru", kind: "Home tour" },
  { youtubeId: "x0rHT-EkhB4", title: "Welcome to a Home Karigar home tour", kind: "Home tour" },
  { youtubeId: "yEKpyhu3FIU", title: "When design meets client satisfaction", kind: "Client story" },
  { youtubeId: "9m9qDTgr7Zc", title: "Rental living, elevated: thoughtful design in every corner", kind: "Home tour" },
];

/** The films shown on the home page's "The Art of Home Making" reel, in this order. */
export const featuredFilms: Tour[] = [
  { youtubeId: "x9yu9KIZULc", title: "A 1,629 sq. ft. home at Meridian Park, The Prestige City", kind: "Home tour" },
  { youtubeId: "y6x07bnYu7k", title: "3BHK Signature Living, The Prestige City", kind: "Home tour" },
  { youtubeId: "gFIi3_ps-aQ", title: "A 1,600 sq. ft. 3BHK, full home tour, The Prestige City", kind: "Home tour" },
  { youtubeId: "o4TLwiZvhMA", title: "The Rajput family shares the story behind their home", kind: "Client story" },
  { youtubeId: "xFK7xzl3H9A", title: "A 3BHK home at Avalon Park, The Prestige City", kind: "Home tour" },
  { youtubeId: "cMT1FTAT0H8", title: "An honest client review of a luxury home interior", kind: "Client story" },
  { youtubeId: "otvulaTX7S4", title: "A real customer review, Meridian Park, The Prestige City", kind: "Client story" },
  { youtubeId: "yEKpyhu3FIU", title: "When design meets client satisfaction", kind: "Client story" },
];

export const tourThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const tourUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
