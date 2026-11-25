import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBar } from "@/components/ui/CtaBar";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SiteImage } from "@/components/ui/SiteImage";
import { quoteHref } from "@/content/navigation";
import { servicePages } from "@/content/service-pages";
import { serviceImage } from "@/lib/service-images";
import { absoluteUrl, jsonLd, organizationRef } from "@/lib/seo";
import type { Service } from "@/types";
import { IncludedIcon } from "./IncludedIcon";
import { ServicesIntro } from "./ServicesIntro";

/** Section title with the short blue underline used on the Services pages. */
function Title({ id, children, center }: { id: string; children: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : undefined}>
      <h2 id={id} className="text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-extrabold text-navy">
        {children}
      </h2>
      <span aria-hidden className={`mt-2 block h-1 w-[4.5rem] rounded bg-blue ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

/** The one shared template behind all six /services/[slug] pages (mockup 11). */
export function ServiceTemplate({ service }: { service: Service }) {
  const url = absoluteUrl(`/services/${service.slug}`);
  const page = servicePages[service.slug];
  const heroImage = serviceImage(service.slug, "hero", page.photos.hero, page.photos.heroPosition, "");
  const includedImage = serviceImage(service.slug, "included", page.photos.included, page.photos.includedPosition, "");
  const title = service.slug === "integrated-mep" ? "Integrated MEP" : service.name;

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
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}

      <div className="bg-white pb-12 pt-[calc(var(--header-h)+1.5rem)] md:pb-16">
        <div className="wrap">
          <ServicesIntro />

          <header className="mx-auto mt-6 max-w-4xl text-center">
            <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: title }]} className="flex justify-center [&_ol]:justify-center" />
            <h1 className="mt-2 text-[clamp(2rem,1.1rem+3.2vw,3.5rem)] font-extrabold text-navy">{title}</h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-navy sm:text-xl">{page.intro}</p>
          </header>

          {/* Hero photo */}
          <figure className="mt-8">
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl bg-sky-50 md:aspect-[16/6]">
              <SiteImage asset={heroImage} fill priority sizes="(min-width: 1600px) 1500px, 96vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-center text-sm italic text-navy">
              {page.caption} · Illustrative imagery
            </figcaption>
          </figure>

          {/* Photo + What's Included */}
          <section aria-labelledby="included-title" className="mt-10 grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky-50 md:aspect-[5/4]">
              <SiteImage asset={includedImage} fill sizes="(min-width: 768px) 48vw, 96vw" className="object-cover" />
            </div>
            <div>
              <Title id="included-title">What’s Included</Title>
              <ul className="mt-5">
                {page.included.map((item) => (
                  <li key={item.text} className="flex items-center gap-4 border-b border-border py-3 last:border-b-0">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e3f1fb] text-navy">
                      <IncludedIcon name={item.icon} className="size-6" />
                    </span>
                    <span className="text-base text-navy sm:text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Scope Agreed Separately */}
          <div className="mt-8 rounded-xl bg-[#e3f1fb] px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-4 sm:w-[19rem] sm:shrink-0">
                <Target aria-hidden strokeWidth={1.5} className="size-11 shrink-0 text-navy" />
                <span aria-hidden className="hidden h-12 w-px bg-blue sm:block" />
                <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">Scope Agreed Separately</h2>
              </div>
              <p className="text-base text-navy sm:text-lg">
                Civil and structural works, utility connections and ongoing maintenance are confirmed in the project proposal.
              </p>
            </div>
          </div>
          <p className="mt-2 text-center text-sm italic text-navy">Final inclusions and exclusions are confirmed in your proposal.</p>

          {/* Typical Applications */}
          <section aria-labelledby="apps-title" className="mt-10">
            <Title id="apps-title" center>{`${title} Typical Applications`}</Title>
            <ul className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6">
              {page.applications.map((a, i) => {
                const img = serviceImage(service.slug, i === 0 ? "app-1" : "app-2", a.photo, a.position, "");
                return (
                  <li key={a.title} className="overflow-hidden rounded-card border border-blue/70 bg-white shadow-card">
                    <div className="relative aspect-[16/7] bg-sky-50">
                      <SiteImage asset={img} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-[1.375rem] font-bold text-navy sm:text-2xl">{a.title}</h3>
                      <p className="mt-1 text-base leading-snug text-navy">{a.text}</p>
                      <Link href={`/industries#${a.industry}`} className="group mt-3 inline-flex items-center gap-2 font-heading font-bold text-blue-700">
                        Learn more
                        <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-center text-sm italic text-navy">Illustrative previews</p>
          </section>

          <div className="mt-10">
            <CtaBar title={`Discuss Your ${page.ctaName} Project`} href={quoteHref({ service: service.slug })} />
          </div>

          {/* FAQ */}
          <section aria-labelledby="service-faq-title" className="mt-12">
            <Title id="service-faq-title" center>Frequently Asked Questions</Title>
            <FaqAccordion faqs={service.faqs} className="mx-auto mt-6 max-w-4xl" />
          </section>
        </div>
      </div>
    </>
  );
}
