"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SlantedButton, SlantedTab } from "@/components/ui/Slanted";
import { featuredGallery, featuredSectors } from "@/content/home";
import { projects } from "@/content/projects";
import { useScrollRow } from "@/lib/use-scroll-row";
import { cn } from "@/lib/utils";

/**
 * H4 Featured Projects (mockup 04). Slanted sector tabs filter the projects. A project shows under a tab only when its
 * sector is confirmed in the content; the others appear on /projects only. The images are illustrative and labelled.
 */
export function FeaturedProjects() {
  const [sector, setSector] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const tabList = useRef<HTMLDivElement>(null);
  // On phones the tabs stay on one row and scroll sideways: the chosen tab is centred and a fade hints at more on the right.
  const moreTabs = useScrollRow(tabList, sector);
  const [inView, setInView] = useState(true);
  // Entrance: nothing is hidden until the page has hydrated ("armed"), so without scripts the cards simply show. The cards then
  // slide in the first time the section is on screen, and again whenever a tab is chosen.
  const [armed, setArmed] = useState(false);
  const [entered, setEntered] = useState(false);
  const seen = useRef(false);
  const firstSector = useRef(true);
  // The card backgrounds move slowly (Ken Burns and a crossfade); they pause while the section is off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    // This section comes alive just before it is reached. If it is already on screen, show it as it is instead of hiding it
    // and sliding it in.
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight) {
      seen.current = true;
      setEntered(true);
    }
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && !seen.current) {
          seen.current = true;
          setEntered(true);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (firstSector.current) {
      firstSector.current = false;
      return;
    }
    if (!seen.current) return;
    // Choosing a tab: hide the new cards before they are painted, then let them slide in on the next frames.
    setEntered(false);
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [sector]);
  const industry = featuredSectors[sector].industry;
  const shown = projects.filter((p) => p.sector === industry && featuredGallery[p.slug]).slice(0, 2);

  const onKeyDown = (e: KeyboardEvent) => {
    const n = featuredSectors.length;
    let to = sector;
    if (e.key === "ArrowRight") to = (sector + 1) % n;
    else if (e.key === "ArrowLeft") to = (sector - 1 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    else return;
    e.preventDefault();
    setSector(to);
    tabs.current[to]?.focus();
  };

  return (
    <section ref={sectionRef} data-feat-paused={!inView} data-feat-armed={armed} data-feat-in={entered} aria-labelledby="featured-title" className="relative overflow-hidden bg-[#f2f7fb] py-10 lg:py-14">
      <Image
        src="/images/sections/wireframe-building-projects.png"
        alt=""
        width={605}
        height={305}
        aria-hidden
        className="feat-rv feat-rv--right pointer-events-none absolute right-[3%] top-0 hidden w-[38%] max-w-[605px] [clip-path:inset(0_0_6%_0)] lg:block"
        style={{ ["--d" as string]: "0.1s" }}
      />
      <div className="wrap relative">
        <SectionTitle id="featured-title" lead="Featured Projects" />
        <p className="mt-2 text-[1.0625rem] text-muted lg:text-xl">Explore our work by sector.</p>

        <div
          ref={tabList}
          role="tablist"
          aria-label="Project sectors"
          onKeyDown={onKeyDown}
          className={cn(
            "-mx-[var(--wrap-pad)] mt-6 flex snap-x snap-proximity overflow-x-auto px-[var(--wrap-pad)] pb-px [scrollbar-width:none] lg:mx-0 lg:max-w-[60%] lg:overflow-visible lg:border-b lg:border-blue lg:px-0 [&::-webkit-scrollbar]:hidden",
            moreTabs && "max-md:[mask-image:linear-gradient(to_right,black_86%,transparent)]",
          )}
        >
          {featuredSectors.map((s, i) => (
            <SlantedTab
              key={s.industry}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              aria-controls={`${id}-panel`}
              active={i === sector}
              tabIndex={i === sector ? 0 : -1}
              onClick={() => setSector(i)}
              className="shrink-0 snap-center whitespace-nowrap px-5 lg:px-9"
            >
              {s.label}
            </SlantedTab>
          ))}
          {/* End spacer so the last tab keeps the page margin when the row is scrolled to the end on phones */}
          <span aria-hidden className="w-[var(--wrap-pad)] shrink-0 lg:hidden" />
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${sector}`} className="mt-8 lg:mt-10">
          {shown.length === 0 ? (
            <p className="rounded-card border border-border bg-white px-6 py-10 text-center text-muted">
              Projects in this sector will be listed here. See all projects below.
            </p>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-0">
              {shown.map((p, i) => (
                <ProjectCard key={p.slug} index={i} slug={p.slug} name={p.name} city={p.city} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <SlantedButton href="/projects" variant="outline" className="px-14">
            View All Projects
          </SlantedButton>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ index, slug, name, city }: { index: number; slug: string; name: string; city?: string }) {
  const big = index === 0;
  const photos = featuredGallery[slug];
  return (
    <article
      style={{ ["--d" as string]: big ? "0.1s" : "0.3s", ["--shine" as string]: big ? "rgb(255 255 255 / 0.16)" : "rgb(27 166 232 / 0.14)" }}
      className={cn(
        "feat-rv feat-shine group relative isolate overflow-hidden rounded-card lg:rounded-none",
        big ? "feat-rv--left" : "feat-rv--right",
        big
          ? "min-h-[22rem] bg-gradient-to-br from-navy-950 via-navy-900 to-[#3f78a8] text-white lg:h-[30.5rem] lg:[clip-path:polygon(70px_0,100%_0,calc(100%-175px)_100%,0_100%,0_43%)]"
          : "min-h-[20rem] bg-gradient-to-br from-white to-sky-50 text-navy lg:-ml-[157px] lg:h-[26rem] lg:[clip-path:polygon(150px_0,100%_0,100%_100%,0_100%)]",
      )}
    >
      {/* Background photos: a slow Ken Burns zoom and pan on each, crossfading with the next. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-y-0 right-0 -z-10 h-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none",
          big ? "w-[44%] [mask-image:linear-gradient(to_right,transparent,transparent_6%,black_36%)]" : "w-[42%] [mask-image:linear-gradient(to_right,transparent,transparent_16%,black_52%)]",
        )}
      >
        {photos.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 26vw, 60vw"
            className={cn("object-cover", photos.length > 1 && "feat-photo", i === 0 ? "feat-photo--a" : "feat-photo--b opacity-0")}
          />
        ))}
      </div>
      <div className={cn("flex h-full flex-col justify-center p-6", big ? "max-w-[66%] lg:max-w-[78%] lg:pl-[4.5rem]" : "max-w-[62%] lg:max-w-[72%] lg:pl-[10.5rem] lg:pr-4")}>
        <h3 style={{ ["--d" as string]: big ? "0.45s" : "0.65s" }} className={cn("feat-rv feat-rv--up font-extrabold leading-[1.05]", big ? "text-[clamp(1.75rem,1rem+2vw,3rem)] text-white" : "text-[clamp(1.5rem,0.9rem+1.3vw,2.25rem)] text-navy")}>{name}</h3>
        {city && (
          <p style={{ ["--d" as string]: big ? "0.55s" : "0.75s" }} className={cn("feat-rv feat-rv--up mt-3 flex items-center gap-2 text-lg", big ? "text-white" : "text-navy")}>
            <MapPin aria-hidden style={{ ["--d" as string]: big ? "0.85s" : "1.05s" }} className={cn("feat-pin size-5 fill-current", big ? "text-cyan" : "text-blue-700")} />
            {city}
          </p>
        )}
        <span aria-hidden style={{ ["--d" as string]: big ? "0.65s" : "0.85s" }} className="feat-rv feat-rv--bar mt-5 block h-1 w-14 bg-blue" />
        <div style={{ ["--d" as string]: big ? "0.75s" : "0.95s" }} className="feat-rv feat-rv--up mt-6">
          <SlantedButton href={`/projects/${slug}`} className="py-2.5">
            Explore Project
          </SlantedButton>
        </div>
      </div>
      <p
        style={{ ["--d" as string]: "1s" }}
        className={cn(
          "feat-rv absolute bottom-3 text-sm italic text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]",
          big ? "left-6 lg:left-8" : "right-6",
        )}
      >
        Illustrative imagery
      </p>
    </article>
  );
}
