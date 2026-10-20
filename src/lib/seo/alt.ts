/** The one alt text every photograph on the site carries, for image search. */
export const IMAGE_ALT = "Luxury interior design studio in Bengaluru";

/**
 * Gives a photograph the site-wide alt text. An empty alt — a decorative image, which screen readers and
 * search engines should skip — stays empty.
 */
export function brandAlt(alt: string) {
  return alt.trim() ? IMAGE_ALT : "";
}
