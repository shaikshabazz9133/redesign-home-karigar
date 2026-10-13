/** The studio's three working beliefs, each grounded in what the site already promises. */
const PRINCIPLES = [
  {
    title: "Honest materials",
    body: "BWP plywood, branded hardware and finishes you can inspect on site — chosen for how they age, not how they photograph.",
  },
  {
    title: "Light before décor",
    body: "Ceilings, coves and spots are drawn around the furniture plan, so every room is lit for the way you live in it.",
  },
  {
    title: "Designed as one",
    body: "Every ceiling, cabinet and corner is approved together in 3D, then built exactly as drawn — one home, not a set of pieces.",
  },
];

/**
 * Two halves under the hero: "Design / Philosophy" on the left, in the hero's display
 * capitals with a small "Our" set at their foot, and the studio's beliefs on the right.
 */
export function DesignPhilosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative bg-ivory pt-20 pb-6 md:pt-28 md:pb-8">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: the title, in the hero's display capitals. */}
        <div className="lg:col-span-6">
          <h2
            id="philosophy-title"
            className="caps font-display text-display font-medium text-ink lg:sticky lg:top-32"
            data-reveal
          >
            <span className="block">
              <span className="mr-[0.4em] align-baseline font-sans text-[0.8125rem] font-medium tracking-[0.04em]">Our</span>
              Design
            </span>
            <span className="block pl-[0.5em]">Philosophy</span>
          </h2>
        </div>

        {/* Right: the belief and the three principles */}
        <div className="lg:col-span-6 lg:pt-4">
          <p className="eyebrow flex items-center gap-3 text-brass-ink" data-reveal>
            <span aria-hidden className="h-px w-8 bg-brass-ink/50" />
            How we work
          </p>
          <p
            className="mt-6 font-display text-[clamp(1.6rem,1rem+1.8vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink text-balance"
            data-reveal
          >
            We build homes the way a karigar works — <em className="font-accent text-[1.08em] font-normal italic tracking-[-0.01em] text-oxblood">slowly, honestly, and to last.</em>
          </p>
          <p className="text-lead mt-6 max-w-2xl text-muted" data-reveal>
            A beautiful room on handover day is the easy part. We design for the tenth year: proportions that stay calm,
            materials that wear in rather than out, and details you only notice because nothing ever goes wrong.
          </p>

          <ol className="mt-12 border-t border-line">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-3 border-b border-line py-8 sm:grid-cols-[4rem_1fr] sm:gap-6"
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="numeral text-3xl leading-none text-brass-ink">0{i + 1}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-ink">{p.title}</h3>
                  <p className="text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
