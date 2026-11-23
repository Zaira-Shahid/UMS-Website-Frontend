import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const corner = "absolute size-4 border-cyan transition-all duration-300";

/** Technical-drawing corner marks around any block (image, stat panel). */
export function CornerBrackets({
  children,
  className,
  tone = "cyan",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "light";
}) {
  const color = tone === "light" ? "border-white/70" : "border-cyan";
  return (
    <div className={cn("group/brackets relative", className)}>
      {children}
      <span aria-hidden className={cn(corner, color, "left-0 top-0 border-l-2 border-t-2 group-hover/brackets:-left-1.5 group-hover/brackets:-top-1.5")} />
      <span aria-hidden className={cn(corner, color, "right-0 top-0 border-r-2 border-t-2 group-hover/brackets:-right-1.5 group-hover/brackets:-top-1.5")} />
      <span aria-hidden className={cn(corner, color, "bottom-0 left-0 border-b-2 border-l-2 group-hover/brackets:-bottom-1.5 group-hover/brackets:-left-1.5")} />
      <span aria-hidden className={cn(corner, color, "bottom-0 right-0 border-b-2 border-r-2 group-hover/brackets:-bottom-1.5 group-hover/brackets:-right-1.5")} />
    </div>
  );
}
