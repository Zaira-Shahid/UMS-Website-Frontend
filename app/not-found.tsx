import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404: a plain navy panel in the site's style with the way back. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-navy-900 pb-16 pt-[calc(var(--header-h)+2rem)] text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_75%_50%,rgb(27_166_232/0.2),transparent_72%)]" />
      <div className="wrap">
        <div className="max-w-2xl border-l-[6px] border-blue pl-6">
          <p className="font-heading text-xl font-bold text-cyan">Error 404</p>
          <h1 id="nf-title" className="mt-2 text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] font-extrabold leading-[1.05] text-white">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-white">The page you are looking for does not exist or has moved. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/services" variant="outline-light" size="lg">
              Our services
            </Button>
            <Button href="/contact" variant="outline-light" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
