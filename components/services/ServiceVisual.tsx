import { SiteImage } from "@/components/ui/SiteImage";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";
import { BlueprintIllustration } from "./BlueprintIllustration";

/**
 * The picture for a service: a stock photo, or a blueprint illustration where
 * no suitable photo exists. Fills its (relative, aspect-ratioed) parent.
 */
export function ServiceVisual({
  service,
  sizes,
  priority,
  className,
}: {
  service: Service;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (service.illustration) {
    return <BlueprintIllustration name={service.illustration} className={cn("absolute inset-0 size-full", className)} />;
  }
  // TODO: replace with approved UMS photography
  return (
    <SiteImage
      asset={service.image}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
