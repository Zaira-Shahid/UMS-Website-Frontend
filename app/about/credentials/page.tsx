import { AboutSubnav } from "@/components/about/AboutSubnav";
import { CertificationGrid, CompanyProfileButton, PecCard } from "@/components/about/CredentialCards";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Credentials",
  description: "UMS — Ultimate Mechanical Solutions — professional registration and certifications, and the company profile.",
  path: "/about/credentials",
});

export default function CredentialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About UMS", path: "/about" },
          { name: "Credentials", path: "/about/credentials" },
        ])}
      />
      <PageHero
        eyebrow="Credentials"
        title="Registrations and certifications"
        intro="The professional registration and certifications UMS holds. Only confirmed credentials are listed."
        crumbs={[{ label: "Home", href: "/" }, { label: "About UMS", href: "/about" }, { label: "Credentials" }]}
        titleId="cred-title"
      />
      <AboutSubnav current="/about/credentials" />

      <section aria-labelledby="pec-section-title" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div id="pec-section-title">
            <SectionHeading index="01" label="Registration" title="Professional registration" />
          </div>
          <Reveal className="mt-12">
            <PecCard />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="certs-title" className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div id="certs-title">
            <SectionHeading
              index="02"
              label="Certifications"
              title="Certifications and accreditations"
              description="Each certificate will be listed with its issuer and validity once UMS confirms it."
            />
          </div>
          <CertificationGrid />
        </div>
      </section>

      <section aria-labelledby="profile-title" className="relative isolate overflow-hidden bg-navy-900 py-16 text-white md:py-20">
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 id="profile-title" className="text-white">
              Company profile
            </h2>
            <p className="mt-3 text-white/75">A PDF overview of UMS, its services and its work.</p>
          </div>
          <CompanyProfileButton tone="dark" />
        </div>
      </section>
    </>
  );
}
