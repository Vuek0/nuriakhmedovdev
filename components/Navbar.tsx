"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(242,237,228,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="#home"
          className="hover:text-[var(--accent)] transition-colors duration-200"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--text)" }}
        >
          MN
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-5">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg border transition-all duration-200 hover:brightness-110"
            style={{ color: "var(--accent)", borderColor: "var(--accent)", background: "var(--accent-muted)", fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em" }}
          >
            Hire Me <span>→</span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer"
            aria-label="Toggle menu"
            style={{ color: "var(--text)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t"
            style={{ background: "rgba(242,237,228,0.98)", borderColor: "var(--border)" }}
          >
            <nav className="max-w-5xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-black text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="pt-4 border-t mt-2" style={{ borderColor: "var(--border)" }}>
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 font-semibold"
                  style={{ color: "var(--accent)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.06em" }}
                >
                  Hire Me →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
