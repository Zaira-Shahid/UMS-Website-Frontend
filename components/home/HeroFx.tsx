import { heroFlows, heroFx, type Box, type FxSet } from "@/content/hero-fx";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

/** Droplets of the fountain: horizontal position inside the jets box (%), pass time (s) and start offset (s). */
const drops = [
  { x: 12, dur: 1.9, delay: -0.2 },
  { x: 26, dur: 2.3, delay: -1.4 },
  { x: 38, dur: 1.7, delay: -0.8 },
  { x: 50, dur: 2.1, delay: -1.9 },
  { x: 62, dur: 1.8, delay: -0.5 },
  { x: 74, dur: 2.4, delay: -1.2 },
  { x: 86, dur: 2, delay: -1.7 },
];

const boxStyle = (b: Box) => ({ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` });

/** "off" when another system is chosen (it stops and fades), "boost" when this one is chosen. */
const state = (active: ServiceSlug | null, mine: ServiceSlug) => (active ? (active === mine ? "hero-fx--boost" : "hero-fx--off") : undefined);

function Marks({ set, className, active }: { set: FxSet; className: string; active: ServiceSlug | null }) {
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      {/* Purple junction circles: a small dot with a soft ring that grows and fades, staggered */}
      {set.nodes.map((n, i) => (
        <span key={i} className={cn("hero-node", state(active, "integrated-mep"))} style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${(i % 6) * -0.4}s` }} />
      ))}
      {/* Fountain: droplets rising and fading inside the jets box */}
      <div className={cn("absolute", state(active, "pools-fountains"))} style={boxStyle(set.fountain)}>
        {drops.map((d, i) => (
          <span key={i} className="hero-drop" style={{ left: `${d.x}%`, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
        ))}
      </div>
      {/* Rooftop HVAC units: a very faint glint passes across each */}
      {set.roof.map((b, i) => (
        <div key={i} className={cn("hero-glint", state(active, "hvac"))} style={{ ...boxStyle(b), ["--delay" as string]: `${-1.3 * i - 0.6}s` }}>
          <span className="hero-flow__band" style={{ ["--c" as string]: "#ffffff", ["--dur" as string]: "5.5s" }} />
        </div>
      ))}
    </div>
  );
}

/**
 * Light that appears to flow through the building's systems, built from the same pre-cut masks as the chip highlight.
 * Each system is a layer whose shape is its mask; a bright band in the system's colour slides through it (transform only).
 * Timings differ per system (HVAC 8s, plumbing 6s, fire 6s, electrical 4s, MEP 5s) and are offset so they never pulse in
 * step. When a chip is pressed, the other systems stop and fade and the chosen one flows brighter and faster. All of it sits
 * inside the picture's own box with percentage positions, so it scales with the picture. It is hidden with reduced motion
 * and paused off-screen or in a hidden tab (see globals.css).
 */
export function HeroFx({ active }: { active: ServiceSlug | null }) {
  return (
    <div aria-hidden className="hero-fx pointer-events-none absolute inset-0">
      {heroFlows.map((f) => (
        <div
          key={f.key}
          className={cn("hero-flow", `hero-flow--${f.key}`, f.axis === "y" && "hero-flow--y", active && (active === f.slug ? "hero-flow--boost" : "hero-flow--off"))}
          style={{ ["--c" as string]: f.color, ["--dur" as string]: `${f.dur}s`, ["--delay" as string]: `${f.delay}s` }}
        >
          <span className="hero-flow__band" />
        </div>
      ))}
      {/* the effect sets differ because the desktop and mobile artwork are different drawings */}
      <Marks set={heroFx.desktop} className="max-lg:hidden" active={active} />
      <Marks set={heroFx.mobile} className="lg:hidden" active={active} />
    </div>
  );
}
