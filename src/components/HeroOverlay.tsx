import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { profile } from "../data/profile";
import Typewriter from "./Typewriter";

/**
 * Desktop-only morph: starts as a full-viewport hero, then collapses into the
 * left sidebar as the user scrolls through the first viewport of page height.
 */
type Props = { children: ReactNode };

export default function HeroOverlay({ children }: Props): JSX.Element {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const [runway, setRunway] = useState<number>(() => window.innerHeight);
  useEffect(() => {
    const update = (): void => setRunway(window.innerHeight);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const progress = useTransform(scrollY, [0, runway], [0, 1], { clamp: true });

  const panelClip = useMotionTemplate`inset(0 calc(${progress} * (100vw - var(--sidebar-w))) 0 0)`;

  // Headline morph: viewport center at progress=0, sidebar top-left at progress=1.
  const headlineLeft = useMotionTemplate`calc(${progress} * 2.5rem + (1 - ${progress}) * 50vw)`;
  const headlineTop = useMotionTemplate`calc(${progress} * 5rem + (1 - ${progress}) * 50vh)`;
  const headlineX = useTransform(progress, [0, 1], ["-50%", "0%"]);
  const headlineY = useTransform(progress, [0, 1], ["-50%", "0%"]);
  const headlineScale = useTransform(progress, [0, 1], [2.4, 1]);

  const heroChromeOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const heroChromePointer = useTransform(progress, (p) => (p < 0.5 ? "auto" : "none"));

  const detailsOpacity = useTransform(progress, [0.55, 1], [0, 1]);
  const detailsPointer = useTransform(progress, (p) => (p > 0.6 ? "auto" : "none"));

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { clipPath: panelClip }}
        className="pf-hero-panel pointer-events-none fixed inset-0 z-10 bg-sidebar"
      />

      <motion.h1
        id="hero-name"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: reduce ? 0 : 0.7 }}
        style={
          reduce
            ? { left: "2.5rem", top: "5rem", position: "fixed" }
            : {
                position: "fixed",
                left: headlineLeft,
                top: headlineTop,
                x: headlineX,
                y: headlineY,
                scale: headlineScale,
                transformOrigin: "center center",
              }
        }
        className="pf-hero-name z-30 whitespace-nowrap text-2xl font-bold leading-tight tracking-tight ink-strong xl:text-4xl xl:leading-[48px]"
      >
        {profile.name}
      </motion.h1>

      {/* Hero chrome: greeting + subtitle absolutely positioned at fixed `top-[Xvh]`
          so the scaled headline can't push them around. Tunable styles for these
          elements live in src/styles/components.css. */}
      <motion.div
        style={reduce ? { opacity: 0, pointerEvents: "none" } : { opacity: heroChromeOpacity, pointerEvents: heroChromePointer }}
        className="pf-hero-chrome fixed inset-0 z-20 px-6 text-center"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: reduce ? 0 : 0.2 }}
          className="pf-hero-greeting absolute inset-x-0 ink-muted"
        >
          {profile.greeting}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: reduce ? 0 : 1.2 }}
          className="pf-hero-subtitle absolute inset-x-0 ink-body"
        >
          <Typewriter phrases={profile.heroTitles} startDelayMs={1800} />
        </motion.p>
      </motion.div>

      <motion.div
        style={reduce ? { opacity: 1 } : { opacity: detailsOpacity, pointerEvents: detailsPointer }}
        className="pf-sidebar pf-sidebar--desktop fixed left-10 top-[8.5rem] z-30 flex h-[calc(100vh-9rem)] w-[260px] flex-col xl:left-10 xl:top-[10rem] xl:w-[400px]"
      >
        {children}
      </motion.div>
    </>
  );
}
