import { Award, Handshake, HardHat, Layers, Ruler, ShieldCheck, type LucideIcon } from "@/components/ui/lucide";
import { JsonLd } from "@/components/seo/JsonLd";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { mission, valueIcons, values } from "@/content/about";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mission & Values",
  description: "The mission and values that guide UMS — Ultimate Mechanical Solutions — in its MEP contracting work.",
  path: "/about/mission-values",
});

const icons: Record<string, LucideIcon> = { ruler: Ruler, hardhat: HardHat, shield: ShieldCheck, handshake: Handshake, layers: Layers, award: Award };

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
      <PageBanner
        title="Mission & Values"
        intro="The purpose UMS works towards and the values behind how it works."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Mission & Values" }]}
        titleId="mv-title"
      />

      <section aria-labelledby="mission-title" className="bg-white bg-[linear-gradient(rgb(27_166_232/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(27_166_232/0.06)_1px,transparent_1px)] bg-[size:48px_48px] py-12 md:py-16">
        <div className="wrap max-w-4xl text-center">
          <CenterTitle id="mission-title" lead="Our" accent="Mission" />
          <p className="mt-6 text-lg leading-relaxed text-navy md:text-2xl md:leading-relaxed">{mission.statement}</p>
        </div>
      </section>

      <section aria-labelledby="vision-title" className="bg-navy-950 bg-[linear-gradient(rgb(27_166_232/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(27_166_232/0.1)_1px,transparent_1px)] bg-[size:48px_48px] py-12 text-white md:py-16">
        <div className="wrap max-w-4xl text-center">
          <CenterTitle id="vision-title" lead="Our" accent="Vision" tone="dark" />
          <p className="mt-6 text-lg leading-relaxed text-white md:text-2xl md:leading-relaxed">{mission.vision}</p>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="values-title" lead="Core" accent="Values" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
            {values.map((v) => {
              const Icon = icons[valueIcons[v.title] ?? "shield"];
              return (
                <li key={v.title} className="flex items-center gap-5 rounded-2xl bg-[#e3f1fb] p-5 md:p-6">
                  <div className="flex w-28 shrink-0 flex-col items-center gap-2 text-center sm:w-36">
                    <h3 className="text-[1.25rem] font-bold text-navy">{v.title}</h3>
                    <Icon aria-hidden strokeWidth={1.5} className="size-12 text-blue-700" />
                  </div>
                  <p className="border-l-2 border-blue pl-5 text-base leading-snug text-navy md:text-lg">{v.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
