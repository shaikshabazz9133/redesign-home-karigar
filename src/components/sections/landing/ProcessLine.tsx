"use client";

// import { SectionHeading } from "@/components/ui/Typography";
// import { ButtonLink } from "@/components/ui/Button";
// import { cn } from "@/lib/utils";

// /** The journey, stage by stage: a short name and what happens within it. */
// const START = { title: "Begin", points: ["A meeting at your home or our studio", "Your floor plan and brief", "How you live, and what you love"] };
// const STAGES = [
//   { title: "Concept", points: ["Site measurements", "Space planning and layouts", "Moodboards and material palettes", "The design concept"] },
//   { title: "3D design", points: ["Photo-real 3D views, room by room", "Refined with you until every detail is right", "Design begins with a ₹20,000 booking"] },
//   { title: "Drawings", points: ["Working drawings for every room", "Electrical, lighting and ceiling plans"] },
//   { title: "Materials", points: ["Branded plywood and hardware", "Each item QR-verified on your site"] },
//   { title: "Execution", points: ["Karigars at work on site", "Design supervision throughout", "Quality checks at every stage"] },
//   { title: "Handover", points: ["A final walkthrough together", "The keys to your new home"] },
// ];

// /** The walnut of the "Begin your project" button, for the stage markers. */
// // const TIMBER = "bg-[linear-gradient(135deg,#6e5038,#583c26)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_8px_18px_-10px_rgb(88_60_38/0.7)]";
// // const TIMBER =
// //   "bg-[#9F8C74] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_8px_18px_-10px_rgb(159_140_116/0.7)]";

// type StageIcon = "begin" | "concept" | "design" | "drawings" | "materials" | "execution" | "handover";

// const STAGE_ICONS: Record<StageIcon, React.ReactNode> = {
//   begin: (
//     <>
//       <path d="M12 7h17l7 7v25H12z" />
//       <path d="M29 7v7h7M17 20h9M17 25h7M17 30h9" />
//       <circle cx="31" cy="29" r="5" />
//       <path d="m35 33 5 5" />
//     </>
//   ),
//   concept: (
//     <>
//       <path d="M7 9h25v29H7zM7 17h10v9H7M17 17v-8M17 26v12M17 31h15" />
//       <path d="m25 29 5-5 5 5-5 5z" />
//     </>
//   ),
//   design: (
//     <>
//       <path d="M7 10h25v28H7zM7 18h10v20M17 10v7M20 29h10" />
//       <path d="m23 27 2-5 15-15 4 4-15 15zM37 10l4 4" />
//     </>
//   ),
//   drawings: (
//     <>
//       <path d="M9 7h22l7 7v27H9zM31 7v7h7M15 21h17M15 27h17M15 33h12" />
//       <path d="M15 17v-3M21 17v-3M27 17v-3" />
//     </>
//   ),
//   materials: (
//     <>
//       <path d="M8 11h25v27H8zM13 16h15v17H13z" />
//       <path d="M17 16v17M13 22h15M13 27h15" />
//       <path d="m30 10 7-4 5 8-7 4z" />
//     </>
//   ),
//   execution: (
//     <>
//       <path d="M7 39h34M10 39V17l14-10 14 10v22" />
//       <path d="M17 39V27h14v12M17 20h4M27 20h4" />
//       <path d="M13 13h22" />
//     </>
//   ),
//   handover: (
//     <>
//       <path d="M6 21h9v17H6zM15 24h14c3 0 5-2 7-5" />
//       <circle cx="31" cy="30" r="4" />
//       <path d="M31 34v8m0-4h4m-4 1h3" />
//     </>
//   ),
// };

// function StageIconView({ name }: { name: StageIcon }) {
//   return (
//     <svg
//       viewBox="0 0 48 48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={1.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//       className="size-9 shrink-0 text-[#9F8C74] md:size-10"
//     >
//       {STAGE_ICONS[name]}
//     </svg>
//   );
// }

