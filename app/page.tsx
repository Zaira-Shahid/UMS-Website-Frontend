import type { Metadata } from "next";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { DeliveryTimeline } from "@/components/home/DeliveryTimeline";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { LatestInsights } from "@/components/home/LatestInsights";
import { QualitySafetyTeaser } from "@/components/home/QualitySafetyTeaser";
import { ServiceShortcuts } from "@/components/home/ServiceShortcuts";
import { ServicesBento } from "@/components/home/ServicesBento";
import { StatsBand } from "@/components/home/StatsBand";
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
      <HeroCarousel />
      <ServiceShortcuts />
      <StatsBand />
      <ServicesBento />
      <FeaturedProjects />
      <IndustriesGrid />
      <DeliveryTimeline />
      <QualitySafetyTeaser />
      <ClientsMarquee />
      <LatestInsights />
    </>
  );
}
