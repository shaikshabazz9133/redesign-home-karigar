import type { Metadata } from "next";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { pillars, team } from "@/content/studio";
import { deliveryStats, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "The Studio — Architects & Interior Designers in Bengaluru",
  description:
    "Meet Home Karigar: an architect-led interior design studio with over a decade of residential practice and 400+ homes delivered across Bengaluru.",
  path: "/about",
  image: { src: "/images/Home_Karigar_Team.png", alt: "The Home Karigar team", width: 1536, height: 1024 },
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Studio", path: "/about" }]}
        eyebrow="The studio"
        title="A small, architect-led team that stays with your home"
        intro={`For over ${site.foundedYearsAgo} years we have designed and delivered residential interiors in Bengaluru — from the first idea to the final installation.`}
      />

      <section aria-labelledby="story-title" className="container-site section-y grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen lg:col-span-5" data-reveal="image">
          <LoadingImage src="/images/about_us_01.jpeg" alt="Home Karigar designers reviewing a home interior" fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <div data-reveal><Eyebrow>Our story</Eyebrow></div>
          <h2 id="story-title" className="mt-6 text-h2" data-reveal>Share how you live. We&apos;ll do the rest.</h2>
          <div className="mt-8 flex flex-col gap-5 text-lead text-muted" data-reveal>
            <p>
              Tell us how you see your dream space. We audit the layout, propose several concept directions and bring a
              designer&apos;s knowledge of materials, proportion and colour to every decision.
            </p>
            <p>
              The same team carries your home from concept to drawings, through material selection and site execution, to
              handover — so nothing is lost between the idea and the finished room.
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8" data-reveal>
            <div className="flex flex-col gap-2">
              <dt className="text-sm text-muted">Homes delivered</dt>
              <dd className="order-first font-display text-5xl text-oxblood">{deliveryStats.homesDelivered}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-sm text-muted">Years of practice</dt>
              <dd className="order-first font-display text-5xl text-oxblood">{site.foundedYearsAgo}+</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="border-y border-line bg-paper section-y">
        <div className="container-site">
          <SectionHeading eyebrow="Principles" title={<span id="principles-title">Design. Detail. Distinction.</span>} />
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-t border-line-strong pt-8" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="font-display text-lg text-brass-ink">{pad2(i + 1)}</span>
                <h3 className="mt-4 text-h3">{p.title}</h3>
                <p className="mt-4 text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="The team"
            title={<span id="team-title">The people behind every home</span>}
            intro="Architects, interior designers and site managers who work on your project from the first meeting to handover."
            action={<ButtonLink href="/contact" variant="secondary">Work with us</ButtonLink>}
          />
          <figure className="relative mt-14 overflow-hidden rounded-sm bg-linen" data-reveal="image">
            <LoadingImage src="/images/Home_Karigar_Team.png" alt="The Home Karigar team of architects, designers and site managers" width={1536} height={1024} sizes="(min-width: 1320px) 1240px, 100vw" className="h-auto w-full" />
          </figure>
          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <li key={m.name} className="flex items-baseline justify-between gap-4 border-b border-line py-5" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                <span className="font-display text-xl">{m.name}</span>
                <span className="text-right text-sm text-muted">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
