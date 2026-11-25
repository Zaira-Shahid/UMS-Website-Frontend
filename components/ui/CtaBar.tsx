import { Button } from "@/components/ui/Button";

/** Navy rounded call-to-action bar (mockups 10 and 11): a title, a thin divider and one button. Stacks on mobile. */
export function CtaBar({ title, href, label = "Request a Quote" }: { title: string; href: string; label?: string }) {
  return (
    <div className="flex flex-col items-stretch gap-5 rounded-2xl bg-navy-950 px-6 py-6 text-white sm:px-10 md:flex-row md:items-center md:gap-0 md:py-5">
      <p className="font-heading text-[clamp(1.375rem,1rem+1.4vw,2rem)] font-bold leading-tight md:flex-1">{title}</p>
      <span aria-hidden className="mx-8 hidden h-10 w-px bg-blue md:block" />
      <Button href={href} size="lg" className="w-full md:w-auto md:min-w-[17rem]">
        {label}
      </Button>
    </div>
  );
}
