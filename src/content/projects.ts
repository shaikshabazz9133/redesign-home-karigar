/**
 * Shapes and helpers for the homes shown on the site. The homes themselves — details and photographs — are managed in
 * the Home Karigar admin and fetched from the backend (see `@/lib/projects-api`); nothing about them is hard-coded here,
 * so this module is safe to use from client components.
 */

export interface ProjectImage {
  /** Absolute URL of the photograph on the backend's /media. */
  src: string;
  room: string;
  width: number;
  height: number;
}

export interface Project {
  /** Position on the site (1 = first). Not stable across admin edits — use `slug` to identify a home. */
  id: number;
  slug: string;
  /** The home's design name, shown as its heading. */
  name: string;
  flatNo: string;
  configuration: string;
  development: string;
  community: string;
  area: string;
  cover: ProjectImage;
  /** Grouped by room, rooms in ROOM_ORDER (custom rooms last), photos in the order set in the admin. */
  images: ProjectImage[];
}

/** Display order for rooms within a project (same as the backend's ROOMS). Custom rooms come after these. */
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

const roomRank = (room: string) => {
  const i = ROOM_ORDER.indexOf(room);
  return i === -1 ? ROOM_ORDER.length : i;
};

export function projectTitle(p: Project): string {
  return `${p.name}, ${p.development}`;
}

export function projectHref(p: Pick<Project, "slug">): string {
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
    .sort(([a], [b]) => roomRank(a) - roomRank(b) || a.localeCompare(b))
    .map(([room, images]) => ({ room, images }));
}

export function relatedProjects(p: Project, all: Project[], limit = 3): Project[] {
  const others = all.filter((o) => o.slug !== p.slug);
  const same = others.filter((o) => o.development === p.development);
  return [...same, ...others.filter((o) => o.development !== p.development)].slice(0, limit);
}

/** Finds a representative (landscape) image for a room across the given projects. */
export function findRoomImage(
  projects: Project[],
  room: string,
  skip = 0,
): { project: Project; image: ProjectImage } | undefined {
  const matches = projects.flatMap((project) =>
    project.images
      .filter((image) => image.room === room && image.width >= image.height)
      .slice(0, 1)
      .map((image) => ({ project, image })),
  );
  return matches[skip] ?? matches[0];
}

export const roomSlug = (room: string) =>
  room.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
