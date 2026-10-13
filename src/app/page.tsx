import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { ImmersiveHero } from "@/components/sections/landing/ImmersiveHero";
import { DesignPhilosophy } from "@/components/sections/landing/DesignPhilosophy";
import { ArtOfHomemaking } from "@/components/sections/landing/ArtOfHomemaking";
import { CuratedStatement } from "@/components/sections/landing/CuratedStatement";
import { DesignJournal } from "@/components/sections/landing/DesignJournal";
import { CommunityMarquee } from "@/components/sections/landing/CommunityMarquee";
import { ProcessLine } from "@/components/sections/landing/ProcessLine";
import { FinalInvite } from "@/components/sections/landing/FinalInvite";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Luxury Interior Design Studio in Bengaluru`,
  description:
    "Luxury interior designers in Bengaluru. Complete home interiors from 3D design to handover — 400+ homes delivered, no advance until you approve your designs.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <ImmersiveHero />
      <DesignPhilosophy />
      <ArtOfHomemaking />
      <CuratedStatement />
      <DesignJournal />
      <CommunityMarquee />
      <ProcessLine />
      <FaqSection />
      <FinalInvite />
    </>
  );
}
