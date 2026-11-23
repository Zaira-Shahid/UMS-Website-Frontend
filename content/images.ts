import type { ImageAsset } from "@/types";

/**
 * Temporary imagery. Every call site is a placeholder until approved UMS
 * photography is supplied — see TODO.md ("Photography").
 * TODO: replace with approved UMS photography.
 */
export function placeholderImage(alt: string): ImageAsset {
  return {
    src: "/images/placeholder-blueprint.svg",
    alt,
    width: 1600,
    height: 1000,
    isPlaceholder: true,
  };
}
