import { AnimatePresence, motion, useReducedMotionConfig } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { FaCheck, FaPalette } from "react-icons/fa";
import clsx from "clsx";
import { usePalette } from "../hooks/usePalette";
import type { Palette } from "../data/palettes";

type Placement = "top" | "bottom";
type Props = { placement?: Placement };

function Swatches({ palette, size = "sm" }: { palette: Palette; size?: "sm" | "md" }): JSX.Element {
  const dot = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-0.5">
      <span className={clsx(dot, "rounded-full")} style={{ backgroundColor: palette.accents.about }} />
      <span className={clsx(dot, "rounded-full")} style={{ backgroundColor: palette.accents.section }} />
    </span>
  );
}

export default function PaletteSwitcher({ placement = "top" }: Props): JSX.Element {
  const { palette, setPaletteId, palettes } = usePalette();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotionConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const panelPlacementClass =
    placement === "top" ? "bottom-full mb-2 origin-bottom-left" : "top-full mt-2 origin-top-left";

  return (
    <div ref={containerRef} className="pf-palette-switcher relative inline-flex" data-palette={palette.id}>
      <button
        type="button"
        aria-label={`Change color palette (current: ${palette.label})`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className="pf-palette-switcher-trigger group inline-flex items-center gap-1.5 rounded-full border border-ink-500/20 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 shadow-sm backdrop-blur transition-colors duration-200 hover:border-accent-about/60 hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-about/40 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50"
      >
        <FaPalette aria-hidden="true" className="h-3 w-3" />
        <Swatches palette={palette} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label="Color palette"
            initial={reduce ? false : { opacity: 0, y: placement === "top" ? 4 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: placement === "top" ? 4 : -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={clsx(
              "pf-palette-switcher-menu absolute left-0 z-40 min-w-[180px] rounded-lg border border-ink-500/15 bg-white p-1.5 shadow-lg shadow-black/5 dark:border-zinc-700 dark:bg-zinc-900",
              panelPlacementClass,
            )}
          >
            {palettes.map((p) => {
              const isActive = p.id === palette.id;
              return (
                <li key={p.id} className="pf-palette-switcher-item" data-palette={p.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setPaletteId(p.id);
                      setOpen(false);
                    }}
                    className={clsx(
                      "pf-palette-switcher-option flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors duration-150",
                      isActive
                        ? "pf-palette-switcher-option--active bg-ink-500/5 ink-strong dark:bg-zinc-800"
                        : "ink-body hover:bg-ink-500/5 hover:ink-strong dark:hover:bg-zinc-800",
                    )}
                  >
                    <Swatches palette={p} size="md" />
                    <span className="flex-1 font-medium">{p.label}</span>
                    {isActive ? (
                      <FaCheck aria-hidden="true" className="h-3 w-3 ink-muted" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
