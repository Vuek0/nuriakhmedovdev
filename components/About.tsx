"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const SKILLS = [
  { category: "Frontend",  items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Quasar", "Tailwind CSS", "Bootstrap", "SASS"] },
  { category: "Mobile",    items: ["React Native", "Capacitor"] },
  { category: "Desktop",   items: ["Electron", "Tauri"] },
  { category: "Backend",   items: ["Node.js", "NestJS", "Express", "Python", "FastAPI"] },
  { category: "Database",  items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { category: "Tooling",   items: ["Git", "Docker", "Nginx", "Linux", "GitHub Actions", "Figma"] },
];

function Counter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const triggered = useRef(false);

  useEffect(() => {
    if (isInView && !triggered.current) {
      triggered.current = true;
      const c = animate(count, value, { duration: 1.4, ease: "easeOut", delay: 0.3 });
      return c.stop;
    }
  }, [isInView, value, count]);

  return <><motion.span>{rounded}</motion.span>{suffix}</>;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20">

        {/* Section marker */}
        <motion.div
          className="flex items-center gap-5 mb-24"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-[0.22em] flex-shrink-0"
            style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
            01 — About
          </span>
          <motion.div className="flex-1 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: "var(--border)" }} />
        </motion.div>

        {/* Opening statement */}
        <div className="mb-24">
          {["Building complete products", "across every platform —"].map((line, i) => (
            <div key={i} className="overflow-hidden pb-2">
              <motion.p
                className="font-bold leading-[0.92]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5.5vw, 4.5rem)", color: "var(--text)" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                {line}
              </motion.p>
            </div>
          ))}
          <div className="overflow-hidden pb-2">
            <motion.p
              className="font-bold leading-[0.92]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5.5vw, 4.5rem)", color: "var(--accent)" }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.39, ease: [0.16, 1, 0.3, 1] }}>
              web, desktop & mobile.
            </motion.p>
          </div>
        </div>

        {/* Bio + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-24 mb-20">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <p className="text-base mb-5 leading-[1.85]" style={{ color: "var(--muted)" }}>
              Full-stack developer working remotely with clients worldwide. I specialize in
              building complete products — from architecture to deployment.
            </p>
            <p className="text-base mb-10 leading-[1.85]" style={{ color: "var(--muted)" }}>
              I care about clean code, thoughtful UI, and shipping things that actually work.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border text-xs"
              style={{ background: "var(--surface)", borderColor: "rgba(34,197,94,0.2)", color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-widest">Open to new projects</span>
            </div>
          </motion.div>

          <div className="space-y-1">
            {SKILLS.map((s, i) => (
              <motion.div key={s.category}
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-6 py-4 border-b last:border-b-0"
                style={{ borderColor: "var(--border)" }}>
                <span className="text-[10px] uppercase tracking-wider w-20 flex-shrink-0 pt-1 font-medium"
                  style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
                  {s.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
