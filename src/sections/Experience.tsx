import { FaArrowDown } from "react-icons/fa";
import { experiences, honors } from "../data/experience";
import { profile } from "../data/profile";
import ExperienceCard from "../components/ExperienceCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Experience(): JSX.Element {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="pf-section pf-experience mt-12 flex flex-col items-start self-stretch scroll-mt-24 sm:mt-20"
    >
      <SectionHeading label="Experience" id="experience" />
      <div className="pf-experience-list flex flex-col items-start gap-2 self-stretch">
        {experiences.map((experience, i) => (
          <Reveal key={`${experience.company}-${experience.dateRange}`} delay={i * 0.04} className="self-stretch">
            <ExperienceCard experience={experience} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 self-stretch">
        <a
          href={profile.resumeHref}
          download
          className="pf-resume-link ml-4 inline-flex cursor-pointer items-end gap-1.5 text-base font-medium leading-5 ink-strong transition-colors duration-300 hover:underline"
        >
          View Full Resume
          <FaArrowDown aria-hidden="true" className="h-3.5 w-3.5 text-accent-section" />
        </a>
      </Reveal>

      <Reveal className="mt-12 self-stretch">
        <div className="pf-honors mb-3 px-4">
          <span className="pf-honors-heading text-xs font-bold uppercase tracking-wider ink-label">
            Honors & Awards
          </span>
        </div>
        <ul className="pf-honors-list flex flex-col gap-1">
          {honors.map((honor) => (
            <li
              key={honor.title}
              className="pf-honor rounded-lg p-4 transition-colors duration-300 hover:bg-tint-section/60 dark:hover:bg-accent-section/[0.06]"
            >
              <div className="pf-honor-title text-base font-medium leading-5 ink-strong">{honor.title}</div>
              {honor.meta ? (
                <div className="pf-honor-meta mt-1 text-sm leading-5 ink-muted">{honor.meta}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
