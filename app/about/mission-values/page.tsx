import { AboutSubnav } from "@/components/about/AboutSubnav";
import { ValueCards } from "@/components/about/ValueCards";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mission } from "@/content/about";
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
        eyebrow="Mission & Values"
        title="What guides our work"
        intro="The purpose UMS works towards and the values behind how it works."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Mission & Values" }]}
        titleId="mv-title"
      />
      <AboutSubnav current="/about/mission-values" />

      {/* Mission — dark */}
      <section aria-labelledby="mission-title" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white md:py-28">
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div id="mission-title">
            <SectionHeading tone="light" index="01" label="Our mission" title="Mission statement" />
          </div>
          <Reveal className="mt-10">
            {mission.statement ? (
              <blockquote className="border-l-4 border-cyan-300 pl-6 font-heading text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-semibold leading-snug text-white">
                {mission.statement}
              </blockquote>
            ) : (
              // TODO: client to confirm — mission statement wording
              <PendingNote label="Mission statement · to be confirmed" className="max-w-2xl">
                UMS has not yet supplied its mission statement. It will appear here, in the company&rsquo;s own words.
              </PendingNote>
            )}
          </Reveal>
        </div>
      </section>

      {/* Values — light */}
      <section aria-labelledby="values-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="values-title">
            <SectionHeading
              index="02"
              label="Our values"
              title="Values"
              description="Each value will carry its name and a short description once UMS confirms them."
            />
          </div>
          <ValueCards />
        </div>
      </section>
    </>
  );
}
