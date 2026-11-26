import type { Insight, ServiceSlug } from "@/types";

export interface BlogImage {
  src: string;
  width: number;
  height: number;
}

const p = (service: string, file: string, width: number, height: number): BlogImage => ({ src: `/images/services/${service}/${file}`, width, height });

/** The photos available for each service (stock photography, as on the Services pages). */
const pool: Record<ServiceSlug, BlogImage[]> = {
  "integrated-mep": [p("integrated-mep", "card.jpg", 460, 159), p("integrated-mep", "hero.jpg", 948, 233), p("integrated-mep", "app-1.jpg", 459, 146), p("integrated-mep", "app-2.jpg", 458, 146), p("integrated-mep", "included.jpg", 460, 245)],
  hvac: [p("hvac", "card.jpg", 461, 159)],
  "fire-fighting": [p("fire-fighting", "card.jpg", 460, 159)],
  plumbing: [p("plumbing", "card.jpg", 461, 159)],
  "electrical-elv": [p("electrical-elv", "card.jpg", 460, 150)],
  "pools-fountains": [p("pools-fountains", "card.jpg", 461, 150)],
};

/** One photo per post: the post's first service decides it, and for the general MEP posts the slug picks among the MEP photos. */
export function blogImage(a: Pick<Insight, "slug" | "services">): BlogImage {
  const photos = pool[a.services[0] ?? "integrated-mep"];
  let h = 0;
  for (const c of a.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return photos[h % photos.length];
}
