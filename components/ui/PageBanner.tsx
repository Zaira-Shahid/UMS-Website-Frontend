import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Navy banner at the top of every inner page (mockup 12): breadcrumb, a title with a blue bar on its left, one line
 * of intro and optional buttons. With `art`, the isometric building fades in on the right. Sits under the fixed header.
 */
export function PageBanner({
  title,
  intro,
  crumbs,
  titleId = "page-title",
  art = false,
  children,
}: {
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  titleId?: string;
  /** Show the building illustration on the right (large screens). */
  art?: boolean;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden bg-navy-900 pb-10 pt-[calc(var(--header-h)+1.25rem)] text-white md:pb-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_78%_50%,rgb(27_166_232/0.18),transparent_72%)]" />
      {art && (
        <Image
          src="/images/hero/hero-building-desktop.png"
          alt=""
          width={855}
          height={512}
          aria-hidden
          priority
          sizes="50vw"
          className="pointer-events-none absolute -right-[4%] top-1/2 -z-10 hidden w-[48%] max-w-[760px] -translate-y-1/2 opacity-90 [mask-image:radial-gradient(ellipse_70%_74%_at_52%_50%,black_55%,transparent_100%)] lg:block"
        />
      )}
      <div className="wrap">
        <Breadcrumbs items={crumbs} tone="light" />
        <div className="mt-6 max-w-[40rem] border-l-[6px] border-blue pl-5 md:mt-8 md:pl-7">
          <h1 id={titleId} className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] font-extrabold leading-[1.05] text-white">
            {title}
          </h1>
          {intro && <p className="mt-3 text-[1.0625rem] leading-snug text-white md:text-xl">{intro}</p>}
        </div>
        {children && <div className="mt-6 md:mt-8">{children}</div>}
      </div>
    </section>
  );
}
