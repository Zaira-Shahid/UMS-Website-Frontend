import { PendingNote } from "@/components/ui/PendingNote";
import { offices } from "@/content/offices";
import { cn } from "@/lib/utils";

function Box({ children, dashed, className }: { children: React.ReactNode; dashed?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "px-4 py-3 text-center font-heading text-sm font-semibold uppercase tracking-[0.08em]",
        dashed
          ? "border border-dashed border-[#b9770e] bg-[#fff6e5] text-[#7a4b00]"
          : "border-2 border-navy bg-white text-navy",
        className,
      )}
    >
      {children}
    </div>
  );
}

const line = "bg-navy/30";

/**
 * Organisation structure diagram. UMS's real structure is unknown, so only the two offices
 * (confirmed) are drawn as solid boxes; every reporting line and team is a dashed placeholder.
 * TODO: client to confirm — replace with the real structure.
 */
export function OrgDiagram() {
  return (
    <figure aria-labelledby="org-caption">
      <figcaption id="org-caption" className="sr-only">
        Illustrative organisation structure: leadership above the Islamabad and Lahore offices, each with teams. All
        reporting lines are to be confirmed.
      </figcaption>
      <PendingNote label="Illustrative structure · to be confirmed" className="mb-8 max-w-xl">
        This diagram shows only where UMS has offices. Leadership, teams and reporting lines will be drawn once UMS
        confirms its organisation.
      </PendingNote>

      <div className="mx-auto max-w-3xl">
        <Box dashed className="mx-auto max-w-xs">Leadership</Box>
        <div aria-hidden className={cn("mx-auto h-8 w-px", line)} />
        <div className="relative grid grid-cols-2 gap-4 sm:gap-10">
          <div aria-hidden className={cn("absolute left-1/4 right-1/4 top-0 h-px", line)} />
          {offices.map((o) => (
            <div key={o.city} className="relative pt-8">
              <span aria-hidden className={cn("absolute left-1/2 top-0 h-8 w-px", line)} />
              <Box>{o.city} office</Box>
              <div aria-hidden className={cn("mx-auto h-6 w-px", line)} />
              <Box dashed>Teams</Box>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
