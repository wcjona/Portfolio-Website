import { useCallback, useEffect, useState } from "react";

export type FontMode = "sans" | "serif";

const STORAGE_KEY = "font:v1";

function getStored(): FontMode | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "sans" || value === "serif" ? value : null;
}

function getInitial(): FontMode {
  return getStored() ?? "sans";
}

function applyFont(mode: FontMode): void {
  document.documentElement.dataset.font = mode;
}

export function useFont(): {
  font: FontMode;
  setFont: (font: FontMode) => void;
  toggle: () => void;
} {
  const [font, setFontState] = useState<FontMode>(getInitial);

  useEffect(() => {
    applyFont(font);
  }, [font]);

  const setFont = useCallback((next: FontMode): void => {
    localStorage.setItem(STORAGE_KEY, next);
    setFontState(next);
  }, []);

  const toggle = useCallback((): void => {
    setFont(font === "sans" ? "serif" : "sans");
  }, [font, setFont]);

  return { font, setFont, toggle };
}
