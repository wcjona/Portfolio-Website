import { FaFont } from "react-icons/fa";
import { useFont } from "../hooks/useFont";

export default function FontToggle(): JSX.Element {
  const { font, toggle } = useFont();
  const isSerif = font === "serif";

  return (
    <button
      type="button"
      aria-pressed={isSerif}
      aria-label={isSerif ? "Switch to sans font" : "Switch to serif font"}
      onClick={toggle}
      data-font={font}
      className="pf-font-toggle inline-flex items-center gap-1.5 rounded-full border border-ink-500/20 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 shadow-sm backdrop-blur transition-colors duration-200 hover:border-accent-about/60 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-about/40 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50"
    >
      <FaFont aria-hidden="true" className="h-3 w-3" />
      <span>{isSerif ? "Serif" : "Sans"}</span>
    </button>
  );
}
