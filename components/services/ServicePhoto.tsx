import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/**
 * A photo on the Services pages. Owner mockup crops (`local`) are of moderate resolution, so they are shown at their
 * natural aspect ratio and never wider than their own pixel width (no upscaling). Stand-in photos fill a box of the
 * given aspect ratio and are cropped with object-cover.
 */
export function ServicePhoto({
  asset,
  ratio = "aspect-[16/7]",
  sizes,
  priority,
  className,
}: {
  asset: ImageAsset & { local: boolean };
  /** Tailwind aspect-ratio class for stand-in photos. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (asset.local) {
    return (
      <div className={cn("mx-auto w-full", className)} style={{ maxWidth: asset.width }}>
        <SiteImage asset={asset} sizes={sizes} priority={priority} className="h-auto w-full" />
      </div>
    );
  }
  return (
    <div className={cn("relative w-full overflow-hidden bg-sky-50", ratio, className)}>
      <SiteImage asset={asset} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
