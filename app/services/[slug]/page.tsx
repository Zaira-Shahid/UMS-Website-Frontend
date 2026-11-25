import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
import { serviceBySlug, services } from "@/content/services";
import { site } from "@/content/site";
import { ogImage, ogImages } from "@/lib/seo";
import type { ServiceSlug } from "@/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug as ServiceSlug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: { images: ogImages,
      type: "website",
      siteName: `${site.name} — ${site.fullName}`,
      title: `${service.name} | ${site.name}`,
      description: service.metaDescription,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${site.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug as ServiceSlug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
