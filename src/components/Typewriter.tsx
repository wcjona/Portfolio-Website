import { useEffect, useState } from "react";
import { useReducedMotionConfig } from "framer-motion";
import type { HeroTitle } from "../data/profile";

type Phase = "typing" | "holding" | "erasing" | "paused";

type Props = {
  phrases: readonly HeroTitle[];
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
  pauseMs?: number;
  startDelayMs?: number;
};

export default function Typewriter({
  phrases,
  typeMs = 75,
  eraseMs = 35,
  holdMs = 1600,
  pauseMs = 380,
  startDelayMs = 0,
}: Props): JSX.Element {
  const reduce = useReducedMotionConfig();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [started, setStarted] = useState(false);

  // Hold off on starting until the surrounding chrome has faded in.
  useEffect(() => {
    if (reduce) return;
    if (startDelayMs <= 0) {
      setStarted(true);
      return;
    }
    const t = window.setTimeout(() => setStarted(true), startDelayMs);
    return () => window.clearTimeout(t);
  }, [reduce, startDelayMs]);

  const current = phrases[index] ?? phrases[0];

  useEffect(() => {
    if (reduce || !started || !current) return;

    let timer: number | undefined;

    switch (phase) {
      case "typing":
        if (text.length < current.word.length) {
          timer = window.setTimeout(() => setText(current.word.slice(0, text.length + 1)), typeMs);
        } else {
          setPhase("holding");
        }
        break;
      case "holding":
        timer = window.setTimeout(() => setPhase("erasing"), holdMs);
        break;
      case "erasing":
        if (text.length > 0) {
          timer = window.setTimeout(() => setText(text.slice(0, -1)), eraseMs);
        } else {
          setPhase("paused");
        }
        break;
      case "paused":
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, pauseMs);
        break;
      default: {
        const _exhaustive: never = phase;
        throw new Error(`Unhandled phase: ${_exhaustive as string}`);
      }
    }

    return () => window.clearTimeout(timer);
  }, [phase, text, current, phrases.length, typeMs, eraseMs, holdMs, pauseMs, reduce, started]);

  if (reduce) {
    const fallback = phrases[0];
    return (
      <span aria-live="polite" className="pf-typewriter pf-typewriter--reduced">
        {fallback ? `${fallback.article} ${fallback.word}.` : ""}
      </span>
    );
  }

  const article = current?.article ?? "An";

  return (
    <span aria-live="polite" className="pf-typewriter inline-flex items-baseline">
      <span className="pf-typewriter-article">{article}&nbsp;</span>
      <span className="pf-typewriter-word ink-strong font-medium">{text}</span>
      <span
        aria-hidden="true"
        className="pf-typewriter-caret ml-1 inline-block h-[1em] w-[2px] translate-y-[0.18em] bg-current animate-blink"
      />
    </span>
  );
}
