import type { NavItem } from "@/types";
import { projects } from "./projects";
import { services } from "./services";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", description: "Who we are and where we work." },
      {
        label: "Mission & Values",
        href: "/about/mission-values",
        description: "What guides our work.",
      },
      {
        label: "Capabilities",
        href: "/about/capabilities",
        description: "How the work is planned and delivered.",
      },
      {
        label: "Quality, Safety & Delivery",
        href: "/quality-safety-delivery",
        description: "QA/QC, HSE and handover.",
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
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const quoteHref = (params?: { service?: string; project?: string; sector?: string }) => {
  const q = new URLSearchParams();
  if (params?.service) q.set("service", params.service);
  if (params?.project) q.set("project", params.project);
  if (params?.sector) q.set("sector", params.sector);
  const qs = q.toString();
  return `/request-a-quote${qs ? `?${qs}` : ""}`;
};

/**
 * The quote link for the page being viewed: on a service page it preselects that service,
 * on a case study it carries that project. Anywhere else it is the plain form link.
 */
export const quoteHrefForPath = (pathname: string | null) => {
  const service = pathname?.match(/^\/services\/([^/]+)\/?$/)?.[1];
  if (service && services.some((s) => s.slug === service)) return quoteHref({ service });
  const project = pathname?.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  if (project && projects.some((p) => p.slug === project)) return quoteHref({ project });
  return quoteHref();
};
