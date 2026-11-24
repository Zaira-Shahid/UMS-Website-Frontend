import type Lenis from "lenis";

/** The single Lenis instance, shared so components can scrollTo / stop / start without prop drilling. */
let instance: Lenis | null = null;

export const getLenis = () => instance;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
