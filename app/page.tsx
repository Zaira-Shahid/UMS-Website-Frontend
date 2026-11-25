import type { Metadata } from "next";
import { Clients } from "@/components/home/Clients";
import { Credentials } from "@/components/home/Credentials";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HowWeDeliver } from "@/components/home/HowWeDeliver";
import { ServicesSlider } from "@/components/home/ServicesSlider";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/content/home";
import { site } from "@/content/site";
import { ogImage, ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — MEP Contracting for Complex Buildings` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { images: ogImages, type: "website", siteName: `${site.name} — ${site.fullName}`, title: `${site.name} — MEP Contracting for Complex Buildings`, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `${site.name} — MEP Contracting for Complex Buildings`, description: site.description },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — ${site.fullName}`,
  url: site.url,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

/** Homepage (PROJECT_SPEC.md H1 to H8). The enquiry band (H8) and the footer (H9) come from the layout. */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSlider />
      <HowWeDeliver />
      <FeaturedProjects />
      <Clients />
      <Credentials />
      <HomeFaq />
      <JsonLd data={[organizationLd, websiteLd, faqLd]} />
    </>
  );
}
