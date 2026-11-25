import { AboutSubnav } from "@/components/about/AboutSubnav";
import { PageHero } from "@/components/layout/PageHero";
import { QualityBlock } from "@/components/quality/QualityBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { SideToc } from "@/components/ui/SideToc";
import { qualitySections } from "@/content/quality";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality, Safety & Delivery",
  description:
    "How MEP work is checked, made safe and handed over: QA/QC, health and safety, inspection and testing, commissioning and handover documentation.",
  path: "/quality-safety-delivery",
});

const toc = qualitySections.map((s) => ({ id: s.id, label: s.short }));

export default function QualitySafetyDeliveryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About UMS", path: "/about" },
          { name: "Quality, Safety & Delivery", path: "/quality-safety-delivery" },
        ])}
      />
      <PageHero
        sketch="fire-fighting"
        eyebrow="Quality, Safety & Delivery"
        title="Checked, safe and handed over complete"
        intro="Quality control, safe working, testing, commissioning and handover run through the life of an MEP package. Each stage below describes in general terms what it involves."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About UMS", href: "/about" },
          { label: "Quality, Safety & Delivery" },
        ]}
        titleId="quality-title"
      />
      <AboutSubnav current="/quality-safety-delivery" />

      <div className="bg-white py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-3">
            <SideToc items={toc} title="On this page" />
          </div>
          <div className="min-w-0 lg:col-span-9">
            {qualitySections.map((s, i) => (
              <QualityBlock key={s.id} section={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
