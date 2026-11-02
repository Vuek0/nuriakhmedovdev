import { lenis } from "./scroll";

// Shared constants and state for page transitions
export const PAGE_DURATION = 0.9; // seconds
export const EASE = [0.76, 0, 0.24, 1] as const; // hard easeInOut
export const LOADER_DURATION = 1.7; // first load

let exitScroll = 0;
let navigated = false;

// Called on routeChangeStart: remember where the user was
export function captureExitScroll() {
  const y = lenis()?.scroll ?? window.scrollY;
  exitScroll = Number.isFinite(y) ? y : 0;
}

export const getExitScroll = () => exitScroll;

// The loader plays only until the first client-side navigation
export const markNavigated = () => {
  navigated = true;
};
export const hasNavigated = () => navigated;
