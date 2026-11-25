import { existsSync } from "node:fs";
import path from "node:path";
import { photo, type PhotoKey } from "@/content/images";
import type { ImageAsset, ServiceSlug } from "@/types";

export type ServiceImageRole = "card" | "hero" | "included" | "app-1" | "app-2";

const EXTENSIONS = ["jpg", "jpeg", "webp", "png"] as const;

/**
 * Image for a Services page. A file saved as public/images/services/<slug>/<role>.(jpg|webp|png) is used when it
 * exists; otherwise the stand-in Unsplash photo is used. Server-side only (reads the file system at build time).
 */
export function serviceImage(slug: ServiceSlug, role: ServiceImageRole, fallback: PhotoKey, position?: string, alt?: string): ImageAsset {
  for (const ext of EXTENSIONS) {
    const rel = `/images/services/${slug}/${role}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) {
      return { src: rel, alt: alt ?? "", width: 2000, height: 1333, position, isPlaceholder: false };
    }
  }
  const p = photo(fallback, position);
  return alt ? { ...p, alt } : p;
}
