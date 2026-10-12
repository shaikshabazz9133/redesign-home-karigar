import type { MetadataRoute } from "next";
import { getProjects, projectHref } from "@/content/projects";
import { articleHref, getJournal } from "@/content/journal";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Public, indexable pages only — /login and /api are intentionally excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/projects", priority: 0.9, freq: "weekly" },
    { path: "/services", priority: 0.8, freq: "monthly" },
    { path: "/tours", priority: 0.7, freq: "weekly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/journal", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...getProjects().map((p) => ({
      url: absoluteUrl(projectHref(p)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(p.cover.src)],
    })),
    ...getJournal().map((a) => ({
      url: absoluteUrl(articleHref(a)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      images: [absoluteUrl(a.image.src)],
    })),
  ];
}
