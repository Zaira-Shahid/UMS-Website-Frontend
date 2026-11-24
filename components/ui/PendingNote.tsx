import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

/**
 * Standard "to be confirmed" block for any UMS fact that has not been verified.
 * The page shows this instead of invented content (TODO: client to confirm).
 */
export function PendingNote({
  label = "To be confirmed by UMS",
  children,
  className,
}: {
  label?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-dashed border-[#b9770e] bg-[#fff6e5] p-4", className)}>
      <Badge tone="pending" className="border-0 bg-transparent p-0">
        {label}
      </Badge>
      {children && <div className="mt-2 text-sm text-[#7a4b00]">{children}</div>}
    </div>
  );
}
