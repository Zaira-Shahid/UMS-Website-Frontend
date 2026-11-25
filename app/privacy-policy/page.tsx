import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SideToc } from "@/components/ui/SideToc";
import { privacyMeta, privacySections } from "@/content/legal";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: privacyMeta.title,
  description: "What information the UMS website collects, why it is collected and how it is handled.",
  path: "/privacy-policy",
});

const toc = privacySections.map((s) => ({ id: s.id, label: s.title }));

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: privacyMeta.title, path: "/privacy-policy" }])} />
      <PageHero
        eyebrow="Legal"
        title={privacyMeta.title}
        intro={privacyMeta.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: privacyMeta.title }]}
        titleId="privacy-title"
      />
      <div className="bg-white py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-3">
            <SideToc items={toc} title="On this page" />
          </div>
          <div className="min-w-0 lg:col-span-9">
            <div className="max-w-3xl">
              {privacySections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-32 border-t border-navy/15 py-8 first:border-t-0 first:pt-0">
                  <h2 id={`${s.id}-h`} className="text-[1.5rem] text-navy">
                    <span className="mono-label mr-3 text-[#00608c] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  {s.paragraphs.map((p, n) => (
                    <p key={n} className="mt-3 text-[1.0625rem] leading-relaxed text-ink">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
              <p className="mt-6 text-ink">
                Questions about this page? Use the{" "}
                <Link href="/contact" className="font-semibold text-[#00608c] underline underline-offset-4 hover:text-navy">
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
