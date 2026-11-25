import type { Metadata } from "next";
import { DeliveryProcess } from "@/components/home/DeliveryProcess";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestInsights } from "@/components/home/LatestInsights";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { QualitySafety } from "@/components/home/QualitySafety";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { SystemsExplainer } from "@/components/home/SystemsExplainer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — MEP Contracting for Complex Buildings` },
  description: site.description,
};

/**
 * Homepage. Alternates dark and light: hero (dark), services (light), systems explainer (dark), industries
 * (light), delivery (light), projects (dark), quality (light). The closing enquiry band ("Have a tender or
 * project brief?") is the shared CTABand rendered by the Footer.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <ServicesShowcase />
      <SystemsExplainer />
      <IndustriesSection />
      <DeliveryProcess />
      <FeaturedProjects />
      <QualitySafety />
      <LatestInsights />
    </>
  );
}
