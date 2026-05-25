import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Projects(): JSX.Element {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="pf-section pf-projects mt-12 flex flex-col items-start self-stretch scroll-mt-24 sm:mt-20"
    >
      <SectionHeading label="Projects" id="projects" />
      <div className="pf-projects-list flex flex-col items-start gap-2 self-stretch">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.04} className="self-stretch">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
