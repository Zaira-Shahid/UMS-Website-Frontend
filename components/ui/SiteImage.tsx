import Image from "@/components/ui/StaticImage";
import type { ImageProps } from "next/image";
import { NAVY_BLUR } from "@/content/images";
import type { ImageAsset } from "@/types";

type Props = { asset: ImageAsset } & Omit<ImageProps, "src" | "alt" | "width" | "height">;

/**
 * Wraps next/image for content-model assets.
 * - Pass `fill` inside an aspect-ratio box to reserve space (no layout shift).
 * - SVG placeholders skip the optimiser (it refuses SVG by default).
 * - Photos get a navy blur placeholder and the asset's object-position.
 */
export function SiteImage({ asset, fill, style, ...props }: Props) {
  const isSvg = asset.src.endsWith(".svg");
  const common = {
    src: asset.src,
    unoptimized: isSvg,
    style: { objectPosition: asset.position, ...style },
    ...(isSvg ? {} : { placeholder: "blur" as const, blurDataURL: NAVY_BLUR }),
    ...props,
  };
  return fill ? (
    <Image {...common} alt={asset.alt} fill />
  ) : (
    <Image {...common} alt={asset.alt} width={asset.width} height={asset.height} />
  );
}
