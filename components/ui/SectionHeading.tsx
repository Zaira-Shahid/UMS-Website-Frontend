import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Uppercase cyan eyebrow with a short leading rule (§3.2). */
export function Eyebrow({
  children,
  tone = "dark",
  accent = "cyan",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  /** "fire" is reserved for the Fire Fighting service. */
  accent?: "cyan" | "fire";
  className?: string;
}) {
  const fire = accent === "fire";
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]",
        fire
          ? tone === "light"
            ? "text-[#ff8a82]"
            : "text-[#b3271f]"
          : tone === "light"
            ? "text-cyan-300"
            : "text-[#00608c]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          fire ? "bg-fire" : tone === "light" ? "bg-cyan-300" : "bg-blue",
        )}
      />
      {children}
    </p>
  );
}

/**
 * Section heading: index number ("01 / Services"), title and optional intro.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
  tone = "dark",
  accent = "cyan",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  accent?: "cyan" | "fire";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow tone={tone} accent={accent} className={align === "center" ? "justify-center" : undefined}>
        {index && <span className="tabular-nums">{index} /</span>}
        {label}
      </Eyebrow>
      <Tag className={cn("mt-5", light && "text-white")}>{title}</Tag>
      {description && (
        <p className={cn("mt-5 text-balance", light ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      )}
    </header>
  );
}
