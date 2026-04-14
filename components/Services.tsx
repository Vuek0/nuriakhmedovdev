"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Monitor, Smartphone, Check } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    num: "01",
    title: "Web\nApplications",
    description:
      "Modern, performant web products built end-to-end — from SaaS platforms to marketing sites. Built for speed, SEO, and scale.",
    stack: ["React / Next.js / Vue", "TypeScript", "REST API", "Node.js / NestJS / Express", "Auth & Payments", "SEO & Core Web Vitals"],
  },
  {
    icon: Monitor,
    num: "02",
    title: "Desktop\nApplications",
    description:
      "Cross-platform apps for Windows, macOS, and Linux. Native OS integrations, offline-first architecture, and high performance.",
    stack: ["Electron / Tauri", "Windows · macOS · Linux", "Native OS integration", "Offline-first & sync", "Rust"],
    featured: true,
  },
  {
    icon: Smartphone,
    num: "03",
    title: "Mobile\nApplications",
    description:
      "iOS & Android apps that feel truly native. Smooth animations, intuitive UX, and a clear path to App Store & Play Store.",
    stack: ["React Native", "Capacitor", "iOS & Android", "Push notifications"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20">

        {/* Section marker */}
        <motion.div
          className="flex items-center gap-5 mb-24"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <span className="text-xs uppercase tracking-[0.22em] flex-shrink-0"
            style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
            02 — Services
          </span>
          <motion.div className="flex-1 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: "var(--border-mid)" }} />
          <span className="hidden sm:block text-xs uppercase tracking-[0.2em] flex-shrink-0"
            style={{ color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>
            What I build
          </span>
        </motion.div>

        {/* Services */}
        <div>
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative py-14 border-b last:border-b-0"
                style={{ borderColor: "var(--border-mid)" }}>

                {/* Hover accent */}
                <motion.div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.22 }}
                  style={{ background: "var(--accent)", transformOrigin: "top" }} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start group-hover:pl-5 transition-all duration-300">

                  {/* Left: num + icon + title */}
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center gap-3 pt-1 flex-shrink-0">
                      <span className="text-xs tabular-nums"
                        style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
                        {s.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: s.featured ? "var(--accent-muted)" : "var(--bg)", border: `1px solid ${s.featured ? "rgba(230,57,70,0.2)" : "var(--border)"}` }}>
                        <Icon size={17} style={{ color: s.featured ? "var(--accent)" : "var(--muted)" }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold leading-[0.9] whitespace-pre-line transition-colors duration-200 group-hover:text-[var(--accent)]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "var(--text)" }}>
                        {s.title}
                      </h3>
                      {s.featured && (
                        <span className="inline-flex mt-4 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                          style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid rgba(230,57,70,0.18)" }}>
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: description + stack */}
                  <div className="lg:pt-1">
                    <p className="text-sm leading-[1.85] mb-8" style={{ color: "var(--muted)" }}>
                      {s.description}
                    </p>
                    <ul className="space-y-3.5">
                      {s.stack.map((item) => (
                        <li key={item} className="flex items-center gap-3.5 text-sm" style={{ color: "var(--muted)" }}>
                          <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                            <Check size={11} style={{ color: "var(--accent)" }} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
