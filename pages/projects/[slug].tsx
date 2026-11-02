import { useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";
import Media from "@/components/Media";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";
import { PROJECTS, getProject, getNextProject, projectType, type Project } from "@/lib/projects";

type Props = { project: Project; next: Project };

const host = (url: string) => new URL(url).host;

export default function ProjectPage({ project, next }: Props) {
  const [shown, setShown] = useState<number | null>(null);
  const [cover, ...screens] = project.images;
  // 2, 4, 8 screens fill a two-column grid evenly; everything else goes in threes
  const twoCols = screens.length % 2 === 0 && screens.length % 3 !== 0;

  return (
    <>
      <Seo
        title={project.title}
        description={project.shortDesc}
        path={`/projects/${project.slug}`}
        image={cover}
      />

      <section className="intro intro--page container">
        <h1 className="intro-title">{project.title}</h1>
        <div className="intro-row">
          <div className="eyebrow">
            {project.status ? `${project.status} · ` : ""}
            {project.shortDesc}
          </div>
          <dl className="facts">
            <div><dt>Type</dt><dd>{projectType(project)}</dd></div>
            <div><dt>Stack</dt><dd>{project.tags.join(" · ")}</dd></div>
            {project.live && (
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="link">
                    {host(project.live)} ↗
                  </a>
                </dd>
              </div>
            )}
            {project.github && (
              <div>
                <dt>Source</dt>
                <dd>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link">
                    GitHub ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="container">
        <button className="gallery-item" onClick={() => setShown(0)} aria-label="Open screenshot">
          <Media src={cover} label={project.title} ratio="16 / 8" plate preload />
        </button>
      </section>

      {project.metrics && (
        <dl className="metrics container">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <section className="intro container">
        <div className="intro-row">
          <div className="eyebrow">About the project</div>
          <div className="intro-text intro-text--big">{project.description}</div>
        </div>
      </section>

      <section className="container">
        <div className="intro-row">
          <div className="eyebrow">Key features</div>
          <ul className="list">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {screens.length > 0 && (
        <section className="intro container">
          <div className="eyebrow">Screens</div>
          <div className={twoCols ? "grid-2" : "grid-3"}>
            {screens.map((src, i) => (
              <button
                key={src}
                className="gallery-item"
                onClick={() => setShown(i + 1)}
                aria-label={`Open screenshot ${i + 2}`}
              >
                <Media
                  src={src}
                  label={`${project.title} — screen ${i + 2}`}
                  ratio={twoCols ? "16 / 10" : "4 / 3"}
                  plate
                  sizes={twoCols ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="next container">
        <span className="eyebrow">Next project</span>
        <Link href={`/projects/${next.slug}`} className="next-link">
          {next.title} <span>↗</span>
        </Link>
      </section>

      <Footer />

      <AnimatePresence>
        {shown !== null && (
          <Lightbox
            images={project.images}
            index={shown}
            title={project.title}
            onIndex={setShown}
            onClose={() => setShown(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = String(params?.slug);
  const project = getProject(slug);
  if (!project) return { notFound: true };
  return { props: { project, next: getNextProject(slug) } };
};
