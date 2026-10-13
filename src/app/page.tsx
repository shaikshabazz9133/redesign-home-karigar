import type { Metadata } from "next";
import { site } from "@/content/site";
import { tours } from "@/content/studio";
import { getProject, imageAlt, projectHref, type Project } from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { ImmersiveHero } from "@/components/sections/landing/ImmersiveHero";
import { DesignPhilosophy } from "@/components/sections/landing/DesignPhilosophy";
import { ArtOfHomemaking } from "@/components/sections/landing/ArtOfHomemaking";
import { CuratedStatement } from "@/components/sections/landing/CuratedStatement";
import { DesignJournal } from "@/components/sections/landing/DesignJournal";
import { ArchHero } from "@/components/sections/landing/ArchHero";
import { CommunityMarquee } from "@/components/sections/landing/CommunityMarquee";
import { RoomExplorer, type ExplorerRoom } from "@/components/sections/landing/RoomExplorer";
import { PromiseBento } from "@/components/sections/landing/PromiseBento";
import { ProcessLine } from "@/components/sections/landing/ProcessLine";
import { ProjectSpotlight } from "@/components/sections/landing/ProjectSpotlight";
import { Voices } from "@/components/sections/landing/Voices";
import { FinalInvite } from "@/components/sections/landing/FinalInvite";
import { FaqSection } from "@/components/sections/FaqSection";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Luxury Interior Design Studio in Bengaluru`,
  description:
    "Home Karigar is a luxury interior design studio in Bengaluru, designing spaces that age beautifully — complete homes from 3D design to handover, with 400+ homes delivered and no advance until your designs are approved.",
  path: "/",
  absoluteTitle: true,
});

/** Real photographs from delivered homes, one per room type. */
const ROOM_PICKS: { room: string; note: string; slug: string; src: string }[] = [
  { room: "Master bedroom", note: "Emerald panelled walls, brass-framed mouldings and a botanical-print sliding wardrobe.", slug: "flat-59051-meridian-park", src: "/images/59051/7.jpeg" },
  { room: "Pooja & feature walls", note: "A hand-painted arch panel framed by sconces — tradition, quietly composed.", slug: "flat-59051-meridian-park", src: "/images/59051/3.jpeg" },
  { room: "Entrance foyer", note: "Fluted wood, brass discs and a floating shoe unit washed in warm light.", slug: "flat-13272-avlon-park", src: "/images/13272/14.jpeg" },
  { room: "Living room", note: "A marble-effect TV wall with lit display niches, centred on a round walnut table.", slug: "flat-17242-avlon-park", src: "/images/17242/6.jpeg" },
  { room: "Dining & crockery", note: "A crockery unit with mirrored backs and lit shelving, anchoring the dining space.", slug: "flat-17242-avlon-park", src: "/images/17242/3.jpeg" },
  { room: "Modular kitchen", note: "Handle-less lower cabinets, glass-fronted uppers and a clean, continuous counter.", slug: "flat-17193-avlon-park", src: "/images/17193/6.jpeg" },
  { room: "Kids' bedroom", note: "Soft lavender panelling with an upholstered headboard and built-in study.", slug: "flat-13104-avlon-park", src: "/images/13104/10.jpg" },
];

function explorerRooms(): ExplorerRoom[] {
  return ROOM_PICKS.flatMap((r) => {
    const p = getProject(r.slug);
    const img = p?.images.find((i) => i.src === r.src);
    if (!p || !img) return [];
    return [{
      room: r.room,
      note: r.note,
      image: { src: img.src, width: img.width, height: img.height, alt: imageAlt(p as Project, img) },
      project: { label: `Flat ${p.flatNo} · ${p.development}`, href: projectHref(p) },
    }];
  });
}

export default function HomePage() {
  const stories = tours.filter((t) => t.kind === "Client story");
  const featured = stories[0] ?? tours[0];
  const more = [...stories.slice(1), ...tours.filter((t) => t.kind === "Home tour")].slice(0, 3);

  return (
    <>
      <ImmersiveHero />
      <DesignPhilosophy />
      <ArtOfHomemaking />
      <CuratedStatement />
      <DesignJournal />
      <ArchHero />
      <CommunityMarquee />

      <section aria-labelledby="rooms-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Inside our homes"
            title={<span id="rooms-title">Every room, considered.</span>}
            intro="Choose a room to see it in a home we've handed over — real photographs, never renders."
          />
          <div className="mt-14 md:mt-16">
            <RoomExplorer rooms={explorerRooms()} />
          </div>
        </div>
      </section>

      <PromiseBento />
      <ProcessLine />
      <ProjectSpotlight slug="flat-17242-avlon-park" />
      <Voices featured={featured} more={more} />
      <FaqSection />
      <FinalInvite />
    </>
  );
}
