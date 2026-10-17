import { processSteps } from "@/content/studio";
import { SectionHeading } from "@/components/ui/Typography";
import { Icon } from "@/components/ui/Icon";
import { pad2 } from "@/lib/utils";

/**
 * How a project runs, with the payment commitment attached to each stage.
 * Shared by the home and services pages.
 */
export function ProcessPromise({ headingId = "process-title" }: { headingId?: string }) {
  return (
    <section aria-labelledby={headingId} className="on-dark section-y relative overflow-hidden bg-espresso text-ivory">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* The heading sits centred against the steps, so space is shared evenly above and below it. */}
          <div className="lg:col-span-5 lg:self-center">
            <div>
              <SectionHeading
                tone="light"
                eyebrow="How we work"
                eyebrowRule={false}
                title={<span id={headingId}>Pay only as your home takes shape</span>}
                intro="Every stage is tied to something you can see. No advance until you've approved your 3D designs and materials are on site."
              />
              <ul className="mt-10 flex flex-col gap-4 text-sm text-ivory-muted" data-reveal>
                <li className="flex items-center gap-3">
                  <Icon name="qr" size={20} className="text-brass" /> QR-authenticated branded materials
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="shield" size={20} className="text-brass" /> 10% retained by you until final sign-off
                </li>
              </ul>
            </div>
          </div>

          <ol className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-line-dark" />
            {processSteps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-12 last:pb-0 md:gap-8" data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
                <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line-dark bg-espresso font-display text-brass tabular-nums">
                  {pad2(i + 1)}
                </span>
                <div className="pt-2">
                  <h3 className="text-h3 text-ivory">{s.title}</h3>
                  <p className="mt-3 text-ivory-muted">{s.body}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3.5 py-1.5 text-sm text-brass">
                    <Icon name="check" size={16} />
                    {s.promise}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
