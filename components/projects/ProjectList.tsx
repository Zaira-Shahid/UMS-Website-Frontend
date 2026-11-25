import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Numbered index of the confirmed projects: an editorial list of names, not a grid of cards. Only the name is
 * shown, because nothing else about a project has been confirmed.
 */
export function ProjectList({ tone = "dark", large = false }: { tone?: "dark" | "light"; large?: boolean }) {
  const dark = tone === "dark";
  return (
    <ol className={cn("border-y", dark ? "divide-y divide-white/15 border-white/15" : "divide-y divide-navy/15 border-navy/15")}>
      {projects.map((p, i) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className={cn(
              "group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 transition-colors sm:grid-cols-[4rem_1fr_auto]",
              large ? "py-7 sm:py-10" : "py-6 sm:py-8",
              dark ? "hover:bg-white/[0.04]" : "hover:bg-offwhite",
            )}
          >
            <span className={cn("mono-label pl-1 sm:pl-3", dark ? "text-cyan-300" : "text-[#00608c]")}>{String(i + 1).padStart(2, "0")}</span>
            <span
              className={cn(
                "min-w-0 font-heading font-bold uppercase leading-[1.05] tracking-[0.01em] transition-transform duration-300 group-hover:translate-x-2",
                large ? "text-[clamp(1.75rem,1rem+3.4vw,4.25rem)]" : "text-[clamp(1.5rem,1rem+2.2vw,2.75rem)]",
                dark ? "text-white" : "text-navy group-hover:text-blue",
              )}
            >
              {p.name}
            </span>
            <ArrowUpRight
              aria-hidden
              className={cn("mr-1 size-6 transition-colors sm:mr-3", dark ? "text-white/50 group-hover:text-cyan-300" : "text-navy/40 group-hover:text-blue")}
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
