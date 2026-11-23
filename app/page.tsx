import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/** Temporary landing — the full homepage is built in Phase 3. */
export default function Home() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy-900">
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <Eyebrow tone="light">{site.fullName}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-white">MEP Contracting for Complex Buildings</h1>
        <p className="mt-6 max-w-xl text-white/75">
          Website foundation is in place. The full homepage is built in Phase 3.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/dev/ui" variant="accent" magnetic arrow>
            View UI primitives
          </Button>
        </div>
      </div>
    </section>
  );
}
