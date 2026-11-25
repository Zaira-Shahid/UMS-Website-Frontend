import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";

/** Interim hero (copy and buttons only). Phase F2 adds the building illustration and the service chips. */
export function Hero() {
  return (
    <section aria-labelledby="home-title" className="bg-navy-900 pb-20 pt-[calc(var(--header-h)+4rem)] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h1 id="home-title" className="max-w-2xl text-[clamp(2.5rem,1.6rem+3.6vw,4.25rem)] font-extrabold leading-[1.05] text-white">
          MEP Contracting for Complex Buildings
        </h1>
        <p className="mt-5 text-xl text-white/85">Six disciplines. One coordinated delivery.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/projects" variant="primary" size="lg">
            Explore Projects
          </Button>
          <Button href={quoteHref()} variant="outline-light" size="lg">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
