import data from "./generated/projects.json";

export interface ProjectImage {
  src: string;
  room: string;
  width: number;
  height: number;
}

export interface Project {
  id: number;
  slug: string;
  flatNo: string;
  configuration: string;
  development: string;
  community: string;
  area: string;
  cover: ProjectImage;
  images: ProjectImage[];
}

const projects = data as Project[];

/** Display order for rooms within a project. */
const ROOM_ORDER = [
  "Entrance & Foyer",
  "Living Room",
  "Dining & Crockery",
  "Kitchen",
  "Master Bedroom",
  "Guest Bedroom",
  "Kids' Bedroom",
  "Wall Décor",
  "Details",
  "Interiors",
];

/** Projects with richer galleries are featured first. */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => b.images.length - a.images.length);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function projectTitle(p: Project): string {
  return `Flat ${p.flatNo}, ${p.development}`;
}

export function projectHref(p: Project): string {
  return `/projects/${p.slug}`;
}

export function imageAlt(p: Project, img: ProjectImage): string {
  const room = img.room === "Interiors" || img.room === "Details" ? "Interior detail" : img.room;
  return `${room} in a ${p.configuration} home at ${p.development}, ${p.community}, designed by Home Karigar`;
}

export function groupByRoom(p: Project): { room: string; images: ProjectImage[] }[] {
  const groups = new Map<string, ProjectImage[]>();
  for (const img of p.images) {
    const list = groups.get(img.room) ?? [];
    list.push(img);
    groups.set(img.room, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => ROOM_ORDER.indexOf(a) - ROOM_ORDER.indexOf(b))
    .map(([room, images]) => ({ room, images }));
}

export function getRelatedProjects(p: Project, limit = 3): Project[] {
  const others = getProjects().filter((o) => o.id !== p.id);
  const same = others.filter((o) => o.development === p.development);
  return [...same, ...others.filter((o) => o.development !== p.development)].slice(0, limit);
}

export function getDevelopments(): string[] {
  return [...new Set(projects.map((p) => p.development))];
}

/** Finds a representative image for a room across all projects. */
export function findRoomImage(room: string, skip = 0): { project: Project; image: ProjectImage } | undefined {
  const matches = getProjects().flatMap((project) =>
    project.images
      .filter((image) => image.room === room && image.width >= image.height)
      .slice(0, 1)
      .map((image) => ({ project, image })),
  );
  return matches[skip] ?? matches[0];
}

export const roomSlug = (room: string) =>
  room.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
