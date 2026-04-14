import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from "@/components/icons";

const SOCIALS = [
  { icon: GithubIcon,   href: "https://github.com/Vuek0",                                       label: "GitHub" },
  { icon: TelegramIcon, href: "https://t.me/Vuek0",                                             label: "Telegram" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/muhammad-nuriakhmedov-0464b3301/",   label: "LinkedIn" },
  { icon: InstagramIcon,href: "https://www.instagram.com/_vueko_",                              label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="py-7 border-t" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-14 md:px-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", color: "var(--muted)", fontSize: "1rem" }}>MN</span>
          <span className="text-xs" style={{ color: "var(--dim)", fontFamily: "'Space Mono', monospace" }}>
            © {new Date().getFullYear()} Muhammad Nuriakhmedov
          </span>
        </div>
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="p-3 rounded-xl border cursor-pointer transition-colors hover:text-[var(--text)]"
              style={{ borderColor: "var(--border)", color: "var(--dim)", background: "var(--surface)" }}>
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
