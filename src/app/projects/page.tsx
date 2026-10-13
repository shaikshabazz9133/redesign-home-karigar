import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/common/PageHero";
import { ProjectGrid, ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Completed Home Interiors in Bengaluru",
  description:
    "Browse 3 BHK and 3.5 BHK homes designed and delivered by Home Karigar at Avlon Park and Meridian Park, The Prestige City, Bengaluru — photographed room by room.",
  path: "/projects",
  image: { src: "/images/home/1.png", alt: "Living room designed by Home Karigar", width: 1536, height: 1024 },
});

export default function ProjectsPage() {
  const projects = getProjects();
  const photos = projects.reduce((n, p) => n + p.images.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Homes", path: "/projects" }]}
        eyebrow="Portfolio"
        title="Homes, exactly as delivered"
        intro={`${projects.length} homes and ${photos} photographs from The Prestige City — every one taken after handover, never a render.`}
      />
      <section className="container-site py-12 md:py-16" aria-label="Project list">
        {/* The full grid is server-rendered as the fallback, so every project is crawlable. */}
        <Suspense fallback={<div className="mt-[6.5rem]"><ProjectGrid projects={projects} /></div>}>
          <ProjectsExplorer projects={projects} />
        </Suspense>
      </section>
      <CtaBand title="Imagine your home here." />
    </>
  );
}
