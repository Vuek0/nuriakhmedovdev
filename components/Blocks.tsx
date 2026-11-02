import Link from "next/link";
import type { ReactNode } from "react";
import Media from "./Media";
import { projectType, type Project } from "@/lib/projects";

type IntroProps = {
  title?: ReactNode;
  eyebrow: ReactNode;
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

// Page title + rule + bullet label on the left, text on the right
export function SectionIntro({ title, eyebrow, children, as: Tag = "h1", className = "" }: IntroProps) {
  return (
    <section className={`intro container ${className}`}>
      {title && <Tag className="intro-title">{title}</Tag>}
      <div className="intro-row">
        <div className="eyebrow">{eyebrow}</div>
        <div className="intro-text">{children}</div>
      </div>
    </section>
  );
}

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`card ${large ? "card--large" : ""}`}>
      <Media
        src={project.images[0]}
        label={project.title}
        ratio={large ? "16 / 8" : "16 / 11"}
        plate
        sizes={large ? "100vw" : "(max-width: 760px) 100vw, 50vw"}
      />
      <div className="card-meta">
        <span className="card-title">{project.title}</span>
        <span className="card-sub">
          {project.status && `${project.status} · `}
          {projectType(project)}
        </span>
      </div>
    </Link>
  );
}

// Numbered rows: number and title on the left, explanation on the right
export function Rows({ items }: { items: [title: string, text: string][] }) {
  return (
    <ol className="rows container">
      {items.map(([title, text], i) => (
        <li key={title}>
          <h3>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            {title}
          </h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}
