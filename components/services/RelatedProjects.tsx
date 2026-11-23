import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { projectsForService } from "@/lib/related";
import type { Service } from "@/types";

/**
 * Related projects: case-study cards whose CONFIRMED scope includes this
 * service. Until the client confirms which services each project delivered,
 * none match — the section then lists the featured project names without
 * implying any scope (TODO: client to confirm — content/projects.ts).
 */
export function RelatedProjects({ service }: { service: Service }) {
  const related = projectsForService(service.slug);
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate scroll-mt-32 overflow-hidden bg-navy-900 py-20 text-white md:py-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="projects-title">
            <SectionHeading
              tone="light"
              index="04"
              label="Projects"
              title="Related projects"
              description={`Case studies where ${service.shortName} formed part of the scope.`}
            />
          </div>
          <Button href="/projects" variant="outline-light" arrow>
            All projects
          </Button>
        </div>

        {related.length > 0 ? (
          <Reveal stagger as="div" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} index={i} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
              </RevealItem>
            ))}
          </Reveal>
        ) : (
          <Reveal className="mt-12 border border-dashed border-white/25 p-6 sm:p-10">
            {/* TODO: client to confirm which services UMS delivered on each project */}
            <Badge tone="pending">Scope per project · to be confirmed</Badge>
            <p className="mt-5 max-w-2xl text-lg text-white/85">
              Case studies for {service.shortName} will appear here once UMS confirms which
              services it delivered on each project. Until then, the featured projects are listed
              without any scope attached.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex items-center justify-between gap-4 border-b border-white/10 py-3 text-white/85 transition-colors hover:text-cyan-300"
                  >
                    {p.name}
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
