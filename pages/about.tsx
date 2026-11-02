import Link from "next/link";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { SectionIntro } from "@/components/Blocks";
import { PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const STEPS = [
  ["01", "Map", "First I map exactly how your team actually works: every spreadsheet, every manual lookup, every handoff."],
  ["02", "Build", "Then I ship the software that fits — usually one platform that replaces four or five tools."],
  ["03", "Run", "The team uses it daily. Each department sees only what it needs, and every change is logged."],
];

const SKILLS = [
  ["Frontend", "JavaScript, TypeScript, React, Next.js, Vue, Quasar, Tailwind CSS, SASS"],
  ["Mobile", "React Native, Expo, Capacitor"],
  ["Desktop", "Tauri, Electron, Rust"],
  ["Backend", "Node.js, NestJS, Express, Python, FastAPI"],
  ["Database", "PostgreSQL, MySQL, MongoDB, Prisma"],
  ["Tooling", "Git, Docker, Nginx, Linux, GitHub Actions, Figma"],
];

export default function About() {
  const current = PROJECTS[0];
  return (
    <>
      <Seo
        title="About"
        description="Full-stack developer in Tashkent. I build logistics and operations software for CIS businesses through AlmaCode."
        path="/about"
      />

      <SectionIntro title="About" eyebrow={SITE.name} className="intro--page">
        <div className="intro-text--big">
          I build logistics and operations software for CIS businesses through AlmaCode, my
          development studio in Tashkent.
        </div>
        <p style={{ marginTop: "1.2em" }}>
          Full-stack across web, desktop and mobile: I take a product from architecture to
          deployment. I care about clean code, thoughtful UI, and shipping things that actually work.
        </p>
      </SectionIntro>

      <section className="three container">
        {STEPS.map(([n, t, d]) => (
          <div key={n} className="three-item">
            <span className="label">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </section>

      {current.metrics && (
        <section className="container">
          <div className="intro-row">
            <div className="eyebrow">Currently</div>
            <div className="intro-text">
              <Link href={`/projects/${current.slug}`} className="link">
                {current.title}
              </Link>{" "}
              — {current.shortDesc.charAt(0).toLowerCase() + current.shortDesc.slice(1)}
            </div>
          </div>
          <dl className="metrics">
            {current.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="intro container">
        <div className="intro-row">
          <div className="eyebrow">Stack</div>
          <dl className="facts">
            {SKILLS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container">
        <div className="intro-row">
          <div className="eyebrow">Studio</div>
          <div className="intro-text">
            AlmaCode is my development studio in Tashkent — it’s how I take on logistics and
            operations engagements.{" "}
            <a href={SITE.studio.href} target="_blank" rel="noopener noreferrer" className="link">
              {SITE.studio.host} ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
