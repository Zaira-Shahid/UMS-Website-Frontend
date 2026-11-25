import { AboutSubnav } from "@/components/about/AboutSubnav";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mission, values } from "@/content/about";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mission & Values",
  description: "The mission and values that guide UMS — Ultimate Mechanical Solutions — in its MEP contracting work.",
  path: "/about/mission-values",
});

export default function MissionValuesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About UMS", path: "/about" },
          { name: "Mission & Values", path: "/about/mission-values" },
        ])}
      />
      <PageHero
        sketch="integrated-mep"
        eyebrow="Mission & Values"
        title="What guides our work"
        intro="The purpose UMS works towards and the values behind how it works."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Mission & Values" }]}
        titleId="mv-title"
      />
      <AboutSubnav current="/about/mission-values" />

      {/* Mission: dark statement */}
      <section aria-labelledby="mission-title" className="bg-navy-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div id="mission-title">
            <SectionHeading tone="light" index="01" label="Our mission" title="Mission statement" />
          </div>
          <Reveal className="mt-10">
            <blockquote className="font-heading text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold leading-snug text-white">
              {mission.statement}
            </blockquote>
            <p className="mt-8 max-w-3xl text-lg text-white/75">
              <span className="mono-label mb-2 block text-cyan-300">Our vision</span>
              {mission.vision}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values: an open, numbered list */}
      <section aria-labelledby="values-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="values-title">
            <SectionHeading
              index="02"
              label="Our values"
              title="Values"
              description="Six commitments that shape how building services are planned, built and handed over."
            />
          </div>
          <Reveal stagger as="ol" className="mt-12 grid grid-cols-1 gap-x-12 border-t-2 border-navy sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <RevealItem key={v.title} as="li" className="border-b border-line py-8">
                <span className="mono-label text-[#00608c] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-navy">{v.title}</h3>
                <p className="mt-2 text-muted">{v.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
