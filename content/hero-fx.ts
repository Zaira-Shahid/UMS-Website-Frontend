import type { ServiceSlug } from "@/types";

/**
 * Positions for the animated effects on the hero building (components/home/HeroFx.tsx). Everything is a percentage of
 * the picture, so the effects scale with it. The desktop and the mobile artwork are different drawings, so each has its
 * own set. The node positions were found by detecting the purple junction circles in the two images.
 */
export interface Pt {
  x: number;
  y: number;
}
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface FxSet {
  /** Purple junction circles (Integrated MEP). */
  nodes: Pt[];
  /** The fountain jets: a droplet animation runs inside this box. */
  fountain: Box;
  /** The rooftop HVAC units: a very faint glint runs across each. */
  roof: Box[];
}

export const heroFx: { desktop: FxSet; mobile: FxSet } = {
  desktop: {
    nodes: [
      { x: 27.5, y: 20.5 },
      { x: 27.6, y: 40.3 },
      { x: 27.6, y: 61.4 },
      { x: 52.9, y: 17.4 },
      { x: 52.9, y: 37.9 },
      { x: 52.9, y: 57.6 },
      { x: 66.1, y: 19.9 },
      { x: 66.1, y: 39.4 },
      { x: 65.8, y: 58.2 },
      { x: 66.1, y: 75.4 },
      { x: 66.1, y: 88.1 },
    ],
    fountain: { x: 44.8, y: 77.7, w: 9.2, h: 13.7 },
    roof: [
      { x: 43.6, y: 0.8, w: 14.9, h: 12.5 },
      { x: 62, y: 4.3, w: 9.5, h: 10.9 },
      { x: 78.1, y: 11.1, w: 9, h: 6.1 },
    ],
  },
  mobile: {
    nodes: [
      { x: 35, y: 74.7 },
      { x: 42, y: 53.9 },
      { x: 42.3, y: 33.8 },
      { x: 65.9, y: 15.4 },
      { x: 65.9, y: 37.1 },
      { x: 65.9, y: 55.6 },
      { x: 66, y: 73.1 },
    ],
    fountain: { x: 74.1, y: 74.9, w: 10, h: 13.6 },
    roof: [
      { x: 52.2, y: 0.5, w: 10, h: 10 },
      { x: 63.1, y: 0, w: 9.6, h: 12.9 },
      { x: 76, y: 7.1, w: 5.2, h: 10.2 },
    ],
  },
};

/**
 * The five flowing systems. `key` picks the mask (public/images/hero/masks/<slug>[-mobile].png) and the CSS class;
 * `color` is the light that runs through it; `dur` is one full pass in seconds and `delay` offsets it so the systems never
 * pulse together; `axis` is the direction of the flow.
 */
export const heroFlows: { slug: ServiceSlug; key: string; color: string; dur: number; delay: number; axis: "x" | "y" }[] = [
  { slug: "hvac", key: "hvac", color: "#7ff4ff", dur: 8, delay: -1, axis: "x" },
  { slug: "plumbing", key: "plumbing", color: "#6af5dc", dur: 6, delay: -3.5, axis: "y" },
  { slug: "fire-fighting", key: "fire", color: "#ff7b7b", dur: 6, delay: -0.5, axis: "x" },
  { slug: "electrical-elv", key: "electrical", color: "#ffe27a", dur: 4, delay: -2.2, axis: "x" },
  { slug: "integrated-mep", key: "mep", color: "#cf9bff", dur: 5, delay: -4, axis: "x" },
];
