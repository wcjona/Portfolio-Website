import { motion, useReducedMotion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { findProject } from "../data/projects";
import ExternalLinkIcon from "../components/ExternalLinkIcon";
import PaletteSwitcher from "../components/PaletteSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import NotFound from "./NotFound";

export default function ProjectDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const project = findProject(slug);
  const reduce = useReducedMotion();

  if (!project) return <NotFound />;

  return (
    <main
      id="main"
      className="pf-project-detail mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pb-24 pt-10 sm:px-10"
    >
      <div className="pf-project-detail-bar mb-8 flex items-center justify-between">
        <Link
          to="/#projects"
          className="pf-project-detail-back inline-flex items-center gap-2 text-sm font-medium ink-label transition-colors duration-200 hover:text-ink-900 dark:hover:text-zinc-100"
        >
          <FaArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to all projects
        </Link>
        <div className="pf-project-detail-actions flex items-center gap-2">
          <PaletteSwitcher placement="bottom" />
          <ThemeToggle />
        </div>
      </div>

      <motion.article
        className="pf-project-detail-article"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="pf-project-detail-year mb-2 text-xs font-bold uppercase tracking-wider ink-muted">{project.year}</div>
        <h1 className="pf-project-detail-title text-3xl font-bold tracking-tight ink-strong sm:text-4xl">{project.title}</h1>
        <p className="pf-project-detail-tagline mt-3 text-lg leading-7 ink-body">{project.tagline}</p>

        {project.tech.length > 0 ? (
          <ul className="pf-project-detail-tech mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="pf-tech-chip rounded-full border border-ink-500/15 px-2.5 py-0.5 text-xs font-medium ink-label dark:border-zinc-700"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {project.links.length > 0 ? (
          <div className="pf-project-detail-links mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-project-detail-link inline-flex items-center gap-1.5 rounded-md border border-ink-500/20 px-3 py-1.5 text-sm font-medium ink-strong transition-colors duration-200 hover:border-accent-section/60 hover:bg-tint-section/60 dark:border-zinc-700 dark:hover:bg-accent-section/[0.08]"
              >
                {link.label}
                <ExternalLinkIcon className="text-accent-section" />
              </a>
            ))}
          </div>
        ) : null}

        {project.cover ? (
          <img
            src={project.cover}
            alt={`${project.title} cover`}
            className="pf-project-detail-cover mt-10 w-full rounded-lg border border-ink-500/10 dark:border-zinc-800"
          />
        ) : null}

        <div className="pf-project-detail-body prose-content mt-10 space-y-5 text-base leading-7 ink-body">
          {project.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.article>
    </main>
  );
}
