import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The official UMS logo (public/brand/ums-logo-official.png, the file used on https://umss.pk): gear, speed lines, "UMS"
 * and "Ultimate Mechanical Solutions", on a transparent background. Never redrawn or stretched: only the height is set,
 * so the aspect ratio holds. The wordmark text is dark, so on a dark background it sits on a white badge (as in the footer).
 */
const SRC = "/brand/ums-logo-official.png";
const WIDTH = 668;
const HEIGHT = 203;

/** The logo artwork. Pass `decorative` when text next to it already says the name, so it is hidden from assistive technology. */
export function LogoMark({ className, decorative = false, priority = false }: { className?: string; decorative?: boolean; priority?: boolean }) {
  return <Image src={SRC} width={WIDTH} height={HEIGHT} alt={decorative ? "" : site.fullName} priority={priority} sizes="(min-width: 1280px) 290px, 240px" quality={90} className={cn("h-auto w-auto", className)} />;
}

/** The logo as a link to the homepage (header and mobile menu): about 36px high on phones and 44px on desktop. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${site.fullName}, home`} className={cn("inline-flex shrink-0 items-center", className)}>
      <LogoMark priority className="h-8 min-[380px]:h-9 xl:h-11" />
    </Link>
  );
}
