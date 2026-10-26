import { pad2 } from "@/lib/utils";

/* Line icons in the studio's brass, each with one stroke in a softer taupe — drawn at 48 × 48. */
const brass = "stroke-brass-ink";
const soft = "stroke-taupe/70";

const ICONS = {
  briefing: (
    <>
      <path className={brass} d="M14 6h15l7 7v27a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path className={brass} d="M29 6v7h7" />
      <path className={soft} d="M17 19h6M17 25h5M17 31h6" />
      <circle className={brass} cx="29" cy="25" r="5.5" />
      <path className={brass} d="m33 29 5 5" />
    </>
  ),
  design: (
    <>
      <path className={soft} d="M7 12h24v28H7zM7 22h10v18M17 12v6M24 31h7" />
      <path className={brass} d="m22 30 2-6 17-17 4 4-17 17-6 2Z" />
      <path className={brass} d="m37 11 4 4" />
    </>
  ),
  execution: (
    <>
      <path className={brass} d="M8 40h32M10 40V10h28v8H18v14h20v8" />
      <path className={soft} d="M18 18h20M24 10v8M30 10v8M18 25h20M27 25v7" />
    </>
  ),
  handover: (
    <>
      <path className={brass} d="M6 12h5v14H6zM11 14h13c2 0 4 2 4 4H17" />
      <path className={brass} d="M11 24h16c3 0 6-2 8-5" />
      <circle className={soft} cx="31" cy="30" r="4" />
      <path className={soft} d="M31 34v9m0-5h3m-3 3h2" />
    </>
  ),
};

const STEPS: { title: string; icon: keyof typeof ICONS; text: string }[] = [
  {
    title: "Briefing",
    icon: "briefing",
    text: "We begin by listening to your floor plan, your routines and the way your family lives, so every decision that follows starts from you.",
  },
  {
    title: "Design",
    icon: "design",
    text: "The brief becomes a blueprint. From moodboards to photo-real 3D views, every room is designed and refined with you to the last detail.",
  },
  {
    title: "Execution",
    icon: "execution",
    text: "Our karigars build exactly what you approved, with branded materials you can verify on site and our designers supervising every stage.",
  },
  {
    title: "Handover",
    icon: "handover",
    text: "The moment you have waited for: a final walkthrough together, then the keys to a home that is ready to live in.",
  },
];

/**
 * "How we work" in four steps, after an atelier's process strip: a line icon above each, then a numbered
 * ring, the step in capitals and a short note, the columns divided by brass hairlines.
 */
export function HowWeWork() {
  return (
    <section aria-label="How we work, in four steps" className="bg-ivory py-14 md:py-20">
      <ol className="container-site grid gap-y-12 border-b border-brass/50 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="flex flex-col sm:px-6 lg:px-8 lg:first:pl-0 lg:last:pr-0 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l border-brass/50"
          >
            <svg viewBox="0 0 48 48" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="mx-auto size-16 md:size-[4.5rem]" aria-hidden>
              {ICONS[s.icon]}
            </svg>
            <div className="mt-8 grid grid-cols-[2.75rem_1fr] gap-x-4">
              <span className="grid size-10 place-items-center rounded-full border border-brass text-[0.75rem] tabular-nums text-brass-ink">
                {pad2(i + 1)}.
              </span>
              <div>
                <h3 className="pt-1.5 font-display text-[1.375rem] leading-none tracking-[-0.02em] text-brass-ink uppercase">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
