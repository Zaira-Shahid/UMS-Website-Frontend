import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/** Owner mockup crops are of moderate resolution: they may be scaled up to about this multiple of their own width. */
const MAX_SCALE = 1.4;

/**
 * A photo on the Services pages. It fills a box of the given aspect ratio and is cropped with object-cover. Owner
 * mockup crops (`local`) are never shown wider than MAX_SCALE times their pixel width, so they stay reasonably sharp.
 */
export function ServicePhoto({
  asset,
  ratio = "aspect-[16/7]",
  sizes,
  priority,
  className,
  uncapped,
}: {
  asset: ImageAsset & { local: boolean };
  /** Tailwind aspect-ratio class of the box. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Fill the container even if that is a little over MAX_SCALE (card photos, about 1.45x). */
  uncapped?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full", className)} style={asset.local && !uncapped ? { maxWidth: Math.round(asset.width * MAX_SCALE) } : undefined}>
      <div className={cn("relative w-full overflow-hidden bg-sky-50", ratio)}>
        <SiteImage asset={asset} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
