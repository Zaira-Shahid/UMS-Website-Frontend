import type { Project } from "@/types";
import { confirmedProjects } from "./dummy";

/** Projects the owner has confirmed by name. See content/dummy.ts. */
export const projects: Project[] = confirmedProjects.map((p) => ({ ...p }));
