import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import Link from "next/link";
import { imageAlt, projectHref, type Project } from "@/content/projects";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  sizes?: string;
  aspect?: "portrait" | "landscape";
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ProjectCard({
  project: p,
  sizes = "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw",
  aspect = "portrait",
  headingLevel: H = "h3",
  className,
}: ProjectCardProps) {
  return (
    <article className={cn("group relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-sm bg-linen",
          aspect === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]",
        )}
      >
        <ImageFrame fill parallax={0.08}>
          <LoadingImage
            src={p.cover.src}
            alt={imageAlt(p, p.cover)}
            fill
            sizes={sizes}
            className="object-cover group-hover:scale-[1.045]"
          />
          <div
            aria-hidden
            className="hk-overlay absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          />
        </ImageFrame>
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-sm">
          {p.configuration}
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-ivory text-ink opacity-0 shadow-soft transition-all duration-500 ease-[var(--ease-premium)] translate-y-2 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Icon name="arrowUpRight" size={18} />
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2.5 text-muted">
            Flat {p.flatNo} · {p.development}
          </p>
          <H className="text-h3 text-ink">
            <Link href={projectHref(p)} className="after:absolute after:inset-0 after:content-['']">
              {p.name}
            </Link>
          </H>
        </div>
        <p className="mt-6 shrink-0 text-right text-sm text-muted">
          {p.area}
          <span className="block">
            {p.images.length} {p.images.length === 1 ? "photograph" : "photographs"}
          </span>
        </p>
      </div>
    </article>
  );
}
