import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { CtaBar } from "@/components/ui/CtaBar";
import { SiteImage } from "@/components/ui/SiteImage";
import { photo } from "@/content/images";
import { quoteHref } from "@/content/navigation";
import { servicePages } from "@/content/service-pages";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { serviceImage } from "@/lib/service-images";
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

/** Card order and titles follow mockup 10 (the page title for Integrated MEP is the short form). */
const order = ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains"] as const;
const cardTitle = (slug: string, name: string) => (slug === "integrated-mep" ? "Integrated MEP" : name);

const circles = [photo("glassTower", "center 40%"), photo("facade"), photo("glassReflection")];

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

      <div className="bg-white pb-12 pt-[calc(var(--header-h)+1.5rem)] md:pb-16">
        <div className="wrap">
          <ServicesIntro />

          <section aria-labelledby="services-title" className="mt-8 text-center">
            <h1 id="services-title" className="text-[clamp(2.25rem,1.2rem+3.6vw,4rem)] font-extrabold text-navy">
              Our Services
            </h1>
            <span aria-hidden className="mx-auto mt-2 block h-1 w-[5.5rem] rounded bg-blue" />
            <p className="mx-auto mt-5 max-w-2xl text-lg text-navy sm:text-xl">Mechanical, electrical and plumbing services for complex buildings.</p>
          </section>

          <ul className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
            {order.map((slug, i) => {
              const s = services.find((x) => x.slug === slug)!;
              const page = servicePages[slug];
              const image = serviceImage(slug, "card", page.photos.card, page.photos.cardPosition, "");
              return (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-blue/70 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue hover:shadow-[0_18px_36px_-14px_rgb(15_42_74/0.3)] focus-visible:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative aspect-[16/6] overflow-hidden bg-sky-50">
                      <SiteImage asset={image} fill sizes="(min-width: 768px) 46vw, 92vw" priority={i < 2} className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                    </div>
                    <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                      <h2 className="text-[1.5rem] font-bold leading-tight text-navy sm:text-[1.75rem]">{cardTitle(slug, s.name)}</h2>
                      <p className="mt-1 text-base text-navy sm:text-[1.0625rem]">{page.cardLine}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 font-heading font-bold text-blue-700">
                        Explore Service
                        <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <section aria-labelledby="experience-title" className="mt-12 text-center">
            <h2 id="experience-title" className="text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-extrabold text-navy">
              Explore Our Project Experience
            </h2>
            <span aria-hidden className="mx-auto mt-2 block h-1 w-[4.5rem] rounded bg-blue" />
            <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-3 sm:gap-8">
              <ul className="flex shrink items-center justify-center gap-3 sm:gap-8">
                {circles.map((c, i) => (
                  <li key={i} className="relative size-[clamp(5rem,24vw,8.5rem)] shrink-0 overflow-hidden rounded-full border-2 border-blue/70">
                    <SiteImage asset={{ ...c, alt: "" }} fill sizes="140px" className="object-cover" />
                  </li>
                ))}
              </ul>
              <span aria-hidden className="hidden h-20 w-px bg-blue/60 sm:block" />
              <Link href="/projects" className="group hidden items-center gap-2 font-heading text-xl font-bold text-blue-700 sm:inline-flex">
                View Projects
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
            <Link href="/projects" className="group mt-4 inline-flex items-center gap-2 font-heading text-lg font-bold text-blue-700 sm:hidden">
              View Projects
              <ArrowRight aria-hidden className="size-5" />
            </Link>
            <p className="mt-3 text-sm italic text-muted">Illustrative imagery</p>
          </section>

          <div className="mt-10">
            <CtaBar title="Let’s Discuss Your Project" href={quoteHref()} />
          </div>
        </div>
      </div>
    </>
  );
}
