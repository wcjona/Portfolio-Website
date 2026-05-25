import type { Experience } from "../data/experience";
import ExternalLinkIcon from "./ExternalLinkIcon";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props): JSX.Element {
  return (
    <article
      className="pf-experience-card relative self-stretch rounded-lg p-4 transition-colors duration-300 hover:bg-tint-section/80 dark:hover:bg-accent-section/[0.08]"
      data-company={experience.company}
    >
      <div className="pf-experience-card-date mb-2 h-4 text-xs font-bold uppercase leading-4 tracking-wide ink-label">
        {experience.dateRange}
      </div>
      <div className="pf-experience-card-header mb-3">
        {experience.companyHref ? (
          <a
            href={experience.companyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-experience-card-link inline-flex cursor-pointer items-center gap-1 ink-strong"
          >
            <span className="pf-experience-card-role text-base font-medium leading-5 transition-colors duration-300">
              {experience.role} · {experience.company}
            </span>
            <ExternalLinkIcon className="text-accent-section" />
          </a>
        ) : (
          <span className="pf-experience-card-role text-base font-medium leading-5 ink-strong">
            {experience.role} · {experience.company}
          </span>
        )}
        {experience.location ? (
          <div className="pf-experience-card-location mt-1 text-xs ink-muted">{experience.location}</div>
        ) : null}
      </div>
      <ul className="pf-experience-card-bullets mb-1 list-disc space-y-1.5 pl-5 text-sm leading-[21px] ink-body marker:text-accent-section">
        {experience.bullets.map((bullet) => (
          <li key={bullet} className="pf-experience-card-bullet">
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
