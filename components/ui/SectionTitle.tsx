import { cn } from "@/lib/utils";

/**
 * Section title with the short blue accent bar above it. The optional `accent` is the second part of a two-tone
 * heading ("How We" + "Deliver"), set in blue.
 */
export function SectionTitle({
  lead,
  accent,
  tone = "light",
  as: Tag = "h2",
  id,
  className,
}: {
  lead: string;
  accent?: string;
  /** "light" is for light backgrounds (navy text), "dark" for navy backgrounds (white text). */
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span aria-hidden className="accent-bar" />
      <Tag id={id} className={cn("mt-4 font-extrabold", tone === "dark" && "text-white")}>
        {lead}
        {accent && (
          <>
            {" "}
            <span className={tone === "dark" ? "text-blue" : "text-blue-600"}>{accent}</span>
          </>
        )}
      </Tag>
    </div>
  );
}
