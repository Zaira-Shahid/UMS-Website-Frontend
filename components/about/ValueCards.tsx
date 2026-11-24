import { Compass, Gauge, Lightbulb, ShieldCheck, Users, Wrench, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { values, type ValueIcon } from "@/content/about";

const icons: Record<ValueIcon, LucideIcon> = {
  compass: Compass,
  shield: ShieldCheck,
  users: Users,
  lightbulb: Lightbulb,
  gauge: Gauge,
  wrench: Wrench,
};

/** Values as icon cards. */
export function ValueCards() {
  return (
    <Reveal stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((v) => {
        const Icon = icons[v.icon];
        return (
          <RevealItem key={v.title} as="li">
            <article className="h-full border border-line bg-white p-6 transition-shadow hover:shadow-[0_12px_32px_-16px_rgb(11_34_54/0.3)]">
              <span className="flex size-12 items-center justify-center border border-cyan/40 text-cyan">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-navy">{v.title}</h3>
              <p className="mt-2 text-muted">{v.description}</p>
            </article>
          </RevealItem>
        );
      })}
    </Reveal>
  );
}
