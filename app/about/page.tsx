import Link from "next/link";
import { ArrowUpRight, Award, ClipboardCheck, Target, Users } from "lucide-react";
import { AboutSubnav } from "@/components/about/AboutSubnav";
import { Timeline } from "@/components/about/Timeline";
import { OfficeCard } from "@/components/contact/OfficeCard";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offices } from "@/content/offices";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About UMS",
  description:
    "About UMS — Ultimate Mechanical Solutions: MEP contracting for complex buildings, with offices in Islamabad and Lahore.",
  path: "/about",
});

const explore = [
  { href: "/about/mission-values", title: "Mission & Values", text: "What guides our work.", icon: Target },
  { href: "/about/team", title: "Team & Organization", text: "How UMS is organised and who leads it.", icon: Users },
  { href: "/about/credentials", title: "Credentials", text: "Registrations and certifications.", icon: Award },
  { href: "/quality-safety-delivery", title: "Quality, Safety & Delivery", text: "How work is checked, made safe and handed over.", icon: ClipboardCheck },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About UMS", path: "/about" }])} />
      <PageHero
        eyebrow="About UMS"
        title="Ultimate Mechanical Solutions"
        intro={site.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS" }]}
        titleId="about-title"
      />
      <AboutSubnav current="/about" />

      {/* Who we are — light */}
      <section aria-labelledby="who-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div id="who-title">
              <SectionHeading index="01" label="Who we are" title="MEP contracting for complex buildings" />
            </div>
            <Reveal className="mt-8 space-y-5 text-lg text-ink">
              <p>{site.description}</p>
              {/* TODO: client to confirm — company history, founding and growth */}
              <PendingNote label="Company story · to be confirmed">
                How UMS started, how it has grown and what it is proud of will be written here once UMS supplies it.
              </PendingNote>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-muted">Service disciplines</dt>
                <dd className="font-heading text-3xl font-bold tabular-nums text-navy">{services.length}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-muted">Offices</dt>
                <dd className="text-right text-navy">Islamabad and Lahore</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-muted">PEC registration</dt>
                <dd>
                  <Badge tone="pending">To be confirmed</Badge>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* What we do — dark */}
      <section aria-labelledby="do-title" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white md:py-28">
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div id="do-title">
            <SectionHeading
              tone="light"
              index="02"
              label="What we do"
              title="Six disciplines, delivered separately or together"
              description="Each service has its own page, with the systems it covers, typical applications and answers to common questions."
            />
          </div>
          <Reveal stagger as="ul" className="mt-12 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug} as="li" className="bg-navy-900">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-white/[0.05]"
                >
                  <span>
                    <span className="block font-heading text-xl font-bold uppercase text-white">{s.name}</span>
                    <span className="mt-2 block text-white/70">{s.tagline}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300">
                    View service
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Offices — light */}
      <section aria-labelledby="offices-title" className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="offices-title">
            <SectionHeading index="03" label="Offices" title="Islamabad and Lahore" description="Two offices, one team. Contact details are added as UMS confirms them." />
          </div>
          <Reveal stagger as="div" className="mt-12 grid gap-6 md:grid-cols-2">
            {offices.map((o) => (
              <RevealItem key={o.city}>
                <OfficeCard office={o} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Story / timeline — white */}
      <section aria-labelledby="story-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="story-title">
            <SectionHeading index="04" label="Our story" title="Milestones" description="The company's key moments, once UMS confirms them." />
          </div>
          <Timeline />
        </div>
      </section>

      {/* Explore — light */}
      <section aria-labelledby="explore-title" className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="explore-title">
            <SectionHeading index="05" label="Explore" title="More about UMS" />
          </div>
          <Reveal stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {explore.map((e) => (
              <RevealItem key={e.href} as="li">
                <Link
                  href={e.href}
                  className="group flex h-full flex-col border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-cyan hover:shadow-[0_12px_32px_-16px_rgb(11_34_54/0.3)]"
                >
                  <e.icon aria-hidden className="size-8 text-cyan" />
                  <span className="mt-5 block font-heading text-lg font-bold uppercase text-navy">{e.title}</span>
                  <span className="mt-2 block flex-1 text-muted">{e.text}</span>
                  <ArrowUpRight aria-hidden className="mt-5 size-5 text-cyan transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
