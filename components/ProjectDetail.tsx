"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Globe, Monitor, Smartphone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/projects";
import Cursor from "@/components/Cursor";

const CATEGORY_ICONS = {
  Web:     Globe,
  Desktop: Monitor,
  Mobile:  Smartphone,
};

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
        style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
        <X size={18} />
      </button>
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: "#fff" }}>
          <ChevronLeft size={22} />
        </button>
      )}
      {index < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: "#fff" }}>
          <ChevronRight size={22} />
        </button>
      )}
      <motion.div
        key={index}
        className="relative mx-16 max-h-[85vh] max-w-5xl w-full"
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}>
        <Image src={images[index]} alt="" fill className="object-contain rounded-xl" sizes="90vw" />
        <div style={{ paddingTop: "60%" }} />
      </motion.div>
      <span className="absolute bottom-5 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>
        {index + 1} / {images.length}
      </span>
    </motion.div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const Icon = CATEGORY_ICONS[project.category];
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Cursor />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(242,237,228,0.94)", backdropFilter: "blur(14px)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 h-16 flex items-center justify-between">
          <Link href="/"
            className="font-black hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--text)" }}>
            MN
          </Link>
          <Link href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--muted)" }}>
            <ArrowLeft size={15} />
            Back to Projects
          </Link>
        </div>
      </header>

      {/* Hero header */}
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 pt-16 pb-12">

          {/* num + category */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}>
            <span className="text-xs tabular-nums"
              style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
              {project.num}
            </span>
            <span className="w-px h-4 flex-shrink-0" style={{ background: "var(--border-mid)" }} />
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>
              <Icon size={11} />
              {project.note ?? project.category}
            </span>
            <span className="text-xs" style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
              {project.year}
            </span>
          </motion.div>

          {/* Giant title / logo */}
          <div className="overflow-hidden mb-6">
            {project.logo ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
                <Image
                  src={project.logo}
                  alt={project.title}
                  height={96}
                  width={400}
                  className="object-contain object-left"
                  style={{ maxHeight: "clamp(3rem, 10vw, 7.5rem)", width: "auto" }}
                />
              </motion.div>
            ) : (
              <motion.h1
                className="font-bold leading-none"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(3rem, 10vw, 7.5rem)",
                  color: "var(--text)",
                }}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
                {project.title}
              </motion.h1>
            )}
          </div>

          {/* Animated accent line */}
          <motion.div
            className="h-px mb-10 origin-left"
            style={{ background: "var(--accent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Short desc + links row */}
          <motion.div
            className="flex flex-wrap items-end justify-between gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}>
            <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--muted)" }}>
              {project.shortDesc}
            </p>
            <div className="flex items-center gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:border-[var(--border-mid)]"
                  style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}>
                  <GithubIcon size={15} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: "var(--accent)" }}>
                  <ArrowUpRight size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 pb-16">
          <motion.div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            {project.images.map((src, i) => (
              <motion.button key={src} onClick={() => setLightbox(i)}
                className="relative overflow-hidden rounded-xl group"
                style={{ border: "1px solid var(--border)", aspectRatio: "16/10", background: "var(--surface)" }}
                whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
                <Image src={src} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(0,0,0,0.15)" }} />
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && project.images && (
          <Lightbox
            images={project.images}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((l) => (l !== null ? l - 1 : l))}
            onNext={() => setLightbox((l) => (l !== null ? l + 1 : l))}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 py-16 border-t" style={{ borderColor: "var(--border)" }}>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">

          {/* Left: description + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}>

            <h2 className="text-xs uppercase tracking-[0.22em] mb-5"
              style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
              About
            </h2>
            <p className="text-base leading-[1.85] mb-12"
              style={{ color: "var(--muted)" }}>
              {project.description}
            </p>

            <h2 className="text-xs uppercase tracking-[0.22em] mb-6"
              style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
              Key Features
            </h2>
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <motion.li key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                    {h}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}>

            <div className="rounded-2xl p-7 sticky top-24"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>

              <h2 className="text-xs uppercase tracking-[0.22em] mb-6"
                style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span key={tag}
                    className="px-3.5 py-2 rounded-lg text-sm"
                    style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-7 border-t" style={{ borderColor: "var(--border)" }}>
                <h2 className="text-xs uppercase tracking-[0.22em] mb-4"
                  style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
                  Details
                </h2>
                <dl className="space-y-3.5">
                  {[
                    { label: "Type", value: project.note ?? project.category },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <dt style={{ color: "var(--dim)" }}>{label}</dt>
                      <dd className="font-medium" style={{ color: "var(--text)" }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back link */}
        <motion.div
          className="mt-20 pt-10 border-t"
          style={{ borderColor: "var(--border)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}>
          <Link href="/#projects"
            className="inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--muted)" }}>
            <ArrowLeft size={15} />
            Back to all projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