// function Points({ title, points }: { title: string; points: string[] }) {
//   return (
//     <div>
//       <h3 className="font-display text-[1.125rem] leading-tight tracking-[-0.02em] text-ink">{title}</h3>
//       <ul className="mt-2.5 space-y-1.5 text-[0.9375rem] leading-snug text-muted">
//         {points.map((p) => (
//           <li key={p} className="flex gap-2">
//             <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-brass-ink/70" />
//             {p}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// /** A numbered marker with a dotted lead down to its notes, as in a drawing's callouts. */
// function Stage({
//   n,
//   title,
//   points,
//   className,
//   style,
// }: {
//   n: string;
//   title: string;
//   points: string[];
//   className?: string;
//   style?: React.CSSProperties;
// }) {
//   return (
//     <li className={cn("relative min-w-0", className)} style={style} data-reveal>
//       <div className="flex flex-col items-center">
//         <span
//           className={cn(
//             "relative z-10 grid size-12 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums",
//             TIMBER
//           )}
//         >
//           {n}
//         </span>

//         <span
//           aria-hidden
//           className="block h-8 border-l border-dotted border-ink/40"
//         />

//         <span
//           aria-hidden
//           className="-mt-px block size-1.5 rounded-full bg-ink"
//         />
//       </div>

//       <div className="mt-3 px-2">
//         <Points title={title} points={points} />
//       </div>
//     </li>
//   );
// }

// /**
//  * "From first sketch to the day you move in": the journey as one continuous line — from a start marker it
//  * rises to run across the top (01–03), turns down around the right, and returns along the bottom (04–06),
//  * each stage hanging its notes from a dotted lead. On phones the line runs straight down the left.
//  */
// export function ProcessLine() {
//   return (
//     <section aria-labelledby="journey-title" className="section-y border-t border-line bg-linen/60">
//       <div className="container-site">
//         <SectionHeading
//           eyebrow="The journey"
//           title={<span id="journey-title">From first sketch to the day you move in</span>}
//           action={<ButtonLink href="/services" variant="secondary">How we work</ButtonLink>}
//         />

//         {/* Desktop: the winding line. --h is the drop between the two rows; the right turn is a half circle of it. */}
// {/* Desktop: original winding line with corrected alignment */}
// <div className="relative mt-16 hidden [--c0:13rem] [--h:21rem] lg:block">
//   <div aria-hidden className="pointer-events-none absolute inset-0">
//     {/* Top line */}
//     <span className="absolute top-6 h-[8.5rem] rounded-tl-[5rem] border-t border-l border-ink/30 [left:calc(var(--c0)/2)] [right:calc(var(--h)/2)]" />

//     {/* Right curve */}
//     <span className="absolute top-6 right-0 h-(--h) w-[calc(var(--h)/2)] rounded-r-[calc(var(--h)/2)] border-y border-r border-ink/30" />

//     {/* Bottom line */}
//     <span className="absolute h-px bg-ink/30 [left:var(--c0)] [right:calc(var(--h)/2)] [top:calc(1.5rem+var(--h))]" />
//   </div>

//   <ol className="relative grid grid-cols-[var(--c0)_repeat(3,minmax(0,1fr))] grid-rows-[var(--h)_auto]">
//     {/* Begin — preserve the original alignment */}
//     <li
//       className="relative col-start-1 row-span-2 row-start-1 flex flex-col items-center pt-[8.5rem] pb-8"
//       data-reveal
//     >
//       <span
//         className={cn(
//           "relative z-10 mt-6 grid h-11 w-20 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums",
//           TIMBER
//         )}
//       >
//         00
//       </span>

//       <span aria-hidden className="block h-8 border-l border-dotted border-ink/40" />
//       <span aria-hidden className="-mt-px block size-1.5 rounded-full bg-ink" />

//       <div className="mt-3 w-full pr-6">
//         <Points {...START} />
//       </div>
//     </li>

//     {/* Top row: 01, 02, 03 */}
//     {STAGES.slice(0, 3).map((s, i) => (
//       <Stage
//         key={s.title}
//         n={pad2(i + 1)}
//         {...s}
//         className="row-start-1"
//         style={{ gridColumnStart: i + 2 }}
//       />
//     ))}

//     {/* Bottom row: 06, 05, 04 */}
//     {STAGES.slice(3).map((s, i) => (
//       <Stage
//         key={s.title}
//         n={pad2(i + 4)}
//         {...s}
//         className="row-start-2"
//         style={{ gridColumnStart: 4 - i }}
//       />
//     ))}
//   </ol>
// </div>

