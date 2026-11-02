import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { SectionIntro, ProjectCard } from "@/components/Blocks";
import { PROJECTS } from "@/lib/projects";

export default function Projects() {
  const [first, ...rest] = PROJECTS;
  return (
    <>
      <Seo
        title="Work"
        description="Logistics platforms, restaurant ordering and open-source tools — web, desktop and mobile products built end to end."
        path="/projects"
      />
      <SectionIntro title="Work" eyebrow="All projects" className="intro--page">
        Each project here was built end to end: backend, interfaces and deployment. Open one to see
        the screens, the stack and the details.
      </SectionIntro>
      <section className="container">
        <ProjectCard project={first} large />
      </section>
      <section className="grid-2 container">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
      <Footer />
    </>
  );
}
