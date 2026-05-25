import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { useActiveSection } from "../hooks/useActiveSection";

type SectionId = "about" | "experience" | "projects";

type NavItem = {
  id: SectionId;
  label: string;
  accentClass: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About", accentClass: "bg-accent-about" },
  { id: "experience", label: "Experience", accentClass: "bg-accent-section" },
  { id: "projects", label: "Projects", accentClass: "bg-accent-section" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function JumpNav(): JSX.Element {
  const active = useActiveSection(SECTION_IDS) as SectionId;
  const reduce = useReducedMotion();

  return (
    <nav aria-label="In-page jump links" className="pf-jump-nav flex flex-col items-start">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={clsx(
              "pf-jump-nav-item group flex w-full items-center gap-4 py-3 text-left",
              isActive && "pf-jump-nav-item--active",
            )}
            data-target={item.id}
            aria-current={isActive ? "true" : undefined}
          >
            <motion.span
              aria-hidden="true"
              className={clsx(
                "pf-jump-nav-line h-px transition-colors duration-300",
                isActive ? item.accentClass : "bg-ink-500/40 group-hover:bg-ink-700/60 dark:group-hover:bg-zinc-400",
              )}
              animate={reduce ? undefined : { width: isActive ? 48 : 32 }}
              initial={false}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={reduce ? { width: isActive ? 48 : 32 } : undefined}
            />
            <span
              className={clsx(
                "pf-jump-nav-label text-[12px] font-bold uppercase tracking-wider transition-colors duration-300",
                isActive
                  ? "ink-strong"
                  : "ink-label group-hover:text-ink-900 dark:group-hover:text-zinc-100",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