//         {/* Phones and tablets: the same journey down a single line. */}
//         <ol className="relative mt-12 space-y-9 lg:hidden">
//           <span aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-ink/25" />
//           {[START, ...STAGES].map((s, i) => (
//             <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5" data-reveal>
//               <span className={cn("relative z-10 grid size-12 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums", TIMBER)}>{pad2(i)}</span>
//               <div className="pt-2.5">
//                 <Points {...s} />
//               </div>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </section>
//   );
// }




import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type StageIcon =
  | "begin"
  | "concept"
  | "design"
  // | "drawings"
  | "materials"
  | "execution"
  | "handover";

type StageData = {
  title: string;
  icon: StageIcon;
  points: string[];
};

const START: StageData = {
  title: "Begin",
  icon: "begin",
  points: [
    "A meeting at your home or our studio",
    "Your floor plan and brief",
    "How you live, and what you love",
  ],
};

const STAGES: StageData[] = [
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

const ACCENT = "#9F8C74";

const STAGE_ICONS: Record<StageIcon, React.ReactNode> = {
  begin: (
    <>
      <path d="M12 7h17l7 7v25H12z" />
      <path d="M29 7v7h7M17 20h9M17 25h7M17 30h9" />
      <circle cx="31" cy="29" r="5" />
      <path d="m35 33 5 5" />
    </>
  ),

  concept: (
    <>
      <path d="M7 9h25v29H7z" />
      <path d="M7 17h10v9H7M17 17V9M17 26v12M17 31h15" />
      <circle cx="32" cy="30" r="5" />
      <path d="m36 34 4 4" />
    </>
  ),

  // Isometric room / 3D interior design
  design: (
    <>
      <path d="m5 18 19-11 19 11-19 12L5 18Z" />
      <path d="M5 18v14l19 11 19-11V18" />
      <path d="M24 30v13" />
      <path d="M14 24v-7l7-4M24 30l10-6v-7" />
      <path d="M28 20v-5l5-3 5 3v5" />
      <path d="M12 29v-5l6 3v5" />
    </>
  ),

  // drawings: (
  //   <>
  //     <path d="M9 7h22l7 7v27H9z" />
  //     <path d="M31 7v7h7M15 21h17M15 27h17M15 33h12" />
  //     <path d="M15 17v-3M21 17v-3M27 17v-3" />
  //   </>
  // ),

  // Plywood samples and hardware
  materials: (
    <>
      <path d="m6 15 23-9 12 6-23 10-12-7Z" />
      <path d="M6 15v5l12 6 23-10v-4M18 22v4" />
      <path d="M10 29h22v12H10zM15 33h12M15 37h12" />
      <circle cx="37" cy="31" r="3" />
      <path d="M37 34v5" />
    </>
  ),

  execution: (
    <>
      <path d="M7 39h34M10 39V17l14-10 14 10v22" />
      <path d="M17 39V27h14v12M17 20h4M27 20h4" />
      <path d="M13 13h22" />
    </>
  ),

  handover: (
    <>
      <path d="M6 21h9v17H6zM15 24h14c3 0 5-2 7-5" />
      <circle cx="31" cy="30" r="4" />
      <path d="M31 34v8m0-4h4m-4 1h3" />
    </>
  ),
};

function StageIconView({ name }: { name: StageIcon }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={ACCENT}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-9 shrink-0 md:size-10"
    >
      {STAGE_ICONS[name]}
    </svg>
  );
}

/* ── The journey line ──────────────────────────────────────────────────────
   The journey drawn as one open, flowing line: no frame and no floor plan, just a dashed walnut wave on a
   faint dot grid that fades out towards the edges. The line draws itself as the section comes into view,
   dropping a numbered pin at each stage, with the stage's notes always set beside it — above the crests,
   below the troughs. Once drawn, the stages are highlighted in turn until the visitor points at one.
   Coordinates are on a 1200 × 520 plate. */
const PLATE = { w: 1200, h: 520 };
const ALL = [START, ...STAGES];

/** The pins, alternating low and high along the wave. */
const LOW = 340;
const HIGH = 180;
const PINS = ALL.map((_, i) => ({ x: 130 + i * 188, y: i % 2 ? HIGH : LOW }));

