import { cn } from "@/lib/utils";

/**
 * Centred section title with a short blue underline (mockups 12 to 16). `accent` is the second, blue part of a
 * two-tone title ("Our" + "Mission").
 */
export function CenterTitle({
  lead,
  accent,
  id,
  as: Tag = "h2",
  tone = "light",
  className,
}: {
  lead: string;
  accent?: string;
  id?: string;
  as?: "h1" | "h2";
  /** "dark" is for navy backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <Tag id={id} className={cn("text-[clamp(1.875rem,1rem+3vw,3.25rem)] font-extrabold leading-tight", tone === "dark" ? "text-white" : "text-navy")}>
        {lead}
        {accent && (
          <>
            {" "}
            <span className={tone === "dark" ? "text-blue" : "text-blue-600"}>{accent}</span>
          </>
        )}
      </Tag>
      <span aria-hidden className="mx-auto mt-3 block h-1 w-[5.5rem] rounded bg-blue" />
    </div>
  );
}
