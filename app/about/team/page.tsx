import { AboutSubnav } from "@/components/about/AboutSubnav";
import { LeadershipCards } from "@/components/about/LeadershipCards";
import { OrgDiagram } from "@/components/about/OrgDiagram";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Team & Organization",
  description: "How UMS — Ultimate Mechanical Solutions — is organised across its Islamabad and Lahore offices, and who leads it.",
  path: "/about/team",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About UMS", path: "/about" },
          { name: "Team & Organization", path: "/about/team" },
        ])}
      />
      <PageHero
        eyebrow="Team & Organization"
        title="The people behind the work"
        intro="How UMS is organised across its offices, and the people who lead it."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Team & Organization" }]}
        titleId="team-title"
      />
      <AboutSubnav current="/about/team" />

      <section aria-labelledby="org-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="org-title">
            <SectionHeading index="01" label="Organization" title="How UMS is organised" />
          </div>
          <Reveal className="mt-12">
            <OrgDiagram />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="leaders-title" className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="leaders-title">
            <SectionHeading
              index="02"
              label="Leadership"
              title="Leadership team"
              description="The people who lead delivery, quality and safety across every UMS project."
            />
          </div>
          <LeadershipCards />
        </div>
      </section>
    </>
  );
}
