import { Swash } from "./ImmersiveHero";

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
 * Two halves under the hero's cropped wordmark: "Design / Philosophy" on the left, in the hero's swash
 * capitals style, and the studio's beliefs on the right.
 */
export function DesignPhilosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative bg-ivory pt-10 pb-6 md:pt-14 md:pb-8">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: the title, set like the hero's "Designing Spaces" — light Jost capitals with swash D, P and S.
            The reveal's clip-path would crop the swash flourishes, which rise above the line box. */}
        <div className="lg:col-span-6 lg:-ml-[min(calc(max(0px,(100vw_-_82rem)/2)_-_0.5rem),4.5rem)]">
          <h2
            id="philosophy-title"
            className="font-caps text-[clamp(2.9rem,1rem+4.3vw,5.25rem)] whitespace-nowrap font-light uppercase leading-[1.25] tracking-[0.03em] text-ink [clip-path:none]! lg:sticky lg:top-32"
            data-reveal
          >
            <span className="block">
              <Swash>D</Swash>esign
            </span>
            <span className="mt-[0.22em] block pl-[0.4em]">
              <Swash className="-ml-[0.02em] mr-[0.04em]">P</Swash>hilo<Swash className="mx-[0.03em]">S</Swash>ophy
            </span>
          </h2>
        </div>

        {/* Right: the belief and the three principles */}
        <div className="lg:col-span-6 lg:pt-4">
          <p className="eyebrow flex items-center gap-3 text-brass-ink" data-reveal>
            <span aria-hidden className="h-px w-8 bg-brass-ink/50" />
            How we work
          </p>
          <p
            className="mt-6 font-hero text-[clamp(1.6rem,1rem+1.9vw,2.6rem)] font-light leading-[1.18] text-ink text-balance"
            data-reveal
          >
            We build homes the way a karigar works — <em className="text-oxblood">slowly, honestly, and to last.</em>
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
                <span className="font-hero text-3xl italic leading-none text-brass-ink">0{i + 1}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-caps text-sm uppercase tracking-[0.18em] text-ink">{p.title}</h3>
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
