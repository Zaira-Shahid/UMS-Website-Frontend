import Image, { type ImageProps } from "next/image";
import type { ImageAsset } from "@/types";

/**
 * Wraps next/image for content-model assets. SVG placeholders skip the
 * optimiser (it refuses SVG by default); real photography is optimised.
 */
export function SiteImage({
  asset,
  ...props
}: { asset: ImageAsset } & Omit<ImageProps, "src" | "alt" | "width" | "height">) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      unoptimized={asset.src.endsWith(".svg")}
      {...props}
    />
  );
}
