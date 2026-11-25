import { ClipboardCheck, FileSearch, HardHat, Layers, type LucideIcon } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { ProjectBand } from "@/components/ui/ProjectBand";
import { capabilities, type CapabilityIcon } from "@/content/about";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Capabilities",
  description: "Engineering and delivery capabilities at UMS: tender and planning, design and coordination, procurement and installation, quality and commissioning.",
  path: "/about/capabilities",
});

const icons: Record<CapabilityIcon, LucideIcon> = { tender: FileSearch, coordination: Layers, install: HardHat, quality: ClipboardCheck };

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About UMS", path: "/about" },
          { name: "Capabilities", path: "/about/capabilities" },
        ])}
      />
      <PageBanner
        title="Capabilities"
        intro="How the work is planned, coordinated and delivered."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Capabilities" }]}
        titleId="cap-title"
      />
      <section aria-labelledby="cap-heading" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="cap-heading" lead="Engineering & Delivery Capabilities" />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
            {capabilities.map((c) => {
              const Icon = icons[c.icon];
              return (
                <li key={c.title} className="flex items-stretch overflow-hidden rounded-card border border-blue/30 bg-white shadow-card">
                  <div aria-hidden className="flex w-32 shrink-0 items-center justify-center bg-gradient-to-br from-[#e3f1fb] to-[#cfe6f7] sm:w-44">
                    <Icon strokeWidth={1.4} className="size-14 text-blue-700 sm:size-16" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-[1.5rem] font-extrabold leading-tight text-navy sm:text-[1.75rem]">{c.title}</h3>
                    <p className="mt-2 text-base leading-snug text-navy sm:text-lg">{c.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <ProjectBand />
    </>
  );
}
