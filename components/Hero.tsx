"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const ROLES = [
  "Full-Stack Developer",
  "Web App Engineer",
  "Desktop Developer",
  "Mobile Developer",
];

/* SVG rotating badge */
function RotatingBadge() {
  return (
    <div
      className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 select-none"
      style={{ animation: "spinSlow 12s linear infinite" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="bc" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text
          fill="var(--muted)"
          fontSize="10"
          fontFamily="'Space Mono', monospace"
          letterSpacing="2.8"
          fontWeight="700"
        >
          <textPath href="#bc">DEVELOPER · AVAILABLE · WEB · MOBILE ·&nbsp;</textPath>
        </text>
        <text x="60" y="65" textAnchor="middle" fill="var(--text)" fontSize="20">↗</text>
      </svg>
    </div>
  );
}

/* Word reveal animation */
function RevealWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
      <motion.span
        className="inline-block"
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Subtle radial behind name */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex flex-col justify-center w-full">

        {/* Name — left edge of page, both lines same indent */}
        <div className="w-full overflow-hidden mb-2 pl-3 sm:pl-5">
          <h1
            className="leading-[0.9] font-black tracking-tight"
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: "clamp(3.5rem, 14vw, 13rem)",
              color: "var(--text)",
            }}
          >
            <RevealWord word="MUHAMMAD" delay={0.15} />
          </h1>
          <div className="flex items-end justify-between gap-4 mt-1 pr-4 sm:pr-8">
            <h1
              className="leading-[0.9] font-black tracking-tight"
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: "clamp(2.5rem, 10vw, 9.5rem)",
                color: "var(--accent)",
              }}
            >
              <RevealWord word="NURIAKHMEDOV" delay={0.3} />
            </h1>
            {/* Rotating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="hidden sm:block flex-shrink-0"
            >
              <RotatingBadge />
            </motion.div>
          </div>
        </div>

        {/* Divider + info + CTAs — padded container */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-14 md:px-20">
          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="ruled-heavy mt-6 mb-6 origin-left"
          />

          {/* Info row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
              <span
                key={roleIdx}
                className="text-sm font-medium uppercase tracking-widest"
                style={{ color: "var(--muted)", fontFamily: "'Space Mono', monospace", animation: "clipUp 0.35s ease forwards" }}
              >
                {ROLES[roleIdx]}
              </span>
            </div>

            <span
              className="text-xs tracking-[0.18em] uppercase hidden sm:block"
              style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}
            >
              Web · Desktop · Mobile
            </span>

            <div className="flex items-center gap-3">
              <a href="https://github.com/Vuek0" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="p-3 rounded-xl border cursor-pointer transition-all duration-150 hover:border-[var(--border-mid)] hover:text-[var(--text)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--surface)" }}>
                <GithubIcon size={17} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-nuriakhmedov-0464b3301/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-3 rounded-xl border cursor-pointer transition-all duration-150 hover:border-[var(--border-mid)] hover:text-[var(--text)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--surface)" }}>
                <LinkedinIcon size={17} />
              </a>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="#projects"
              className="px-8 py-4 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: "var(--accent)" }}>
              View My Work
            </Link>
            <Link href="#contact"
              className="px-8 py-4 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[var(--surface-2)] hover:scale-[1.02] border"
              style={{ color: "var(--text)", borderColor: "var(--border-mid)", background: "var(--surface)" }}>
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex items-center gap-2 text-xs uppercase tracking-widest cursor-default max-w-5xl mx-auto w-full px-6 sm:px-14 md:px-20"
        style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.span>
        Scroll
      </motion.div>
    </section>
  );
}
