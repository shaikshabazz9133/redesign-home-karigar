import type { Metadata } from "next";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjects,
  getRelatedProjects,
  groupByRoom,
  imageAlt,
  projectTitle,
  roomSlug,
} from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { imageGallerySchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { RoomGallery } from "@/components/projects/RoomGallery";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const rooms = groupByRoom(p).map((r) => r.room.toLowerCase());
  return pageMetadata({
    title: `${projectTitle(p)} — ${p.configuration} Interior`,
    description: `A ${p.area} ${p.configuration} home at ${p.development}, ${p.community}, Bengaluru, designed and delivered by Home Karigar. ${p.images.length} photographs covering the ${rooms.slice(0, 4).join(", ")}${rooms.length > 4 ? " and more" : ""}.`,
    path: `/projects/${p.slug}`,
    image: { src: p.cover.src, alt: imageAlt(p, p.cover), width: p.cover.width, height: p.cover.height },
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const rooms = groupByRoom(p).map((g) => ({
    room: g.room,
    id: roomSlug(g.room),
    images: g.images.map((img) => ({
      src: img.src,
      width: img.width,
      height: img.height,
      alt: imageAlt(p, img),
      caption: g.room,
    })),
  }));
  const related = getRelatedProjects(p);
  const title = projectTitle(p);

  const facts = [
    { label: "Configuration", value: p.configuration },
    { label: "Area", value: p.area },
    { label: "Community", value: p.development },
    { label: "Location", value: `${p.community}, Bengaluru` },
  ];

  return (
    <>
      <header className="pt-32 md:pt-40">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Homes", path: "/projects" }, { name: p.name, path: `/projects/${p.slug}` }]} />
          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="animate-rise"><Eyebrow>{p.configuration} residence</Eyebrow></div>
              <h1 className="mt-6 text-h1 caps animate-rise [animation-delay:80ms]">
                {p.name}
              </h1>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 animate-rise [animation-delay:160ms] lg:col-span-5">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-line-strong pt-4">
                  <dt className="eyebrow text-muted">{f.label}</dt>
                  <dd className="mt-2.5 text-lg text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="container-site mt-12 md:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-linen md:aspect-[21/9]">
            <ImageFrame fill reveal={false} parallax={0.12}>
            <LoadingImage
              src={p.cover.src}
              alt={imageAlt(p, p.cover)}
              fill
              preload
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="object-cover"
            />
            </ImageFrame>
          </div>
        </div>
      </header>

      {/* Room index — sticky on scroll */}
      <nav aria-label="Rooms in this home" className="sticky top-[4.5rem] z-30 mt-12 border-y border-line bg-ivory/90 backdrop-blur-xl md:top-20 md:mt-16">
        <div className="container-site">
          <ul className="no-scrollbar -mx-2 flex gap-1 overflow-x-auto py-3">
            {rooms.map((r) => (
              <li key={r.id} className="shrink-0">
                <a href={`#${r.id}`} className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-ink-soft transition-colors hover:bg-linen hover:text-ink">
                  {r.room}
                  <span className="text-xs text-muted tabular-nums">{r.images.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container-site py-16 md:py-24">
        <RoomGallery rooms={rooms} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y border-t border-line bg-linen/50">
          <div className="container-site">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div data-reveal>
                <Eyebrow>Keep exploring</Eyebrow>
                <h2 id="related-title" className="mt-5 text-h2 caps">
                  More homes at {p.development}
                </h2>
              </div>
              <div data-reveal>
                <ButtonLink href="/projects" variant="secondary">View the full portfolio</ButtonLink>
              </div>
            </div>
            <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.id} data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <ProjectCard project={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="pt-20 md:pt-28">
        <CtaBand
          title={`Planning a ${p.configuration} at ${p.development}?`}
          body="We know these floor plans well. Share yours and we'll show you what's possible — no advance until you approve the 3D designs."
        />
      </div>

      <JsonLd
        data={imageGallerySchema({
          name: `${title} — interiors by Home Karigar`,
          description: `${p.configuration} home interiors at ${p.development}, ${p.community}, Bengaluru.`,
          path: `/projects/${p.slug}`,
          images: rooms.flatMap((r) => r.images.map((i) => ({ src: i.src, caption: i.alt }))),
        })}
      />
    </>
  );
}
