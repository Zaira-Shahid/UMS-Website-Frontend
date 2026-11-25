import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OfficeCard } from "@/components/about/OfficeCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { ProjectBand } from "@/components/ui/ProjectBand";
import { ServiceCard } from "@/components/ui/Card";
import { serviceLabel } from "@/content/service-labels";
import { services } from "@/content/services";
import { contact } from "@/content/site";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About UMS",
  description: "About UMS — Ultimate Mechanical Solutions: MEP contracting for complex buildings, with offices in Islamabad and Lahore.",
  path: "/about",
});

const explore = [
  { href: "/about/mission-values", title: "Mission & Values", text: "What guides our work." },
  { href: "/about/capabilities", title: "Capabilities", text: "How the work is planned and delivered." },
  { href: "/quality-safety-delivery", title: "Quality, Safety & Delivery", text: "How MEP work is checked, made safe and handed over." },
  { href: "/industries", title: "Industries", text: "The sectors our disciplines serve." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About UMS", path: "/about" }])} />
      <PageBanner title="About UMS" intro="MEP contracting for complex buildings." crumbs={[{ label: "Home", href: "/" }, { label: "About UMS" }]} titleId="about-title" art>
        <Button href="/projects" size="lg">
          Explore Projects
        </Button>
      </PageBanner>

      <section aria-labelledby="who-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="who-title" lead="Who We Are" />
          <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed text-navy md:text-xl">
            Ultimate Mechanical Solutions (UMS) is a mechanical, electrical and plumbing contractor. We coordinate HVAC, fire protection, plumbing, electrical and ELV, and pools and fountains work, delivered
            separately or as one integrated scope.
          </p>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {contact.offices.map((o) => (
              <li key={o.city}>
                <OfficeCard office={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="do-title" className="bg-[#f2f7fb] py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="do-title" lead="What We" accent="Do" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-navy">Six disciplines, delivered separately or together.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard slug={s.slug} label={serviceLabel[s.slug]} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="explore-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="explore-title" lead="More About" accent="UMS" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {explore.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-card border border-blue/70 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span>
                    <span className="block font-heading text-xl font-bold text-navy">{e.title}</span>
                    <span className="mt-1 block text-base text-navy">{e.text}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-6 shrink-0 text-blue-700 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectBand />
    </>
  );
}
