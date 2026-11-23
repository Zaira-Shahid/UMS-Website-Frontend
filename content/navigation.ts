import type { NavItem } from "@/types";
import { services } from "./services";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About UMS",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", description: "Who we are and where we work." },
      {
        label: "Mission & Values",
        href: "/about/mission-values",
        description: "What guides our work.",
      },
      {
        label: "Team & Organization",
        href: "/about/team",
        description: "How UMS is organised.",
      },
      {
        label: "Quality, Safety & Delivery",
        href: "/quality-safety-delivery",
        description: "QA/QC, HSE and handover.",
      },
      {
        label: "Credentials",
        href: "/about/credentials",
        description: "Registrations and certifications.",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
      description: s.tagline,
    })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const quoteHref = (params?: { service?: string; project?: string }) => {
  const q = new URLSearchParams();
  if (params?.service) q.set("service", params.service);
  if (params?.project) q.set("project", params.project);
  const qs = q.toString();
  return `/request-a-quote${qs ? `?${qs}` : ""}`;
};
