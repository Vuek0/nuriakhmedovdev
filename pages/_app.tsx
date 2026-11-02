import { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { captureExitScroll, hasNavigated, markNavigated } from "@/lib/transition";
import { lenis, setLenis } from "@/lib/scroll";
import "@/styles/globals.css";

const cleanPath = (u: string) => (u || "").split("?")[0].split("#")[0] || "/";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const samePage = useRef(false);

  // Lenis smooth scroll
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const instance = new Lenis({ stopInertiaOnNavigate: true });
    setLenis(instance);
    instance.scrollTo(0, { immediate: true, force: true });
    instance.stop();
    let raf = requestAnimationFrame(function loop(t) {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(undefined);
    };
  }, []);

  // Router events
  useEffect(() => {
    const onStart = (url: string) => {
      markNavigated();
      if (cleanPath(url) === cleanPath(Router.asPath)) {
        // Clicked the current page: just scroll to the top
        samePage.current = true;
        const l = lenis();
        if (l) {
          l.start();
          l.scrollTo(0, { duration: 1 });
        } else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      samePage.current = false;
      captureExitScroll();
      lenis()?.stop();
    };
    const onComplete = () => {
      if (samePage.current) lenis()?.start();
      samePage.current = false;
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
        lenis()?.resize();
      }, 1000);
    };
    const onError = () => {
      samePage.current = false;
      lenis()?.start();
    };
    router.events.on("routeChangeStart", onStart);
    router.events.on("routeChangeComplete", onComplete);
    router.events.on("routeChangeError", onError);
    return () => {
      router.events.off("routeChangeStart", onStart);
      router.events.off("routeChangeComplete", onComplete);
      router.events.off("routeChangeError", onError);
    };
  }, [router.events]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="pageWrapper">
        <Header />
        <main>
          <AnimatePresence
            mode="sync"
            onExitComplete={() => {
              const l = lenis();
              if (l) l.scrollTo(0, { immediate: true, force: true });
              else window.scrollTo(0, 0);
            }}
          >
            <PageTransition key={router.asPath} isInitialLoad={!hasNavigated()}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