/** A smooth wave through every pin (level at each pin), led in from the left edge and out to the right. */
const PATH_D = [
  `M0 ${PINS[0].y} H${PINS[0].x}`,
  ...PINS.slice(1).map((p, i) => {
    const a = PINS[i];
    const mid = (p.x - a.x) / 2;
    return `C${a.x + mid} ${a.y} ${p.x - mid} ${p.y} ${p.x} ${p.y}`;
  }),
  `H${PLATE.w}`,
].join(" ");

/** How far along the path (0–1) each pin sits, so it appears as the line reaches it. */
const PIN_AT = [0.086, 0.252, 0.417, 0.583, 0.748, 0.914];
const DRAW_S = 2.6;

/** A soft white disc carrying the stage's icon, lifted on a shadow with a warm glow beneath. */
function Badge({ icon, className }: { icon: StageIcon; className?: string }) {
  return (
    <span className={cn("relative grid size-[4.25rem] place-items-center", className)}>
      <span aria-hidden className="absolute top-[62%] left-1/2 h-10 w-20 -translate-x-1/2 rounded-full bg-[#6e5038]/30 blur-2xl" />
      <span className="absolute inset-0 rounded-full bg-white shadow-[0_14px_30px_-10px_rgb(51_32_13/0.22),0_0_0_1px_rgb(110_80_56/0.06)]" />
      <span className="relative">
        <StageIconView name={icon} />
      </span>
    </span>
  );
}

/** A large faded number, fading out towards its foot as in the reference. */
function BigNumber({ n, className, style }: { n: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        "pointer-events-none bg-[linear-gradient(180deg,rgb(31_26_23/0.1),rgb(31_26_23/0))] bg-clip-text font-display leading-none font-bold tracking-[-0.06em] text-transparent select-none",
        className,
      )}
    >
      {n}
    </span>
  );
}

/** A stage's points read as one sentence: "Site measurements, space planning and layouts … and the design concept." */
function sentence(points: string[]) {
  const parts = points.map((p, i) => (i === 0 || /^[A-Z0-9]{2}/.test(p) ? p : p.charAt(0).toLowerCase() + p.slice(1)));
  const body = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0];
  return `${body}.`;
}

function Notes({ stage }: { stage: StageData }) {
  return (
    <>
      <h3 className="font-display text-[clamp(1.2rem,0.8rem+0.7vw,1.4rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">{stage.title}</h3>
      <p className="mt-2.5 text-[clamp(0.875rem,0.8rem+0.15vw,0.9375rem)] leading-[1.6] text-muted">{sentence(stage.points)}</p>
    </>
  );
}

