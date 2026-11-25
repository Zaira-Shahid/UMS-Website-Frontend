import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — MEP Contracting for Complex Buildings` },
  description: site.description,
};

/** Homepage. The final sections (PROJECT_SPEC.md, H1 to H9) are built in phases F2 and F3. */
export default function Home() {
  return <Hero />;
}
