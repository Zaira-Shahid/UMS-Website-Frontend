import { getImageProps, type ImageProps } from "next/image";

/**
 * A drop-in for next/image that is drawn on the server as a plain <img>, with the same optimised srcset, sizes, lazy loading
 * and blur placeholder. next/image itself is a client component, so every one on a page is re-rendered in the browser during
 * hydration; this one costs nothing there. Use it wherever the image needs no client-side behaviour (no onLoad, no ref).
 */
export default function StaticImage(props: ImageProps) {
  const { props: img } = getImageProps(props);
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...img} alt={props.alt} />;
}
