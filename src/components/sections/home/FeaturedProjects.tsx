import { getProjects } from "@/content/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  const all = getProjects();
  const featured = all.slice(0, 6);
  return (
    <section aria-labelledby="featured-title" className="section-y border-t border-line bg-linen/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Selected work"
          title={<span id="featured-title">Homes we&apos;ve designed and delivered</span>}
          intro="Real homes at The Prestige City, photographed after handover — room by room, exactly as built."
          action={
            <ButtonLink href="/projects" variant="secondary">
              View all {all.length} homes
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.id} className={cn(i % 3 === 1 && "lg:translate-y-16")} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
