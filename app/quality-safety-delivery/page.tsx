import { QualityBlock } from "@/components/quality/QualityBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { qualitySections } from "@/content/quality";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality, Safety & Delivery",
  description: "How MEP work is checked, made safe and handed over: QA/QC, health and safety, inspection and testing, commissioning and handover documentation.",
  path: "/quality-safety-delivery",
});

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
      <PageBanner
        title="Quality, Safety & Delivery"
        intro="Quality control, safe working, testing, commissioning and handover run through the life of an MEP package. Each stage describes in general terms what it involves."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Quality, Safety & Delivery" }]}
        titleId="quality-title"
      />
      <section aria-labelledby="stages-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="stages-title" lead="Stage by" accent="Stage" />
          <nav aria-label="On this page" className="mt-6">
            <ul className="flex flex-wrap justify-center gap-2">
              {qualitySections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="inline-block rounded-full border border-blue-700 px-4 py-1.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white">
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 space-y-5">
            {qualitySections.map((s, i) => (
              <QualityBlock key={s.id} section={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
