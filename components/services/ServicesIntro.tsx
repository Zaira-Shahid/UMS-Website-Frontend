import { LogoMark } from "@/components/layout/Logo";

/** Centred logo line used at the top of the Services pages (mockups 10 and 11): the UMS logo and its name between two blue lines. */
export function ServicesIntro() {
  return (
    <div className="flex flex-col items-center">
      <LogoMark className="h-11 w-auto sm:h-14" />
      <div className="mt-1 flex w-full max-w-3xl items-center gap-4">
        <span aria-hidden className="h-0.5 flex-1 bg-blue" />
        <p className="font-heading text-sm font-bold text-navy sm:text-lg">Ultimate Mechanical Solutions</p>
        <span aria-hidden className="h-0.5 flex-1 bg-blue" />
      </div>
    </div>
  );
}
