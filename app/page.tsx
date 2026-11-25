import type { Metadata } from "next";
import { DeliveryTimeline } from "@/components/home/DeliveryTimeline";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HomeHero } from "@/components/home/HomeHero";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { QualitySafetyTeaser } from "@/components/home/QualitySafetyTeaser";
import { ServicesBento } from "@/components/home/ServicesBento";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — MEP Contracting for Complex Buildings` },
  description: site.description,
};

/**
 * Homepage. The closing enquiry band ("Have a tender or project brief?") is the
 * shared CTABand rendered by the Footer on every page.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <ServicesBento />
      <FeaturedProjects />
      <IndustriesGrid />
      <DeliveryTimeline />
      <QualitySafetyTeaser />
    </>
  );
}
