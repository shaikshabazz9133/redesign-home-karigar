import { notFound, permanentRedirect } from "next/navigation";

/**
 * Legacy URLs (/project/3) permanently redirect to the slugged pages. The numbers are the old site's project ids,
 * which never change, so they are kept here rather than read from the API (whose ids follow the current order).
 */
const LEGACY_SLUGS: Record<string, string> = {
  "1": "flat-57175-meridian-park",
  "2": "flat-59051-meridian-park",
  "3": "flat-17242-avlon-park",
  "4": "flat-13104-avlon-park",
  "5": "flat-17193-avlon-park",
  "6": "flat-17285-avlon-park",
  "7": "flat-13102-avlon-park",
  "9": "flat-13262-avlon-park",
};

export function generateStaticParams() {
  return Object.keys(LEGACY_SLUGS).map((id) => ({ id }));
}

export default async function LegacyProjectRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slug = LEGACY_SLUGS[id];
  if (!slug) notFound();
  permanentRedirect(`/projects/${slug}`);
}
