"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Mail } from "lucide-react";
import { GithubIcon, TelegramIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20">

        {/* Section marker */}
        <motion.div
          className="flex items-center gap-5 mb-24"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <span className="text-xs uppercase tracking-[0.22em] flex-shrink-0"
            style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
            04 — Contact
          </span>
          <motion.div className="flex-1 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: "var(--border-mid)" }} />
        </motion.div>

        {/* Heading */}
        <div className="mb-20">
          {["Let's build", "something together."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", paddingBottom: "0.15em" }}>
              <motion.h2
                className="font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "var(--text)", lineHeight: 1.05 }}
                initial={{ y: "110%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">

          {/* Left */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}>

            <p className="text-base leading-[1.85]" style={{ color: "var(--muted)" }}>
              Have a project in mind? I&apos;d love to hear about it. Currently available for web, desktop, or mobile work.
            </p>

            {/* Info cards */}
            {[
              { icon: Mail,    label: "Email",    value: "vueko.eruko@gmail.com", href: "mailto:vueko.eruko@gmail.com" },
              { icon: MapPin,  label: "Location", value: "Available worldwide",  href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label}
                className="flex items-center gap-5 p-5 rounded-2xl"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-muted)", border: "1px solid rgba(230,57,70,0.15)" }}>
                  <Icon size={19} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
                    {label}
                  </p>
                  {href
                    ? <a href={href} className="text-sm font-medium hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text)" }}>{value}</a>
                    : <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{value}</p>
                  }
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-6 rounded-2xl space-y-4"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <p className="text-[10px] uppercase tracking-wider mb-5"
                style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
                Social
              </p>
              {[
                { icon: GithubIcon,   label: "GitHub",   sub: "@Vuek0",                href: "https://github.com/Vuek0" },
                { icon: TelegramIcon, label: "Telegram", sub: "@Vuek0",                href: "https://t.me/Vuek0" },
                { icon: LinkedinIcon,  label: "LinkedIn",  sub: "Muhammad Nuriakhmedov", href: "https://www.linkedin.com/in/muhammad-nuriakhmedov-0464b3301/" },
                { icon: InstagramIcon, label: "Instagram", sub: "@_vueko_",               href: "https://www.instagram.com/_vueko_" },
              ].map(({ icon: Icon, label, sub, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                  <Icon size={16} className="text-[var(--muted)]" />
                  <div className="flex-1">
                    <span className="text-sm font-medium transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)" }}>{label}</span>
                    <span className="text-xs ml-2" style={{ color: "var(--dim)" }}>{sub}</span>
                  </div>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--accent)" }}>→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit}
            className="rounded-2xl p-8 flex flex-col gap-6"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field}
                    className="block text-[10px] uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>
                    {field === "name" ? "Full Name" : "Email Address"}
                  </label>
                  <input id={field} type={field === "email" ? "email" : "text"}
                    required
                    placeholder={field === "name" ? "Your name" : "your@email.com"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none border transition-all duration-200"
                    style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.07)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border)";  e.target.style.boxShadow = "none"; }} />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="message"
                className="block text-[10px] uppercase tracking-widest mb-3"
                style={{ color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>
                Message
              </label>
              <textarea id="message" required rows={6}
                placeholder="Tell me about your project, timeline, and budget..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none border transition-all duration-200 resize-none"
                style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.07)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--border)";  e.target.style.boxShadow = "none"; }} />
            </div>

            <motion.button type="submit" disabled={sending || sent}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-base font-semibold text-white"
              style={{ background: sent ? "#059669" : "var(--accent)", opacity: sending ? 0.85 : 1 }}
              whileHover={!sent && !sending ? { scale: 1.01, filter: "brightness(1.06)" } : {}}
              whileTap={!sent && !sending ? { scale: 0.99 } : {}}>
              {sent
                ? "Message Sent ✓"
                : sending
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                  : <><Send size={15} />Send Message</>
              }
            </motion.button>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
