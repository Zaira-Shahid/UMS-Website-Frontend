import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Service-aware enquiry band for the overview: one quick link per service,
 * each carrying the right ?service= value into the quote form.
 */
export function ServicesCTA() {
  return (
    <section
      aria-labelledby="services-cta-title"
      className="relative isolate overflow-hidden bg-navy-900 py-16 text-white md:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
              <span aria-hidden className="h-px w-8 bg-cyan-300" />
              Start a conversation
            </p>
            <h2 id="services-cta-title" className="mt-5 text-white">
              Which service do you need a quote for?
            </h2>
            <p className="mt-4 max-w-lg text-white/75">
              Pick a discipline and the quote form opens with it already selected — or choose
              several, or ask us to recommend the scope.
            </p>
            <div className="mt-8">
              <Button href={quoteHref()} variant="accent" size="lg" magnetic arrow>
                Request a Quote
              </Button>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={quoteHref({ service: s.slug })}
                  className={cn(
                    "flex items-center justify-between gap-4 border px-4 py-3.5 text-sm font-medium transition-colors",
                    s.accent === "fire"
                      ? "border-fire/50 hover:border-fire hover:bg-fire"
                      : "border-white/20 hover:border-cyan hover:bg-cyan",
                  )}
                >
                  {s.shortName}
                  <span aria-hidden className="text-white/50">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
