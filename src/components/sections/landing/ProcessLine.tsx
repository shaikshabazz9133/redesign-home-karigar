import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { cn, pad2 } from "@/lib/utils";

/** The journey, stage by stage: a short name and what happens within it. */
const START = { title: "Begin", points: ["A meeting at your home or our studio", "Your floor plan and brief", "How you live, and what you love"] };
const STAGES = [
  { title: "Concept", points: ["Site measurements", "Space planning and layouts", "Moodboards and material palettes", "The design concept"] },
  { title: "3D design", points: ["Photo-real 3D views, room by room", "Refined with you until every detail is right", "Design begins with a ₹20,000 booking"] },
  { title: "Drawings", points: ["Working drawings for every room", "Electrical, lighting and ceiling plans"] },
  { title: "Materials", points: ["Branded plywood and hardware", "Each item QR-verified on your site"] },
  { title: "Execution", points: ["Karigars at work on site", "Design supervision throughout", "Quality checks at every stage"] },
  { title: "Handover", points: ["A final walkthrough together", "The keys to your new home"] },
];

/** The walnut of the "Begin your project" button, for the stage markers. */
const TIMBER = "bg-[linear-gradient(135deg,#6e5038,#583c26)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_8px_18px_-10px_rgb(88_60_38/0.7)]";

function Points({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <h3 className="font-display text-[1.125rem] leading-tight tracking-[-0.02em] text-ink">{title}</h3>
      <ul className="mt-2.5 space-y-1.5 text-[0.9375rem] leading-snug text-muted">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-brass-ink/70" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A numbered marker with a dotted lead down to its notes, as in a drawing's callouts. */
function Stage({ n, title, points, className, style }: { n: string; title: string; points: string[]; className?: string; style?: React.CSSProperties }) {
  return (
    <li className={cn("relative", className)} style={style} data-reveal>
      <span className={cn("relative z-10 grid size-12 translate-x-4 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums", TIMBER)}>{n}</span>
      <span aria-hidden className="ml-6 block h-8 border-l border-dotted border-ink/40" />
      <span aria-hidden className="-mt-px ml-[1.375rem] block size-1.5 rounded-full bg-ink" />
      <div className="mt-3 pr-4">
        <Points title={title} points={points} />
      </div>
    </li>
  );
}

/**
 * "From first sketch to the day you move in": the journey as one continuous line — from a start marker it
 * rises to run across the top (01–03), turns down around the right, and returns along the bottom (04–06),
 * each stage hanging its notes from a dotted lead. On phones the line runs straight down the left.
 */
export function ProcessLine() {
  return (
    <section aria-labelledby="journey-title" className="section-y border-y border-line bg-linen/60">
      <div className="container-site">
        <SectionHeading
          eyebrow="The journey"
          title={<span id="journey-title">From first sketch to the day you move in</span>}
          action={<ButtonLink href="/services" variant="secondary">How we work</ButtonLink>}
        />

        {/* Desktop: the winding line. --h is the drop between the two rows; the right turn is a half circle of it. */}
        <div className="relative mt-16 hidden [--c0:13rem] [--h:21rem] lg:block">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* From the start marker up and across the top */}
            <span className="absolute top-6 h-[8.5rem] rounded-tl-[5rem] border-t border-l border-ink/30 [left:calc(var(--c0)/2)] [right:calc(var(--h)/2)]" />
            {/* The turn on the right */}
            <span className="absolute top-6 right-0 h-(--h) w-[calc(var(--h)/2)] rounded-r-[calc(var(--h)/2)] border-y border-r border-ink/30" />
            {/* Back along the bottom */}
            <span className="absolute h-px bg-ink/30 [left:var(--c0)] [right:calc(var(--h)/2)] [top:calc(1.5rem+var(--h))]" />
          </div>

          <ol className="relative grid grid-cols-[var(--c0)_1fr_1fr_1fr_calc(var(--h)/2)] grid-rows-[var(--h)_auto]">
            {/* Start: a pill on the left, between the rows */}
            <li className="relative col-start-1 row-span-2 row-start-1 flex flex-col items-center pt-[8.5rem] pb-8" data-reveal>
              <span className={cn("relative z-10 mt-6 grid h-11 w-20 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums", TIMBER)}>00</span>
              <span aria-hidden className="block h-8 border-l border-dotted border-ink/40" />
              <span aria-hidden className="-mt-px block size-1.5 rounded-full bg-ink" />
              <div className="mt-3 w-full pr-6">
                <Points {...START} />
              </div>
            </li>
            {STAGES.slice(0, 3).map((s, i) => (
              <Stage key={s.title} n={pad2(i + 1)} {...s} className="row-start-1" style={{ gridColumnStart: i + 2, "--i": i } as React.CSSProperties} />
            ))}
            {STAGES.slice(3).map((s, i) => (
              <Stage
                key={s.title}
                n={pad2(i + 4)}
                {...s}
                className="row-start-2"
                style={{ gridColumnStart: 4 - i, "--i": i + 3 } as React.CSSProperties}
              />
            ))}
          </ol>
        </div>

        {/* Phones and tablets: the same journey down a single line. */}
        <ol className="relative mt-12 space-y-9 lg:hidden">
          <span aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-ink/25" />
          {[START, ...STAGES].map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5" data-reveal>
              <span className={cn("relative z-10 grid size-12 place-items-center rounded-full font-display text-[0.9375rem] tabular-nums", TIMBER)}>{pad2(i)}</span>
              <div className="pt-2.5">
                <Points {...s} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
