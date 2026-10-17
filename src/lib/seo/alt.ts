import { site } from "@/content/site";

/**
 * Credits the studio in a photograph's alt text ("… — Home Karigar"), so every image search result names
 * the brand. Alt text that already names it is left as written, and an empty alt — a decorative image,
 * which screen readers and search engines should skip — stays empty.
 */
export function brandAlt(alt: string) {
  const text = alt.trim();
  if (!text || text.toLowerCase().includes(site.name.toLowerCase())) return text;
  return `${text} — ${site.name}`;
}
