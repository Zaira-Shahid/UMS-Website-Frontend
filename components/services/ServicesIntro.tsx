import { LogoMark } from "@/components/layout/Logo";

/** Centred logo line used at the top of the Services pages (mockups 10 and 11): the official UMS logo (which includes the company name) between two blue lines. */
export function ServicesIntro() {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center gap-4 sm:gap-6">
      <span aria-hidden className="h-0.5 flex-1 bg-blue" />
      <LogoMark className="h-14 sm:h-[4.5rem]" />
      <span aria-hidden className="h-0.5 flex-1 bg-blue" />
    </div>
  );
}
