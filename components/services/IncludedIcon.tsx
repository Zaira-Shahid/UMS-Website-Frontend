import {
  Bell, Cable, ClipboardCheck, Droplets, Fan, Filter, Flame, Gauge, HardHat, Layers, Lightbulb, Package, Ruler, Settings,
  ShieldCheck, Snowflake, Waves, Wind, Wrench, Zap, type LucideIcon,
} from "lucide-react";
import type { IncludedIconKey } from "@/content/service-pages";

const icons: Record<IncludedIconKey, LucideIcon> = {
  ruler: Ruler, package: Package, hardhat: HardHat, clipboard: ClipboardCheck, snowflake: Snowflake, wind: Wind, fan: Fan,
  droplets: Droplets, gauge: Gauge, bell: Bell, flame: Flame, waves: Waves, zap: Zap, cable: Cable, lightbulb: Lightbulb,
  shield: ShieldCheck, filter: Filter, settings: Settings, layers: Layers, wrench: Wrench,
};

/** Line icon for a "What's Included" row. Decorative. */
export function IncludedIcon({ name, className }: { name: IncludedIconKey; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}
