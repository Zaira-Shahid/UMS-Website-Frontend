import Image from "@/components/ui/StaticImage";
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
  image,
  children,
}: {
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  titleId?: string;
  /** Photo faded into the right-hand side of the banner (large screens). */
  image?: { src: string; width: number; height: number };
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden bg-navy-900 pb-10 pt-[calc(var(--header-h)+1.25rem)] text-white md:pb-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_78%_50%,rgb(27_166_232/0.18),transparent_72%)]" />
      {image && (
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          aria-hidden
          priority
          sizes="55vw"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[56%] object-cover [mask-image:linear-gradient(to_right,transparent,black_38%)] lg:block"
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
