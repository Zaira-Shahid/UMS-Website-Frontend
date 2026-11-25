import type { IndustrySlug, ServiceSlug } from "@/types";

/* Homepage content (PROJECT_SPEC.md section 5). Copy is general and makes no factual claims about UMS. */

/** Order of the services slider (mockup 01 starts with HVAC). */
export const sliderOrder: ServiceSlug[] = ["hvac", "fire-fighting", "plumbing", "electrical-elv", "pools-fountains", "integrated-mep"];

/** Concise, non-factual one-liners for the slider. */
export const sliderLine: Record<ServiceSlug, string> = {
  hvac: "Comfort, air quality and plant that runs efficiently.",
  "fire-fighting": "Life-safety systems tested and documented.",
  plumbing: "Water in, waste out, and everything between.",
  "electrical-elv": "Power distribution and low-voltage systems, coordinated.",
  "pools-fountains": "Water features built to run reliably.",
  "integrated-mep": "One coordinated package for every building service.",
};

/** Slider titles (mockup 01 shows "Fire Fighting & Protection"). */
export const sliderTitle: Record<ServiceSlug, string> = {
  hvac: "HVAC Systems",
  "fire-fighting": "Fire Fighting & Protection",
  plumbing: "Plumbing & Public Health",
  "electrical-elv": "Electrical & ELV",
  "pools-fountains": "Pools & Fountains",
  "integrated-mep": "Integrated MEP Solutions",
};

/** Slider illustrations from the design pack. The other services show their icon large until artwork is supplied. */
export const sliderArt: Partial<Record<ServiceSlug, { src: string; width: number; height: number }>> = {
  hvac: { src: "/images/services/hvac.png", width: 620, height: 265 },
  "fire-fighting": { src: "/images/services/fire-fighting.png", width: 175, height: 185 },
};

/** How We Deliver (mockup 03). */
export const deliverySteps = [
  { id: "planning", title: "Planning", text: "Define requirements and develop the system design.", image: "/images/delivery/01-planning.png", width: 310, height: 192 },
  { id: "coordination", title: "Coordination", text: "Align design, stakeholders, and site readiness.", image: "/images/delivery/02-coordination.png", width: 235, height: 192 },
  { id: "installation", title: "Installation", text: "Install mechanical systems safely and to specification.", image: "/images/delivery/03-installation.png", width: 270, height: 207 },
  { id: "testing", title: "Testing", text: "Test, verify, and commission for reliable performance.", image: "/images/delivery/04-testing.png", width: 210, height: 202 },
  { id: "handover", title: "Handover", text: "Provide documentation and a smooth project handover.", image: "/images/delivery/05-handover.png", width: 245, height: 192 },
] as const;

/** Sector tabs on Featured Projects (mockup 04), each mapped to an industry. */
export const featuredSectors: { label: string; industry: IndustrySlug }[] = [
  { label: "Healthcare", industry: "healthcare" },
  { label: "Commercial & Retail", industry: "commercial-retail" },
  { label: "Residential", industry: "residential-mixed-use" },
  { label: "Institutional", industry: "education-institutional" },
];
