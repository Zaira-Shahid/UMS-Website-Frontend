import type { MetadataRoute } from "next";
import { insightCategories, insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { showTeamPage } from "@/content/team";
import { absoluteUrl } from "@/lib/seo";

/** Every live, indexable route. The Team page is listed only once it is switched on; /search is not indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = [
    "/",
    "/about",
    "/about/mission-values",
    "/about/capabilities",
    ...(showTeamPage ? ["/about/team"] : []),
    "/quality-safety-delivery",
    "/services",
    "/industries",
    "/projects",
    "/blog",
    "/careers",
    "/contact",
    "/request-a-quote",
    "/privacy-policy",
  ];
  const paths = [
    ...fixed,
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...insightCategories.map((c) => `/blog/category/${c.slug}`),
    ...insights.map((i) => `/blog/${i.slug}`),
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
