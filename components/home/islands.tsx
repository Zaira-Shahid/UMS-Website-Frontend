"use client";

import dynamic from "next/dynamic";
import { Defer } from "@/components/ui/Defer";
import type { ComponentProps } from "react";

/**
 * Interactive parts of the homepage, each wrapped so that its code loads and it hydrates only when it is about to scroll into
 * view (see components/ui/Defer.tsx). The server still renders their full HTML, so they look and read exactly the same before
 * and after; they just come alive a little later. This keeps the first seconds of the page free for painting.
 */
const Ticker = dynamic(() => import("./ServicesTicker").then((m) => m.ServicesTicker));
const Featured = dynamic(() => import("./FeaturedProjects").then((m) => m.FeaturedProjects));
const Faq = dynamic(() => import("@/components/ui/FaqAccordion").then((m) => m.FaqAccordion));
const Centre = dynamic(() => import("./ClientsCentre").then((m) => m.ClientsCentre));

export const ServicesTickerIsland = () => (
  <Defer>
    <Ticker />
  </Defer>
);
export const FeaturedProjectsIsland = () => (
  <Defer>
    <Featured />
  </Defer>
);
export const FaqAccordionIsland = (props: ComponentProps<typeof Faq>) => (
  <Defer>
    <Faq {...props} />
  </Defer>
);
export const ClientsCentreIsland = (props: ComponentProps<typeof Centre>) => (
  <Defer>
    <Centre {...props} />
  </Defer>
);
