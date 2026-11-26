"use client";

import dynamic from "next/dynamic";
import { whenReady } from "@/lib/hydration-gate";

/**
 * Sections below the first screen, wrapped so that their code loads and they hydrate only when the visitor is about to reach
 * them (first scroll, tap or key press, or a few seconds after load; see lib/hydration-gate.ts). The server still renders their
 * full HTML, so they look and read exactly the same before and after; they just come alive a little later. This keeps the
 * first seconds of the page free for painting.
 */
export const ServicesTickerIsland = dynamic(() => whenReady().then(() => import("./ServicesTicker")).then((m) => m.ServicesTicker));

export const FeaturedProjectsIsland = dynamic(() => whenReady().then(() => import("./FeaturedProjects")).then((m) => m.FeaturedProjects));

export const FaqAccordionIsland = dynamic(() => whenReady().then(() => import("@/components/ui/FaqAccordion")).then((m) => m.FaqAccordion));
