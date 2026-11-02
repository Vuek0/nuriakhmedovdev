import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useIsPresent } from "framer-motion";
import { PAGE_DURATION, EASE, LOADER_DURATION, getExitScroll } from "@/lib/transition";
import { lenis } from "@/lib/scroll";

// How many animations are running → body.is-transitioning
const running = new Set<object>();
const syncBodyClass = () =>
  document.body.classList.toggle("is-transitioning", running.size > 0);

type Props = { children: ReactNode; isInitialLoad?: boolean };

export default function PageTransition({ children, isInitialLoad = false }: Props) {
  const isPresent = useIsPresent();

  const token = useRef({});
  const safety = useRef<ReturnType<typeof setTimeout>>(undefined);
  const finish = () => {
    clearTimeout(safety.current);
    running.delete(token.current);
    syncBodyClass();
  };

  const animated = !isInitialLoad;
  const [willChange, setWillChange] = useState(animated);

  // Lock scrolling for the duration of the transition
  useEffect(() => {
    lenis()?.stop();
    const t = setTimeout(
      () => lenis()?.start(),
      (isInitialLoad ? LOADER_DURATION : PAGE_DURATION) * 1000
    );
    return () => clearTimeout(t);
  }, [isInitialLoad]);

  return (
    <motion.div
      className="contentContainer"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: willChange || !isPresent ? "transform" : "auto",
      }}
      initial={{ zIndex: 1, y: isInitialLoad ? 0 : "100vh", ...(animated ? { z: 0.001 } : {}) }}
      animate={{
        zIndex: 1,
        y: 0,
        ...(animated ? { z: 0.001 } : {}),
        transition: { duration: PAGE_DURATION, ease: EASE },
      }}
      // On exit the page is pinned where it was scrolled to (captured on routeChangeStart)
      exit={{
        zIndex: 1,
        position: "fixed",
        top: -getExitScroll(),
        left: 0,
        right: 0,
        y: "-20vh",
        z: 0.01,
        transition: {
          y: { duration: PAGE_DURATION, ease: EASE },
          position: { duration: 0 },
          top: { duration: 0 },
        },
      }}
      onAnimationStart={() => {
        running.add(token.current);
        syncBodyClass();
        clearTimeout(safety.current);
        safety.current = setTimeout(finish, PAGE_DURATION * 1000 + 500);
      }}
      onAnimationComplete={() => {
        setWillChange(false);
        finish();
      }}
    >
      {/* Darkens the outgoing page */}
      <motion.div
        className="contentContainer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1, transition: { duration: PAGE_DURATION, ease: EASE } }}
      />

      {/* Loader, first load only */}
      {isInitialLoad && (
        <motion.div
          className="loader"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
            transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1], ease: EASE }}
          >
            Nuriakhmedov
          </motion.span>
        </motion.div>
      )}

      {children}
    </motion.div>
  );
}
