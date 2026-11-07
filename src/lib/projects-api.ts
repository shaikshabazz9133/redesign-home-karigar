import { cache } from "react";
import type { Project } from "@/content/projects";

/**
 * Homes and their photographs come from the Home Karigar backend (managed in the admin panel):
 *   GET {API_URL}/public/projects         every home with photographs, in website order
 *   GET {API_URL}/public/projects/{slug}  one home
 * Server-only: call from server components, metadata and route handlers.
 */
export const API_URL = (process.env.API_URL ?? "http://localhost:8000/api/v1").replace(/\/$/, "");

async function request<T>(path: string): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      // Always fresh: a home or photo added in the admin shows on the very next page load.
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (e) {
    throw new Error(`Couldn't reach the Home Karigar API at ${API_URL}${path}`, { cause: e });
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Home Karigar API ${path} responded ${res.status}`);
  return (await res.json()) as T;
}

/**
 * Every home shown on the site, in the order set in the admin — fetched once per request (React `cache`).
 * Throws when the API is unreachable, so the error page is shown rather than an empty portfolio.
 */
export const getProjects = cache(async (): Promise<Project[]> => (await request<Project[]>("/public/projects")) ?? []);

export const getProject = cache(async (slug: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
});
