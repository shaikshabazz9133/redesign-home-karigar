import { tours } from "@/content/studio";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { TourGallery } from "@/components/tours/TourGallery";

export function ToursSection() {
  return (
    <section aria-labelledby="tours-title" className="section-y overflow-hidden border-t border-line bg-linen/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Home tours"
          title={<span id="tours-title">Walk through finished homes — and hear from their owners</span>}
          intro={`Filmed after handover and published on the ${site.name} YouTube channel.`}
          action={
            <ButtonLink href="/tours" variant="secondary">
              All {tours.length} videos
            </ButtonLink>
          }
        />
        <div className="mt-14 md:mt-16">
          <TourGallery tours={tours.slice(0, 8)} layout="carousel" />
        </div>
      </div>
    </section>
  );
}
