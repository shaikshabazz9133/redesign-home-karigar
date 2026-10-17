import type { Metadata } from "next";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import Link from "next/link";
import { services } from "@/content/studio";
import { findRoomImage, groupByRoom, getProjects, imageAlt, projectHref, roomSlug } from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { servicesSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { ProcessPromise } from "@/components/sections/ProcessPromise";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Services in Bengaluru",
  description:
    "Modular kitchens, wardrobes, false ceilings, TV units, foyers and pooja units — complete home interiors in Bengaluru, built on BWP 710 ply with branded hardware.",
  path: "/services",
  keywords: ["modular kitchen designers Bengaluru", "wardrobe makers Bengaluru", "false ceiling designers Bengaluru", "TV unit design", "pooja unit design"],
  image: { src: services[0].image.src, alt: services[0].image.alt, width: services[0].image.width, height: services[0].image.height },
});

const ROOMS = ["Living Room", "Kitchen", "Master Bedroom", "Kids' Bedroom", "Entrance & Foyer", "Dining & Crockery"];

export default function ServicesPage() {
  const rooms = ROOMS.map((room, i) => ({ room, match: findRoomImage(room, i % 2) })).filter((r) => r.match);
  const roomCounts = new Map<string, number>();
  for (const p of getProjects()) for (const g of groupByRoom(p)) roomCounts.set(g.room, (roomCounts.get(g.room) ?? 0) + 1);

  return (
    <>
      <PageHero
        crumbs={[{ name: "What We Do", path: "/services" }]}
        eyebrow="What we do"
        title="Every surface, every fitting — designed as one home"
        intro="A single studio for ceilings, kitchens, wardrobes and every built-in, so materials, proportions and light stay consistent from the foyer to the bedroom."
        aside={<ButtonLink href="/contact" variant="timber" icon="arrowUpRight">Discuss your home</ButtonLink>}
      />

      <section aria-label="Service details" className="container-site section-y flex flex-col gap-24 md:gap-32">
        {services.map((s, i) => (
          <article key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <ImageFrame parallax={0.1} className={cn("aspect-[4/3] rounded-sm bg-linen lg:col-span-7", i % 2 && "lg:order-2")}>
              <LoadingImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 56vw, 92vw" className="object-cover" />
            </ImageFrame>
            <div className="lg:col-span-5">
              <p className="numeral text-xl text-brass-ink tabular-nums" data-reveal>{pad2(i + 1)}</p>
              <h2 className="mt-4 text-h2 caps" data-reveal>{s.title}</h2>
              <p className="text-lead mt-5 text-muted" data-reveal>{s.summary}</p>
              <ul className="mt-8 flex flex-col border-t border-line" data-reveal>
                {s.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 border-b border-line py-4 text-ink-soft">
                    <Icon name="check" size={18} className="shrink-0 text-oxblood" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <ProcessPromise headingId="services-process-title" />

      <section aria-labelledby="rooms-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Room by room"
            title={<span id="rooms-title">See each space in a delivered home</span>}
            intro="Every photograph links to the full home it belongs to."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map(({ room, match }, i) => {
              const { project, image } = match!;
              return (
                <li key={room} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                  <Link href={`${projectHref(project)}#${roomSlug(room)}`} className="group relative block overflow-hidden rounded-sm bg-linen">
                    <div className="relative aspect-[4/3]">
                      <ImageFrame fill index={i % 3}>
                        <LoadingImage src={image.src} alt={imageAlt(project, image)} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="object-cover group-hover:scale-[1.05]" />
                      </ImageFrame>
                      <div aria-hidden className="hk-overlay absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory">
                      <div>
                        <h3 className="font-display text-2xl">{room}</h3>
                        <p className="mt-1 text-sm text-ivory/75">In {roomCounts.get(room) ?? 1} delivered homes · Flat {project.flatNo}</p>
                      </div>
                      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-ivory text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                        <Icon name="arrowRight" size={16} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={servicesSchema()} />
    </>
  );
}
