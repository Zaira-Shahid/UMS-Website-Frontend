import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PipeLine } from "./PipeLine";

/** Uppercase cyan eyebrow with a short leading rule (§3.2). */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]",
        tone === "light" ? "text-cyan-300" : "text-[#00608c]",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-8", tone === "light" ? "bg-cyan-300" : "bg-cyan")} />
      {children}
    </p>
  );
}

/**
 * Section heading: index number ("01 / Services"), title, optional intro and
 * a pipe line that draws itself under the heading.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
        {index && <span className="tabular-nums">{index} /</span>}
        {label}
      </Eyebrow>
      <Tag className={cn("mt-5", light && "text-white")}>{title}</Tag>
      <PipeLine
        className="mt-6 max-w-[14rem]"
        tone={light ? "light" : "cyan"}
        nodes="ends"
        height={12}
      />
      {description && (
        <p className={cn("mt-6 text-balance", light ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      )}
    </header>
  );
}
