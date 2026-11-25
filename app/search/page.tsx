import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBanner } from "@/components/ui/PageBanner";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search UMS services, projects, insights and pages.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageBanner title="Search" intro="Find a service, project or article." crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      {/* useSearchParams needs a Suspense boundary */}
      <Suspense fallback={<div className="mx-auto h-64 max-w-4xl" aria-hidden />}>
        <SearchResults />
      </Suspense>
    </>
  );
}