/** The journey line, its pins and notes. */
function Blueprint() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  // Draw once the line is properly in view (straight away for reduced motion).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setDrawn(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once drawn, the stages are highlighted in turn until the visitor points at one.
  useEffect(() => {
    if (!drawn || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = -1;
    const start = window.setTimeout(() => setActive((i = 0)), DRAW_S * 1000 + 400);
    const t = window.setInterval(() => setActive((i = (i + 1) % ALL.length)), 3200);
    return () => {
      clearTimeout(start);
      clearInterval(t);
    };
  }, [drawn, touched]);

  const take = (i: number | null) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <div ref={ref} className={cn("hk-bp relative mx-auto mt-20 hidden max-w-[72rem] xl:block", drawn && "is-drawn")} style={{ aspectRatio: `${PLATE.w} / ${PLATE.h}` }}>
      {/* A faint dot grid, fading out towards the edges so the drawing has no frame. */}
      <div
        aria-hidden
        className="hk-bp-plan absolute inset-0 bg-[radial-gradient(rgb(110_80_56/0.2)_1px,transparent_1.5px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_55%_at_center,#000_35%,transparent_100%)]"
      />

      <svg aria-hidden viewBox={`0 0 ${PLATE.w} ${PLATE.h}`} className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <mask id="hk-bp-walk" maskUnits="userSpaceOnUse">
            <path d={PATH_D} pathLength={1} stroke="#fff" strokeWidth={12} className="hk-bp-reveal" />
          </mask>
          {/* the line fades in from the left edge and out at the right */}
          <linearGradient id="hk-bp-fade" gradientUnits="userSpaceOnUse" x1={0} x2={PLATE.w} y1={0} y2={0}>
            <stop offset="0" stopColor="#6e5038" stopOpacity={0} />
            <stop offset="0.09" stopColor="#6e5038" />
            <stop offset="0.91" stopColor="#6e5038" />
            <stop offset="1" stopColor="#6e5038" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* a soft solid track beneath, then the dashed walnut walk, revealed as if drawn */}
        <path className="hk-bp-plan" d={PATH_D} stroke="url(#hk-bp-fade)" strokeOpacity={0.14} strokeWidth={8} strokeLinecap="round" />
        <path d={PATH_D} mask="url(#hk-bp-walk)" stroke="url(#hk-bp-fade)" strokeWidth={2.4} strokeDasharray="10 9" strokeLinecap="round" />
      </svg>

      <ol className="absolute inset-0" onPointerLeave={() => touched && setActive(null)}>
        {PINS.map((pin, i) => {
          const stage = ALL[i];
          const on = active === i;
          const high = pin.y === HIGH;
          return (
            <li
              key={stage.title}
              className={cn("hk-bp-pin absolute", on ? "z-30" : "z-10")}
              style={{ left: `${(pin.x / PLATE.w) * 100}%`, top: `${(pin.y / PLATE.h) * 100}%`, "--d": `${(PIN_AT[i] * DRAW_S).toFixed(2)}s` } as React.CSSProperties}
            >
              <button
                type="button"
                onPointerEnter={() => take(i)}
                onFocus={() => take(i)}
                onClick={() => take(on ? null : i)}
                aria-describedby={`bp-stage-${i}`}
                className={cn(
                  "absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[linear-gradient(135deg,#6e5038,#583c26)] font-display text-[0.875rem] text-white tabular-nums shadow-[0_0_0_5px_#fff,0_10px_24px_-8px_rgb(88_60_38/0.6)] transition-transform duration-500 ease-out-expo outline-none hover:scale-110 focus-visible:scale-110",
                  on && "scale-110",
                )}
              >
                {String(i + 1).padStart(2, "0")}
                <span className="sr-only">{stage.title}</span>
                {/* a soft pulse while this stage is highlighted */}
                <span aria-hidden className={cn("absolute inset-0 rounded-full border-2 border-[#6e5038]", on ? "animate-ping opacity-40" : "opacity-0")} />
              </button>

              {/* The stage's notes, always shown: above the crests, below the troughs. */}
              <div
                id={`bp-stage-${i}`}
                className={cn("absolute left-0 w-[15rem] -translate-x-1/2 text-center", high ? "bottom-10 h-[11rem]" : "top-10")}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-60")}>
                    <StageIconView name={stage.icon} />
                  </span>
                  <h3 className={cn("font-display text-[1.125rem] leading-tight font-semibold tracking-[-0.02em] transition-colors duration-500", on ? "text-[#6e5038]" : "text-ink")}>
                    {stage.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-[1.55] text-muted">{sentence(stage.points)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function ProcessLine() {
  return (
    <section aria-labelledby="journey-title" className="bg-linen/60 py-7 md:py-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="The journey"
          title={<span id="journey-title">From first sketch to the day you move in</span>}
          action={
            <ButtonLink href="/services" variant="secondary">
              How we work
            </ButtonLink>
          }
        />

        {/* Desktop: all six stages on one wave; hover a stage to read it. */}
        <Blueprint />

        {/* Phones and tablets: the same stages down a single line. */}
        <ol className="relative mt-12 space-y-10 xl:hidden">
          <span aria-hidden className="absolute top-[2.125rem] bottom-[2.125rem] left-[2.125rem] w-0.5 -translate-x-1/2 rounded-full bg-[#6e5038]/70" />
          {ALL.map((stage, i) => (
            <li key={stage.title} className="relative grid grid-cols-[4.25rem_1fr] items-start gap-5">
              <Badge icon={stage.icon} />
              <div className="relative pt-4" data-reveal>
                <BigNumber n={i + 1} className="absolute -top-2 right-1 text-[5.5rem]" />
                <div className="relative">
                  <Notes stage={stage} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
