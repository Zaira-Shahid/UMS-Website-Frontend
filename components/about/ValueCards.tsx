import { Compass, Gauge, Lightbulb, ShieldCheck, Users, Wrench, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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

/**
 * Values as icon cards. UMS has not supplied its values, so the names and descriptions are
 * placeholders; the icons are neutral decoration (TODO: client to confirm — content/about.ts).
 */
export function ValueCards() {
  return (
    <Reveal stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((v, i) => {
        const Icon = icons[v.icon];
        return (
          <RevealItem key={i} as="li">
            <article className="h-full border border-line bg-white p-6 transition-shadow hover:shadow-[0_12px_32px_-16px_rgb(11_34_54/0.3)]">
              <span className="flex size-12 items-center justify-center border border-cyan/40 text-cyan">
                <Icon aria-hidden className="size-6" />
              </span>
              {v.title ? (
                <>
                  <h3 className="mt-5 text-navy">{v.title}</h3>
                  {v.description && <p className="mt-2 text-muted">{v.description}</p>}
                </>
              ) : (
                <div className="mt-5">
                  <Badge tone="pending">Value {i + 1} · to be confirmed</Badge>
                  <p className="mt-3 text-sm text-muted">
                    The name and meaning of this value will be added once UMS confirms its values.
                  </p>
                </div>
              )}
            </article>
          </RevealItem>
        );
      })}
    </Reveal>
  );
}
