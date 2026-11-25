import { quoteHref } from "@/content/navigation";
import { absoluteUrl, jsonLd, organizationRef } from "@/lib/seo";
import type { Service } from "@/types";
import { ApplicationsList } from "./ApplicationsList";
import { FaqSection } from "./FaqSection";
import { ScopeStages } from "./ScopeStages";
import { SectionNav, type NavSection } from "./SectionNav";
import { ServiceCTA } from "./ServiceCTA";
import { ServiceHero } from "./ServiceHero";
import { ServiceDiagramSection } from "./ServiceDiagramSection";
import { SystemsList } from "./SystemsList";

/** The one shared template behind all six /services/[slug] pages. */
export function ServiceTemplate({ service }: { service: Service }) {
  const url = absoluteUrl(`/services/${service.slug}`);

  const sections: NavSection[] = [
    { id: "systems", label: "Systems" },
    { id: "how", label: "How it works" },
    { id: "applications", label: "Applications" },
    { id: "scope", label: "Scope" },
    { id: "faq", label: "FAQ" },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.summary,
      url,
      provider: organizationRef,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      {structuredData.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(d) }}
        />
      ))}
      <ServiceHero service={service} />
      <SectionNav
        sections={sections}
        accent={service.accent}
        quoteHref={quoteHref({ service: service.slug })}
        quoteLabel={`Quote for ${service.shortName}`}
      />
      <SystemsList service={service} />
      <ServiceDiagramSection service={service} />
      <ApplicationsList service={service} />
      <ScopeStages service={service} />
      <FaqSection
        faqs={service.faqs}
        accent={service.accent}
        index="05"
        description={`Straight answers on ${service.shortName} — written in general engineering terms, not as UMS commitments.`}
      />
      <ServiceCTA service={service} />
    </>
  );
}
