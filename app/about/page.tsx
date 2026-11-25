import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AboutSubnav } from "@/components/about/AboutSubnav";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { disciplineColor } from "@/lib/discipline";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About UMS",
  description:
    "About UMS — Ultimate Mechanical Solutions: MEP contracting for complex buildings, with offices in Islamabad and Lahore.",
  path: "/about",
});

const explore = [
  { href: "/about/mission-values", title: "Mission & Values", text: "What guides the work." },
  { href: "/quality-safety-delivery", title: "Quality, Safety & Delivery", text: "How MEP work is checked, made safe and handed over." },
  { href: "/industries", title: "Industries", text: "The sectors the disciplines serve." },
  { href: "/projects", title: "Projects", text: "Selected projects." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About UMS", path: "/about" }])} />
      <PageHero
        sketch="integrated-mep"
        eyebrow="About UMS"
        title="Ultimate Mechanical Solutions"
        intro={site.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS" }]}
        titleId="about-title"
      />
      <AboutSubnav current="/about" />

      {/* Who we are: a statement and two facts */}
      <section aria-labelledby="who-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <div id="who-title">
              <SectionHeading index="01" label="Who we are" title="MEP contracting for complex buildings" />
            </div>
            <Reveal className="mt-8 space-y-5 text-lg text-ink">
              <p>
                UMS delivers the services that make a building work: air conditioning and ventilation, fire protection,
                electrical and low-voltage systems, plumbing and public health, and pools and fountains.
              </p>
              <p>
                They can be delivered as separate packages or as one integrated MEP scope, planned and coordinated
                together from tender review through to handover.
              </p>
            </Reveal>
          </div>
          <Reveal className="min-w-0 lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-muted">Service disciplines</dt>
                <dd className="font-heading text-3xl font-bold tabular-nums text-navy">{services.length}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-muted">Offices</dt>
                <dd className="text-right text-navy">Islamabad and Lahore</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* What we do: the disciplines as a ruled list */}
      <section aria-labelledby="do-title" className="bg-navy-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="do-title">
            <SectionHeading
              tone="light"
              index="02"
              label="What we do"
              title="Six disciplines, delivered separately or together"
              description="Each service has its own page with the systems it covers, how it works and typical applications."
            />
          </div>
          <ol className="mt-12 divide-y divide-white/15 border-y border-white/15">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[auto_20rem_1fr_auto]"
                >
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: disciplineColor[s.slug] }} />
                  <span className="font-heading text-xl font-bold uppercase text-white">{s.name}</span>
                  <span className="col-span-2 col-start-2 row-start-2 text-white/65 sm:col-span-1 sm:col-start-3 sm:row-start-1">{s.tagline}</span>
                  <ArrowUpRight aria-hidden className="size-5 text-white/50 transition-colors group-hover:text-cyan-300" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Explore */}
      <section aria-labelledby="explore-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="explore-title">
            <SectionHeading index="03" label="Explore" title="More about UMS" />
          </div>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {explore.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="group grid items-center gap-x-8 gap-y-1 py-6 sm:grid-cols-[22rem_1fr_auto]">
                  <span className="font-heading text-2xl font-bold uppercase text-navy transition-colors group-hover:text-blue-700">{e.title}</span>
                  <span className="text-muted">{e.text}</span>
                  <ArrowUpRight aria-hidden className="hidden size-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
