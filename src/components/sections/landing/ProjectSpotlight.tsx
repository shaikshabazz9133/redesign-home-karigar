import Link from "next/link";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { getProject, getProjects, groupByRoom, imageAlt, projectHref, type Project } from "@/content/projects";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Eyebrow } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** One delivered home, laid out like a magazine spread, plus quick links to others. */
export function ProjectSpotlight({ slug }: { slug: string }) {
  const p = getProject(slug) ?? getProjects()[0];
  const rooms = groupByRoom(p);
  const landscape = p.images.filter((i) => i.width >= i.height && i.src !== p.cover.src);
  const details = [...new Map(landscape.map((i) => [i.room, i])).values()].slice(0, 2);
  const others = getProjects().filter((o) => o.id !== p.id).slice(0, 4);

  return (
    <section aria-labelledby="spotlight-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between gap-10 lg:col-span-4">
            <div>
              <div data-reveal><Eyebrow>Recently handed over</Eyebrow></div>
              <h2 id="spotlight-title" className="mt-6 text-h2 caps" data-reveal>
                Flat {p.flatNo}
                <em className="block text-muted">{p.development}</em>
              </h2>
              <p className="mt-6 text-muted" data-reveal>
                A {p.area} {p.configuration} at {p.community}, designed room by room — {rooms.length} spaces and{" "}
                {p.images.length} photographs from handover.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
                {rooms.slice(0, 6).map((r) => (
                  <li key={r.room} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-soft">{r.room}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <ButtonLink href={projectHref(p)}>Walk through Flat {p.flatNo}</ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-[1.4fr_1fr]">
            <SpotImage p={p} img={p.cover} className="col-span-2 row-span-2 aspect-[4/3] lg:col-span-1 lg:aspect-auto" sizes="(min-width: 1024px) 38vw, 92vw" />
            {details.map((img, i) => (
              <SpotImage key={img.src} p={p} img={img} index={i + 1} className="aspect-[4/3]" sizes="(min-width: 1024px) 26vw, 46vw" />
            ))}
          </div>
        </div>

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o, i) => (
            <li key={o.id} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <OtherLink p={o} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpotImage({ p, img, className, sizes, index = 0 }: { p: Project; img: Project["cover"]; className: string; sizes: string; index?: number }) {
  return (
    <Link href={`${projectHref(p)}`} className={`group relative block overflow-hidden rounded-md bg-linen ${className}`} tabIndex={-1}>
      <ImageFrame fill parallax={0.12} index={index}>
        <LoadingImage src={img.src} alt={imageAlt(p, img)} fill sizes={sizes} className="object-cover group-hover:scale-[1.04]" />
      </ImageFrame>
      <span className="absolute bottom-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-xs text-ink backdrop-blur-sm">{img.room === "Interiors" ? "Living" : img.room}</span>
    </Link>
  );
}

function OtherLink({ p }: { p: Project }) {
  return (
    <Link href={projectHref(p)} className="group flex items-center justify-between gap-4 border-b border-line py-6 pr-2 sm:pr-6">
      <span>
        <span className="block font-display text-xl text-ink transition-colors group-hover:text-oxblood">Flat {p.flatNo}</span>
        <span className="mt-1 block text-sm text-muted">{p.configuration} · {p.development}</span>
      </span>
      <Icon name="arrowUpRight" size={18} className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oxblood" />
    </Link>
  );
}
