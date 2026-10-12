import type { Metadata } from "next";
import { tours, tourThumb } from "@/content/studio";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { videoListSchema } from "@/lib/seo/jsonld";
import { PageHero } from "@/components/common/PageHero";
import { JsonLd } from "@/components/common/JsonLd";
import { TourGallery } from "@/components/tours/TourGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonAnchor } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";

export const metadata: Metadata = pageMetadata({
  title: "Films — Video Walkthroughs of Finished Homes in Bengaluru",
  description:
    "Watch video tours of 3, 3.5 and 4.5 BHK homes designed by Home Karigar at The Prestige City, Bengaluru — and hear directly from the homeowners.",
  path: "/tours",
});

export default function ToursPage() {
  const youtube = site.socials.find((s) => s.label === "YouTube")!;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Films", path: "/tours" }]}
        eyebrow="Films"
        title="Walk through the homes we've handed over"
        intro="Unedited walkthroughs and homeowner stories, filmed after handover."
        aside={
          <ButtonAnchor href={youtube.href} target="_blank" rel="noopener noreferrer" variant="secondary">
            Subscribe on YouTube
          </ButtonAnchor>
        }
      />
      <section aria-label="Video tours" className="container-site section-y">
        {tours.length ? (
          <TourGallery tours={tours} layout="grid" headingLevel="h2" />
        ) : (
          <EmptyState icon="play" title="New tours are on the way" body="We're filming our latest handovers. In the meantime, browse the photo portfolio." />
        )}
      </section>
      <CtaBand />
      <JsonLd data={videoListSchema(tours.map((t) => ({ ...t, thumb: tourThumb(t.youtubeId) })))} />
    </>
  );
}
