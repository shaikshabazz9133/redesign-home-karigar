import { NextResponse } from "next/server";
import { tours, tourUrl } from "@/content/studio";

/** Same contract as the legacy `/api/youtube/videos` endpoint. */
export const dynamic = "force-static";

export function GET() {
  const videos = tours.map((t) => ({
    id: t.youtubeId,
    title: t.title,
    thumbnail: `https://img.youtube.com/vi/${t.youtubeId}/maxresdefault.jpg`,
    publishedAt: "",
    publishedLabel: "",
    link: tourUrl(t.youtubeId),
    duration: "",
  }));
  return NextResponse.json({ videos });
}
