import Link from "next/link";
import Seo from "@/components/Seo";
import Wordmark from "@/components/Wordmark";
import Footer from "@/components/Footer";
import { SectionIntro, ProjectCard, Rows } from "@/components/Blocks";
import { PROJECTS } from "@/lib/projects";

const SERVICES: [string, string][] = [
  ["One live system", "Replacing fragmented spreadsheets with a single live system that fits your team’s actual workflow."],
  ["Industry data, one database", "Pulling data from external industry platforms into one auditable database with permanent history."],
  ["A module for every team", "Multi-module setups where each team sees only what’s relevant — with full audit logging."],
  ["Every platform", "Cross-platform delivery: desktop, mobile and partner portals, all on one shared system."],
  ["Automation", "Regulatory deadline tracking, reconciliation, and the “where is X right now” question."],
];

export default function Home() {
  const [featured, ...rest] = PROJECTS;
  const wagons = featured.metrics?.[0];

  return (
    <>
      <Seo path="/" image={featured.images[0]} />

      <section className="hero container">
        <p className="hero-lead">
          <span className="eyebrow-dot" />
          I build logistics and operations software for CIS businesses through AlmaCode, my
          development studio in Tashkent.
        </p>
        <Wordmark text="Nuriakhmedov" />
        <div className="hero-bottom">
          <span>MUHAMMAD NURIAKHMEDOV · FULL-STACK DEVELOPER</span>
          <span>TASHKENT · 41.31° N 69.28° E</span>
        </div>
      </section>

      <section className="container">
        <ProjectCard project={featured} large />
      </section>

      <SectionIntro as="h2" title="Software that fits how your team actually works" eyebrow="Approach">
        <p>
          My work tends to start the same way: an operations-heavy company has been running on a
          stack of spreadsheets and manual processes that finally stopped scaling.
        </p>
        <p>
          I map exactly how the team actually works, then ship the software that fits — usually
          replacing four or five tools with one platform the team uses daily.
        </p>
      </SectionIntro>

      <section className="split container">
        <span className="split-word">Logistics</span>
        <div className="split-center">
          <span className="label">AlmaCode</span>
          {wagons && (
            <Link href={`/projects/${featured.slug}`} className="stat">
              <span className="eyebrow eyebrow--light">{featured.title} · live</span>
              <span>
                <span className="stat-value">{wagons.value}</span>
                <span className="stat-label">
                  {wagons.label} across Uzbekistan and Kazakhstan, managed in one auditable system
                </span>
              </span>
            </Link>
          )}
          <span className="label">Tashkent</span>
        </div>
        <span className="split-word">Operations</span>
      </section>

      <SectionIntro as="h2" title="Selected work" eyebrow="Projects">
        Web, desktop and mobile products, each built end to end — from the database to the screen
        people use every day.{" "}
        <Link href="/projects" className="link">
          All projects ↗
        </Link>
      </SectionIntro>

      <section className="grid-2 container">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>

      <SectionIntro as="h2" title="What I’m useful for" eyebrow="Services">
        Open to logistics and operations engagements.
      </SectionIntro>

      <Rows items={SERVICES} />

      <section className="next container">
        <span className="eyebrow">Have a project in mind?</span>
        <Link href="/contact" className="next-link">
          Let’s talk <span>↗</span>
        </Link>
      </section>

      <Footer />
    </>
  );
}
