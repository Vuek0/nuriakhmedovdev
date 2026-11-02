import Link from "next/link";
import Wordmark from "./Wordmark";
import Media from "./Media";
import { NAV, SITE, SOCIALS } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

export default function Footer() {
  const latest = PROJECTS[0];
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-col">
          <span className="logo">MN</span>
          <ul className="footer-nav">
            {NAV.slice(1).map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
            <li>
              <a href={SITE.studio.href} target="_blank" rel="noopener noreferrer">
                {SITE.studio.name} ↗
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col footer-col--right">
          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
          <div className="footer-latest">
            <div className="eyebrow eyebrow--light">Latest work</div>
            <Link href={`/projects/${latest.slug}`} className="footer-latest-card">
              <Media src={latest.images[0]} label={latest.title} ratio="16 / 10" plate sizes="340px" />
              <span>{latest.title}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <Wordmark text="Nuriakhmedov" className="wordmark--light" />
      </div>
      <div className="footer-bottom container">
        <span>©{new Date().getFullYear()} {SITE.name}</span>
        <span>{SITE.location}</span>
      </div>
    </footer>
  );
}
