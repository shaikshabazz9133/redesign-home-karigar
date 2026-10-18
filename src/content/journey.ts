/** The journey, stage by stage: shared by the home page's journey sections. */

export type StageIcon =
  | "begin"
  | "concept"
  | "design"
  // | "drawings"
  | "materials"
  | "execution"
  | "handover";

export type StageData = {
  title: string;
  icon: StageIcon;
  points: string[];
};

export const START: StageData = {
  title: "Begin",
  icon: "begin",
  points: [
    "A meeting at your home or our studio",
    "Your floor plan and brief",
    "How you live, and what you love",
  ],
};

export const STAGES: StageData[] = [
  {
    title: "Concept",
    icon: "concept",
    points: [
      "Site measurements",
      "Space planning and layouts",
      "Moodboards and material palettes",
      "The design concept",
    ],
  },
  {
    title: "3D design",
    icon: "design",
    points: [
      "Photo-real 3D views, room by room",
      "Refined with you until every detail is right",
    ],
  },
  // {
  //   title: "Drawings",
  //   icon: "drawings",
  //   points: [
  //     "Working drawings for every room",
  //     "Electrical, lighting and ceiling plans",
  //   ],
  // },
  {
    title: "Materials",
    icon: "materials",
    points: [
      "Branded plywood and hardware",
      "Finishes chosen with you from real samples",
      "Each item QR-verified on your site",
    ],
  },
  {
    title: "Execution",
    icon: "execution",
    points: [
      "Karigars at work on site",
      "Design supervision throughout",
      "Quality checks at every stage",
    ],
  },
  {
    title: "Handover",
    icon: "handover",
    points: [
      "A final walkthrough together",
      "Every room checked and finished, detail by detail",
      "The keys to your new home",
    ],
  },
];

/** A stage's points read as one sentence: "Site measurements, space planning and layouts … and the design concept." */
export function sentence(points: string[]) {
  const parts = points.map((p, i) => (i === 0 || /^[A-Z0-9]{2}/.test(p) ? p : p.charAt(0).toLowerCase() + p.slice(1)));
  const body = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0];
  return `${body}.`;
}
