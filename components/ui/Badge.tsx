import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-[3px] px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em]",
  {
    variants: {
      tone: {
        navy: "bg-navy text-white",
        cyan: "bg-cyan/10 text-[#00608c]",
        fire: "bg-fire/10 text-[#a3201a]",
        outline: "border border-line text-muted",
      },
    },
    defaultVariants: { tone: "cyan" },
  },
);

export function Badge({
  tone,
  className,
  children,
}: VariantProps<typeof badgeStyles> & { className?: string; children: ReactNode }) {
  return <span className={cn(badgeStyles({ tone }), className)}>{children}</span>;
}
