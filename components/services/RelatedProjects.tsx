import { ProjectCard } from "@/components/projects/ProjectCard";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsForService } from "@/lib/related";
import type { Service } from "@/types";

/** Related projects: case-study cards whose scope includes this service. */
export function RelatedProjects({ service }: { service: Service }) {
  const shown = projectsForService(service.slug);

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
              accent={service.accent}
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

        <Reveal stagger as="div" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <RevealItem key={p.slug}>
              <ProjectCard
                project={p}
                index={i}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
