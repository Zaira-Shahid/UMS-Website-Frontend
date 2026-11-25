import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { quoteHref } from "@/content/navigation";

/** Shared enquiry band — sits above the footer on every page. */
export function CTABand() {
  return (
    <section
      aria-labelledby="cta-band-title"
      className="relative isolate overflow-hidden bg-navy"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Start a conversation</Eyebrow>
          <h2 id="cta-band-title" className="mt-5 text-white">
            Have a tender or project brief?
          </h2>
          <p className="mt-4 text-white/75">
            Tell us about the building, the disciplines involved and your timeline. We will
            come back with the right next step.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={quoteHref()} variant="accent" size="lg" magnetic arrow>
            Request a Quote
          </Button>
          <Button href="/contact" variant="outline-light" size="lg">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
