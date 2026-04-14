"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Globe, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/projects";

type Category = "All" | "Web" | "Desktop" | "Mobile";
const CATEGORIES: Category[] = ["All", "Web", "Desktop", "Mobile"];

function ProjectRow({ p, i }: { p: (typeof PROJECTS)[0]; i: number }) {
  const icons = { Web: Globe, Desktop: Monitor, Mobile: Smartphone };
  const Icon = icons[p.category];

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}>
      <Link href={`/projects/${p.slug}`}
        className="group relative flex items-center gap-5 py-6 border-b last:border-b-0 block"
        style={{ borderColor: "var(--border)" }}>

        {/* Hover accent */}
        <motion.div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
          initial={{ scaleY: 0, opacity: 0 }}
          whileHover={{ scaleY: 1, opacity: 1 }}
          style={{ background: "var(--accent)", transformOrigin: "center" }} />

        {/* Number */}
        <span className="text-xs w-10 flex-shrink-0 tabular-nums select-none"
          style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
          {p.num}
        </span>

        {/* Icon */}
        <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors duration-150"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <Icon size={14} style={{ color: "var(--muted)" }} />
        </div>

        {/* Title + desc */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base truncate transition-colors duration-150 group-hover:text-[var(--accent)]"
            style={{ color: "var(--text)" }}>
            {p.title}
          </p>
          <p className="text-xs mt-0.5 truncate hidden sm:block" style={{ color: "var(--muted)" }}>
            {p.shortDesc}
          </p>
        </div>

        {/* Tags */}
        <div className="hidden lg:flex gap-1.5 flex-shrink-0">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 w-8 flex justify-end">
          <ArrowUpRight size={15}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 -translate-x-1 group-hover:translate-x-0 transition-transform"
            style={{ color: "var(--accent)" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20">

        {/* Section marker */}
        <motion.div className="flex items-center gap-5 mb-24"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <span className="text-xs uppercase tracking-[0.22em] flex-shrink-0"
            style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
            03 — Projects
          </span>
          <motion.div className="flex-1 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: "var(--border)" }} />
        </motion.div>

        {/* Header */}
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="font-bold leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "var(--text)" }}>
            Work
          </h2>
        </motion.div>

        {/* Table header */}
        <motion.div className="flex items-center gap-5 pb-4 border-b mb-2"
          style={{ borderColor: "var(--border-mid)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}>
          {[["#","w-10"],["","w-9"],["Project","flex-1"],["Stack","hidden lg:block w-48 flex-shrink-0"],["","w-8 flex-shrink-0"]].map(([label, cls], i) => (
            <span key={i} className={`text-[10px] uppercase tracking-wider ${cls}`}
              style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
              {label}
            </span>
          ))}
        </motion.div>

        {/* Rows */}
        <AnimatePresence mode="popLayout">
          {PROJECTS.map((p, i) => <ProjectRow key={p.slug} p={p} i={i} />)}
        </AnimatePresence>

      </div>
    </section>
  );
}
