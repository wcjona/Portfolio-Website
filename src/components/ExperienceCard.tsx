import { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import type { Experience } from "../data/experience";
import type { CareerStockCompanySnapshot } from "../data/careerStockSnapshot";
import CareerStockChart from "./CareerStockChart";
import ExternalLinkIcon from "./ExternalLinkIcon";

type Props = {
  experience: Experience;
  marketSnapshot?: CareerStockCompanySnapshot;
};

export default function ExperienceCard({ experience, marketSnapshot }: Props): JSX.Element {
  const [showMarketSnapshot, setShowMarketSnapshot] = useState(Boolean(marketSnapshot?.isLive));

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
      {experience.bullets.length > 0 ? (
        <ul className="pf-experience-card-bullets mb-1 list-disc space-y-1.5 pl-5 text-sm leading-[21px] ink-body marker:text-accent-section">
          {experience.bullets.map((bullet) => (
            <li key={bullet} className="pf-experience-card-bullet">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {marketSnapshot ? (
        <div className="pf-experience-card-market mt-4 pt-2">
          <button
            type="button"
            aria-expanded={showMarketSnapshot}
            aria-label={showMarketSnapshot ? "Collapse market snapshot" : "Expand market snapshot"}
            onClick={() => setShowMarketSnapshot((value) => !value)}
            className="pf-experience-card-market-toggle inline-flex items-center gap-1.5 p-1 text-xs font-semibold uppercase tracking-wide ink-label transition-colors duration-200 hover:text-ink-900 dark:hover:text-zinc-100"
          >
            <FaCaretRight
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-200 ${showMarketSnapshot ? "rotate-90" : ""}`}
            />
            <span>Market Impact</span>
          </button>

          {showMarketSnapshot ? (
            <div className="pf-experience-card-market-content mt-2 pt-3">
              <CareerStockChart snapshot={marketSnapshot} compact />
            </div>
          ) : null}

          <div className="mt-3 border-t border-ink-500/15 dark:border-zinc-700" />
        </div>
      ) : null}
    </article>
  );
}
