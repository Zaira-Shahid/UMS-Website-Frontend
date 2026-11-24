import type { Metadata } from "next";
import { IntegratedDeliveryBand } from "@/components/services/IntegratedDeliveryBand";
import { ServiceOverviewCard } from "@/components/services/ServiceOverviewCard";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const description =
  "Six MEP disciplines — integrated MEP, HVAC, fire fighting, plumbing, electrical and ELV, and pools and fountains — delivered separately or as one coordinated package.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Services | ${site.name}`,
    description,
    url: "/services",
  },
  twitter: { card: "summary_large_image", title: `Services | ${site.name}`, description },
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      {/* Hero */}
      <section
        aria-labelledby="services-title"
        className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-[calc(var(--header-h)+2.5rem)] text-white md:pb-24"
      >
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs
            tone="light"
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                <span aria-hidden className="h-px w-8 bg-cyan-300" />
                Our Services
              </p>
              <h1 id="services-title" className="mt-5 text-[clamp(2.5rem,1.5rem+4.6vw,5.5rem)] text-white">
                Every system a building depends on
              </h1>
            </div>
            <p className="max-w-md text-lg text-white/75 lg:col-span-4">
              HVAC, fire protection, electrical, plumbing and water features — delivered as
              individual disciplines or as one coordinated MEP package.
            </p>
          </div>
        </div>
      </section>

      {/* Six services — staggered two-column composition */}
      <section aria-label="All services" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal stagger as="div" className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {services.map((s, i) => (
              <RevealItem
                key={s.slug}
                // Right-hand column drops down, so the grid reads as two offset columns.
                className={cn(i % 2 === 1 && "md:translate-y-20")}
              >
                <ServiceOverviewCard service={s} index={i} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
        <div aria-hidden className="hidden h-20 md:block" />
      </section>

      <IntegratedDeliveryBand />
      <ServicesCTA />
    </>
  );
}
