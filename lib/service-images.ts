import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { photo, type PhotoKey } from "@/content/images";
import type { ImageAsset, ServiceSlug } from "@/types";

export type ServiceImageRole = "card" | "hero" | "included" | "app-1" | "app-2";

const EXTENSIONS = ["jpg", "jpeg", "webp", "png"] as const;

/** Reads the pixel size of a JPEG file (start-of-frame marker). Returns null for anything else. */
function jpegSize(file: string): { width: number; height: number } | null {
  const buf = readFileSync(file);
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/** A file saved as public/images/services/<slug>/<role>.(jpg|webp|png), if there is one. */
function localImage(slug: ServiceSlug, role: ServiceImageRole, position?: string, alt = ""): ImageAsset | null {
  for (const ext of EXTENSIONS) {
    const rel = `/images/services/${slug}/${role}.${ext}`;
    const file = path.join(process.cwd(), "public", rel);
    if (!existsSync(file)) continue;
    const size = ext === "jpg" || ext === "jpeg" ? jpegSize(file) : null;
    return { src: rel, alt, width: size?.width ?? 1200, height: size?.height ?? 800, position, isPlaceholder: false };
  }
  return null;
}

/**
 * Image for a Services page. Order: the role's own file, then (for "hero") the service's card file, then the fallback
 * Unsplash stand-in. `local` images are owner mockup crops of moderate resolution: show them at no more than their
 * natural width (`asset.width`) so they are never upscaled.
 */
export function serviceImage(
  slug: ServiceSlug,
  role: ServiceImageRole,
  fallback: PhotoKey | "card",
  position?: string,
): ImageAsset & { local: boolean } {
  const own = localImage(slug, role, position);
  if (own) return { ...own, local: true };
  if (role === "hero" || fallback === "card") {
    const card = localImage(slug, "card", position);
    if (card) return { ...card, local: true };
  }
  if (fallback === "card") throw new Error(`No image for ${slug}/${role}: add public/images/services/${slug}/card.jpg`);
  return { ...photo(fallback, position), local: false };
}

/** Like `serviceImage`, but for a role that may have no picture at all: returns null when there is no file and no fallback. */
export function optionalServiceImage(slug: ServiceSlug, role: ServiceImageRole, fallback: PhotoKey | null, position?: string): (ImageAsset & { local: boolean }) | null {
  const own = localImage(slug, role, position);
  if (own) return { ...own, local: true };
  return fallback ? { ...photo(fallback, position), local: false } : null;
}
