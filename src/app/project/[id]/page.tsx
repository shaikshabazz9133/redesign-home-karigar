import { notFound, permanentRedirect } from "next/navigation";
import { getProjectById, getProjects, projectHref } from "@/content/projects";

/** Legacy URLs (/project/3) permanently redirect to the new slugged pages. */
export function generateStaticParams() {
  return getProjects().map((p) => ({ id: String(p.id) }));
}

export default async function LegacyProjectRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(Number(id));
  if (!project) notFound();
  permanentRedirect(projectHref(project));
}
