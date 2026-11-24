import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * S11 · Masked text window. A giant heading with an image or looping video playing *inside* the
 * letters. Images use `background-clip: text`. Video uses a dark overlay with white text and
 * `mix-blend-mode: multiply`, which lets the video show only through the letters. The visible
 * heading is real text, so it is read normally by assistive technology. With reduced motion the
 * video is replaced by its poster.
 */
export function MaskedTextWindow({
  text,
  image,
  videoSrc,
  poster,
  as: Tag = "h2",
  className,
  textClassName,
}: {
  text: string;
  /** Still image shown inside the letters (used when there is no video). */
  image?: string;
  videoSrc?: string;
  poster?: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  textClassName?: string;
}) {
  const type = cn(
    "font-heading font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(3.5rem,2rem+11vw,13rem)]",
    textClassName,
  );

  if (videoSrc) {
    return (
      <div className={cn("relative isolate overflow-hidden bg-navy-950", className)}>
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" aria-hidden className="absolute inset-0 -z-10 hidden h-full w-full object-cover motion-reduce:block" />
        )}
        <Tag className={cn(type, "bg-navy-950 text-white mix-blend-multiply")}>{text}</Tag>
      </div>
    );
  }

  const style: CSSProperties = {
    backgroundImage: image ? `url(${image})` : "linear-gradient(135deg, var(--cyan) 0%, var(--navy) 60%, var(--navy-950) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <div className={cn("relative", className)}>
      <Tag className={type} style={style}>
        {text}
      </Tag>
    </div>
  );
}
