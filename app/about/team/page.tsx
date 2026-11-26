import { notFound } from "next/navigation";
import { ClipboardCheck, Compass, HardHat, Briefcase, ShieldPlus, Users, type LucideIcon } from "@/components/ui/lucide";
import Image from "@/components/ui/StaticImage";
import { PageBanner } from "@/components/ui/PageBanner";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { controlFunctions, people, showTeamPage } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Team & Project Controls",
  description: "The project controls behind UMS projects, and the people who lead them.",
  path: "/about/team",
  noindex: !showTeamPage,
});

const icons: Record<string, LucideIcon> = { hardhat: HardHat, clipboard: ClipboardCheck, shield: ShieldPlus, compass: Compass, toolbox: Briefcase };

/**
 * Team page (mockup 16). Hidden (404) and unlinked until `showTeamPage` is switched on in content/team.ts and real
 * people are added: no placeholder people are ever shown.
 */
export default function TeamPage() {
  if (!showTeamPage) notFound();
  return (
    <>
      <PageBanner title="Our Team" intro="The project controls behind our work." crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Team" }]} titleId="team-title" />
      <section aria-labelledby="controls-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="controls-title" lead="Our Team & Project Controls" />
          <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl bg-navy-950 px-8 py-5 text-white">
            <Users aria-hidden className="size-10 text-cyan" />
            <p className="font-heading text-2xl font-bold">Project Management</p>
          </div>
          <span aria-hidden className="mx-auto block h-8 w-0.5 bg-cyan" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {controlFunctions.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.title} className="rounded-2xl bg-[#e3f1fb] p-5 text-center">
                  <Icon aria-hidden strokeWidth={1.5} className="mx-auto size-12 text-navy" />
                  <h3 className="mt-3 text-xl font-bold text-navy">{f.title}</h3>
                  <p className="mt-1 text-base text-navy">{f.text}</p>
                </li>
              );
            })}
          </ul>
          {people.length > 0 && (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {people.map((p) => (
                <li key={p.name} className="text-center">
                  <Image src={p.photo} alt={p.name} width={320} height={320} className="mx-auto size-40 rounded-full object-cover" />
                  <h3 className="mt-3 text-lg font-bold text-navy">{p.name}</h3>
                  <p className="text-muted">{p.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
