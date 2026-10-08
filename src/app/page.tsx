import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/sections/home/Hero";
import { DeliveryRecord } from "@/components/sections/home/DeliveryRecord";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { ServicesShowcase } from "@/components/sections/home/ServicesShowcase";
import { ToursSection } from "@/components/sections/home/ToursSection";
import { ProcessPromise } from "@/components/sections/ProcessPromise";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Luxury Home Interiors in Bengaluru`,
  description:
    "Complete residential interiors in Bengaluru, from 3D design to handover. 400+ homes delivered across Prestige communities — and no advance until your designs are approved.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <DeliveryRecord />
      <Philosophy />
      <FeaturedProjects />
      <ServicesShowcase />
      <ProcessPromise />
      <ToursSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
