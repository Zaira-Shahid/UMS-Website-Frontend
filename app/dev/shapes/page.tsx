import type { Metadata } from "next";
import { ShapesShowcase } from "./ShapesShowcase";

export const metadata: Metadata = {
  title: "Shape library",
  robots: { index: false, follow: false },
};

/** Development showcase for the V2 Shape Library (S1–S16). Not linked from the site. */
export default function ShapesPage() {
  return <ShapesShowcase />;
}
