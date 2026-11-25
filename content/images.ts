import type { ImageAsset } from "@/types";

/**
 * TEMPORARY IMAGERY — every entry is a stock placeholder, not UMS work.
 * TODO: replace with approved UMS photography (see TODO.md → Photography).
 *
 * Source: Unsplash (free licence). Each image was opened and checked by eye.
 * Alt text describes what the photo actually shows, never a UMS project.
 */
const photos = {
  // TODO: replace with approved UMS photography — Immo Wegmann
  pumpRoom: {
    id: "1650551182956-47efa0f90b64",
    alt: "Insulated pipework with valves, gauges and a circulation pump in a plant room",
    width: 1200,
    height: 1800,
  },
  // TODO: replace with approved UMS photography — Pawel Czerwinski
  redPipes: {
    id: "1529269421632-e9253d14d3a9",
    alt: "Stack of large red corrugated pipes seen end-on",
    width: 1800,
    height: 1200,
  },
  // TODO: replace with approved UMS photography — Troy Bridges
  breakerPanel: {
    id: "1566417110090-6b15a06ec800",
    alt: "Circuit breaker inside an electrical panel with coloured cables",
    width: 1600,
    height: 1200,
  },
  // TODO: replace with approved UMS photography — Rowan Heuvel
  facade: {
    id: "1792767970593-7973dda4e263",
    alt: "Corner of a modern building with a geometric patterned facade",
    width: 1200,
    height: 1600,
  },
  // TODO: replace with approved UMS photography — Tomasz Anusiewicz
  poolFountain: {
    id: "1697823749617-dd706d799838",
    alt: "Pool with two fountain jets in front of a glazed building",
    width: 1600,
    height: 1150,
  },
  // TODO: replace with approved UMS photography — Fabian Kleiser
  glassTower: {
    id: "1745015446589-7ee6f702d8c1",
    alt: "Blue glass facade of a modern office tower at dusk",
    width: 1200,
    height: 1800,
  },
  // TODO: replace with approved UMS photography — Olga Schraven
  glassReflection: {
    id: "1758830596893-7aa7c7caf245",
    alt: "Glass facade reflecting the sky with silhouettes of people inside",
    width: 1800,
    height: 1200,
  },
  // TODO: replace with approved UMS photography — Declan Sun
  wavyRoof: {
    id: "1778996369619-f42644a57b85",
    alt: "Modern building with a sweeping timber-slatted roof over a glass facade",
    width: 1600,
    height: 1270,
  },
  // TODO: replace with approved UMS photography — Dmytro Koplyk
  highRise: {
    id: "1780584448026-262cc9f960df",
    alt: "High-rise residential towers with white balconies",
    width: 1600,
    height: 1200,
  },
} as const;

export type PhotoKey = keyof typeof photos;

/** Tiny navy blur so image space is painted immediately (no layout shift). */
export const NAVY_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzUnPjxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzUnIGZpbGw9JyMwYjIyMzYnLz48L3N2Zz4=";

export function photo(key: PhotoKey, position?: string): ImageAsset {
  const p = photos[key];
  return {
    src: `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=75&w=2400`,
    alt: p.alt,
    width: p.width,
    height: p.height,
    position,
    isPlaceholder: true,
  };
}
