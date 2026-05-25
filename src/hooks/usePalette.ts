import { useCallback, useEffect, useSyncExternalStore } from "react";
import { DEFAULT_PALETTE_ID, findPalette, palettes } from "../data/palettes";
import type { Palette } from "../data/palettes";

// :v2 prefix bumps storage when palette defaults change so returning visitors
// land on the new default instead of a stale stored choice.
const ID_KEY = "palette:v2";
const VARS_KEY = "palette-vars:v2";
const EVENT_NAME = "palette-change";

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "").trim();
  const normalized =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0").slice(0, 6);
  return {
    r: parseInt(normalized.substring(0, 2), 16),
    g: parseInt(normalized.substring(2, 4), 16),
    b: parseInt(normalized.substring(4, 6), 16),
  };
}

function rgbStr({ r, g, b }: Rgb): string {
  return `${r} ${g} ${b}`;
}

/** Mix an accent toward an arbitrary base color (white for light tints, near-black for dark). */
function mixWithBase(accentHex: string, baseHex: string, baseRatio: number): Rgb {
  const a = hexToRgb(accentHex);
  const b = hexToRgb(baseHex);
  const accentRatio = 1 - baseRatio;
  return {
    r: Math.round(a.r * accentRatio + b.r * baseRatio),
    g: Math.round(a.g * accentRatio + b.g * baseRatio),
    b: Math.round(a.b * accentRatio + b.b * baseRatio),
  };
}

const LIGHT_BASE = "#ffffff";
const DARK_SURFACE_BASE = "#0E0E10";
const DARK_SIDEBAR_BASE = "#181412";

function lightTint(hex: string, mix = 0.86): Rgb {
  return mixWithBase(hex, LIGHT_BASE, mix);
}

function darkTint(hex: string, mix = 0.85): Rgb {
  return mixWithBase(hex, DARK_SIDEBAR_BASE, mix);
}

export function paletteToCssVars(p: Palette): Record<string, string> {
  const light = p.accents;
  const dark = p.dark ?? p.accents;
  return {
    "--accent-about-light": rgbStr(hexToRgb(light.about)),
    "--accent-section-light": rgbStr(hexToRgb(light.section)),
    "--tint-section-light": rgbStr(lightTint(light.section)),
    // Page surface at 4% accent over white; sidebar at 15%.
    "--surface-light": rgbStr(mixWithBase(light.about, LIGHT_BASE, 0.96)),
    "--sidebar-light": rgbStr(mixWithBase(light.about, LIGHT_BASE, 0.85)),

    "--accent-about-dark": rgbStr(hexToRgb(dark.about)),
    "--accent-section-dark": rgbStr(hexToRgb(dark.section)),
    "--tint-section-dark": rgbStr(darkTint(dark.section)),
    // Moderate dark-mode tint (5% / 9%) so warm hues don't read as muddy brown
    // when mixed with near-black.
    "--surface-dark": rgbStr(mixWithBase(dark.about, DARK_SURFACE_BASE, 0.95)),
    "--sidebar-dark": rgbStr(mixWithBase(dark.about, DARK_SIDEBAR_BASE, 0.91)),
  };
}

function applyPalette(p: Palette): void {
  const vars = paletteToCssVars(p);
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
  root.dataset.palette = p.id;
  localStorage.setItem(ID_KEY, p.id);
  localStorage.setItem(VARS_KEY, JSON.stringify(vars));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  return localStorage.getItem(ID_KEY) ?? DEFAULT_PALETTE_ID;
}

export function usePalette(): {
  palette: Palette;
  setPaletteId: (id: string) => void;
  palettes: readonly Palette[];
} {
  const id = useSyncExternalStore(subscribe, getSnapshot);
  const palette = findPalette(id);

  // Re-apply on mount in case the pre-paint FOUC script ran before
  // localStorage was readable.
  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  const setPaletteId = useCallback((nextId: string): void => {
    applyPalette(findPalette(nextId));
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return { palette, setPaletteId, palettes };
}
