import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";

const EASE = [0.65, 0, 0, 1] as const;

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Logo and CTA hide on scroll, only the menu pill stays
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    router.events.on("routeChangeStart", close);
    window.addEventListener("keydown", onKey);
    return () => {
      router.events.off("routeChangeStart", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [router.events]);

  const isActive = (href: string) =>
    href === "/" ? router.asPath === "/" : router.asPath.startsWith(href);

  return (
    <header className={`mainHeader ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="mainHeader-logo" aria-label={`${SITE.name} — home`}>
        <span className="logo">MN</span>
      </Link>

      <nav className={`burger ${open ? "is-open" : ""}`}>
        <button className="burger-button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span>Menu</span>
          <span className="burger-icon" aria-hidden>
            <i />
            <i />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="burger-panel"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.05 }}
                  >
                    <Link href={item.href} className={isActive(item.href) ? "is-active" : ""}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="burger-contacts">
                <a href={`mailto:${SITE.email}`}>{SITE.email} ↗</a>
                <a href={SITE.telegram.href} target="_blank" rel="noopener noreferrer">
                  Telegram {SITE.telegram.handle} ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Link href="/contact" className="mainHeader-cta">
        Start a project
      </Link>
    </header>
  );
}
