import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import ExternalLinkIcon from "./ExternalLinkIcon";

type Props = { project: Project };

export default function ProjectCard({ project }: Props): JSX.Element {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="pf-project-card group relative flex flex-col gap-2 self-stretch rounded-lg p-4 transition-colors duration-300 hover:bg-tint-section/80 dark:hover:bg-accent-section/[0.08]"
      data-project={project.slug}
    >
      <div className="pf-project-card-header mb-1 flex items-center justify-between">
        <span className="pf-project-card-title-row inline-flex items-center gap-1 ink-strong">
          <span className="pf-project-card-title text-base font-medium leading-5">{project.title}</span>
          <ExternalLinkIcon className="text-accent-section" />
        </span>
        <span className="pf-project-card-year text-xs font-semibold uppercase tracking-wider ink-muted">
          {project.year}
        </span>
      </div>
      <p className="pf-project-card-description text-sm font-normal leading-[21px] ink-body">{project.description}</p>
      {project.tech.length > 0 ? (
        <ul className="pf-project-card-tech mt-1 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="pf-tech-chip rounded-full border border-ink-500/15 px-2 py-0.5 text-[11px] font-medium ink-label dark:border-zinc-700"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}
