import { PageHero } from "@/components/layout/PageHero";
import { SectorSection } from "@/components/industries/SectorSection";
import { SectorSwitcher } from "@/components/industries/SectorSwitcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries } from "@/content/industries";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Healthcare, commercial and retail, residential and mixed-use, hospitality, education and institutional, industrial and warehousing: the MEP services each sector typically needs.",
  path: "/industries",
});

const sectors = industries.map((i) => ({ id: i.slug, label: i.name }));

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <PageHero
        sketch="integrated-mep"
        eyebrow="Industries"
        title="Buildings that depend on their services"
        intro="Six sectors, each with its own demands, and the services each typically needs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        titleId="industries-title"
      />
      <SectorSwitcher sectors={sectors} />
      {industries.map((i, idx) => (
        <SectorSection key={i.slug} industry={i} index={idx} />
      ))}
    </>
  );
}
