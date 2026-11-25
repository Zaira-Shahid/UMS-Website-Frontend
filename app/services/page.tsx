import type { Metadata } from "next";
import { ServiceBand } from "@/components/services/ServiceBand";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/seo";

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

      <section aria-labelledby="services-title" className="relative isolate overflow-hidden bg-offwhite pb-14 pt-[calc(var(--header-h)+2.5rem)] md:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#00608c]">
                <span aria-hidden className="h-px w-8 bg-cyan" />
                Our Services
              </p>
              <h1 id="services-title" className="mt-5 text-[clamp(2.5rem,1.5rem+4.6vw,5.5rem)] text-navy">
                Every system a building depends on
              </h1>
            </div>
            <p className="max-w-md text-lg text-muted lg:col-span-4">
              HVAC, fire protection, electrical, plumbing and water features, delivered as individual disciplines or as one
              coordinated MEP package.
            </p>
          </div>
        </div>
      </section>

      {services.map((s, i) => (
        <ServiceBand key={s.slug} service={s} index={i} />
      ))}

      <ServicesCTA />
    </>
  );
}
