import { processSteps } from "@/content/studio";
import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { pad2 } from "@/lib/utils";

/** Five stages on one horizontal line that draws itself on scroll. */
export function ProcessLine() {
  return (
    <section aria-labelledby="journey-title" className="section-y border-y border-line bg-linen/60">
      <div className="container-site">
        <SectionHeading
          eyebrow="The journey"
          title={<span id="journey-title">From first sketch to the day you move in</span>}
          action={<ButtonLink href="/services" variant="secondary">How we work</ButtonLink>}
        />
        <ol className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-5 md:gap-6">
          <span aria-hidden data-reveal="fade" className="hk-line-draw absolute left-6 right-6 top-6 hidden h-px bg-ink/25 md:block" />
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 md:block" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span className="relative z-10 grid size-12 place-items-center rounded-full border border-ink/20 bg-ivory font-display text-brass-ink tabular-nums">
                {pad2(i + 1)}
              </span>
              <div className="md:mt-7">
                <h3 className="font-display text-xl leading-snug">{s.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-muted">{s.promise}.</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
