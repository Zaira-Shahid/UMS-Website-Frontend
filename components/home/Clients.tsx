import { cn } from "@/lib/utils";
import Image from "next/image";
import { verifiedClients } from "@/content/clients";

/**
 * H5 Clients & Project Partners (mockup 05). A looping row of white logo cards that pauses on hover or focus. Renders
 * nothing until at least one client is verified in `content/clients.ts`. With reduced motion the row does not move
 * and can be scrolled by hand.
 */
export function Clients() {
  if (verifiedClients.length === 0) return null;
  const loop = verifiedClients.length >= 4;
  const items = loop ? [...verifiedClients, ...verifiedClients] : verifiedClients;
  return (
    <section aria-labelledby="clients-title" className="bg-[#f2f7fb] py-12 lg:py-16">
      <div className="wrap text-center">
        <h2 id="clients-title" className="text-[clamp(1.75rem,1rem+2.4vw,3rem)] font-extrabold text-navy">
          Clients &amp; <span className="text-blue-600">Project Partners</span>
        </h2>
        <span aria-hidden className="mx-auto mt-3 block h-[3px] w-full max-w-[34rem] bg-cyan" />
      </div>
      <div className="group/row mt-10 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <ul
          className={cn(
            "flex w-max py-3 pl-5",
            loop ? "animate-[clients-scroll_40s_linear_infinite] group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused] motion-reduce:animate-none" : "mx-auto",
          )}
        >
          {items.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              aria-hidden={i >= verifiedClients.length ? true : undefined}
              className="flex h-36 w-64 mr-5 shrink-0 items-center justify-center rounded-card border-2 border-transparent bg-white p-6 shadow-card transition-colors hover:border-cyan sm:w-72"
            >
              <Image src={c.logo} alt={c.name} width={220} height={90} className="h-auto max-h-full w-auto max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
