import { deliveryStats } from "@/content/site";
import { Eyebrow } from "@/components/ui/Typography";

/** Proof of delivery, by community — the strongest trust signal the studio has. */
export function DeliveryRecord() {
  return (
    <section aria-labelledby="record-title" className="border-b border-line bg-paper">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>Delivery record</Eyebrow>
            <h2 id="record-title" className="mt-5 text-h3 max-w-xs">
              Trusted in Bengaluru&apos;s most considered communities.
            </h2>
          </div>
          <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
            {deliveryStats.communities.map((c, i) => (
              <li key={c.name} className="flex flex-col gap-3 border-t border-line-strong pt-6" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <p className="font-display text-[3rem] leading-none tracking-tight text-oxblood">{c.count}</p>
                <p className="font-medium text-ink">{c.name}</p>
                <p className="text-sm text-muted">{c.note}</p>
                {"breakdown" in c && (
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                    {c.breakdown.map((b) => (
                      <li key={b.name} className="flex items-center gap-3 text-muted">
                        <span className="w-8 font-medium tabular-nums text-ink">{b.count}</span>
                        <span aria-hidden className="h-px flex-1 bg-line" />
                        <span>{b.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
