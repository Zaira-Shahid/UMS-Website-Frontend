import { Check } from "lucide-react";
import { RFQ_STEPS } from "@/lib/forms/rfq";
import { cn } from "@/lib/utils";

/**
 * Five-step progress indicator. Completed steps are buttons so the visitor can jump
 * back; the current step is marked aria-current="step". Labels collapse to numbers on
 * narrow screens, with the current step spelled out underneath.
 */
export function RfqProgress({ current, onGo }: { current: number; onGo: (step: number) => void }) {
  return (
    <div className="border-b border-line bg-offwhite px-4 py-5 sm:px-8">
      <ol aria-label="Quote request progress" className="flex items-center">
        {RFQ_STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const body = (
            <>
              <span
                aria-hidden
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-heading text-sm font-bold transition-colors",
                  done && "border-blue-700 bg-blue-700 text-white",
                  active && "border-navy bg-navy text-white",
                  !done && !active && "border-navy/25 text-muted",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.1em] xl:inline",
                  active ? "text-navy" : "text-muted",
                )}
              >
                {label}
              </span>
              <span className="sr-only">
                {done ? ", completed" : active ? ", current step" : ", not started"}
              </span>
            </>
          );
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className={cn("flex items-center", i < RFQ_STEPS.length - 1 && "flex-1")}
            >
              {done ? (
                <button
                  type="button"
                  onClick={() => onGo(i)}
                  className="flex items-center gap-2 rounded-ums outline-offset-4 hover:opacity-80"
                  aria-label={`Go back to step ${i + 1}: ${label}`}
                >
                  {body}
                </button>
              ) : (
                <span className="flex items-center gap-2">{body}</span>
              )}
              {i < RFQ_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={cn("mx-2 h-0.5 flex-1 xl:mx-4", i < current ? "bg-blue" : "bg-navy/15")}
                />
              )}
            </li>
          );
        })}
      </ol>
      <p aria-hidden className="mt-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy xl:hidden">
        Step {current + 1} of {RFQ_STEPS.length} · {RFQ_STEPS[current]}
      </p>
    </div>
  );
}
