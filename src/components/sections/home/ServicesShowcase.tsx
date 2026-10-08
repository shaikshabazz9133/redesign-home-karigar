import { LoadingImage } from "@/components/ui/LoadingImage";
import Link from "next/link";
import { services } from "@/content/studio";
import { SectionHeading } from "@/components/ui/Typography";
import { Icon } from "@/components/ui/Icon";
import { pad2 } from "@/lib/utils";

/** The four scopes of work, each with a real photograph from a delivered home. */
export function ServicesShowcase() {
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we design"
          title={<span id="services-title">One studio for the whole home</span>}
          intro="Ceilings, kitchens, wardrobes and every built-in in between — designed together, so each room belongs to the same home."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper transition-[box-shadow,transform,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                  <LoadingImage
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-display text-sm text-brass-ink tabular-nums">{pad2(i + 1)}</span>
                  <h3 className="mt-3 font-display text-[1.375rem] leading-tight">
                    <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{s.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-oxblood">
                    Learn more
                    <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
