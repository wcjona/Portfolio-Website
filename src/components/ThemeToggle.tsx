import { AnimatePresence, motion, useReducedMotionConfig } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle(): JSX.Element {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const reduce = useReducedMotionConfig();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      data-theme={theme}
      className="pf-theme-toggle group inline-flex items-center gap-2 rounded-full border border-ink-500/20 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 shadow-sm backdrop-blur transition-colors duration-200 hover:border-accent-about/60 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-about/40 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={reduce ? false : { rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <FaMoon aria-hidden="true" className="h-3.5 w-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={reduce ? false : { rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <FaSun aria-hidden="true" className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
