import type Lenis from "lenis";

// The one Lenis instance, created in _app. Kept here rather than on window.lenis,
// which Lenis itself declares with a different type.
let instance: Lenis | undefined;

export const setLenis = (l?: Lenis) => {
  instance = l;
};

export const lenis = () => instance;
