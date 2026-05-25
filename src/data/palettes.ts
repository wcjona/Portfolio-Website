/**
 * Each palette has two roles:
 *   - about:   identity color (drives bg tint + active nav + About section)
 *   - section: shared accent for Experience + Projects
 *
 * `accents` is used in light mode; `dark` (optional) is used in dark mode.
 * Background tints are derived from these in src/hooks/usePalette.ts.
 */

type PaletteAccents = {
  about: string;
  section: string;
};

export type Palette = {
  id: string;
  label: string;
  accents: PaletteAccents;
  dark?: PaletteAccents;
};

export const palettes: readonly Palette[] = [
  {
    id: "citrus",
    label: "Citrus",
    accents: { about: "#EAB308", section: "#F59E0B" },
    dark: { about: "#b62d07", section: "#eb6301" },
  },
  {
    id: "pacific",
    label: "Pacific",
    accents: { about: "#1E40AF", section: "#0EA5E9" },
    dark: { about: "#60A5FA", section: "#7DD3FC" },
  },
  {
    id: "forest",
    label: "Forest",
    accents: { about: "#098440", section: "#059669" },
    dark: { about: "#4ADE80", section: "#34D399" },
  },
  {
    id: "blossom",
    label: "Blossom",
    accents: { about: "#DB2777", section: "#EC4899" },
    dark: { about: "#F472B6", section: "#FB7185" },
  },
  {
    id: "mocha",
    label: "Mocha",
    accents: { about: "#5C2300", section: "#C8530E" },
    dark: { about: "#C8A98E", section: "#E5C99C" },
  },
];

export const DEFAULT_PALETTE_ID = "citrus";

export function findPalette(id: string | undefined | null): Palette {
  if (id) {
    const found = palettes.find((p) => p.id === id);
    if (found) return found;
  }
  const fallback = palettes.find((p) => p.id === DEFAULT_PALETTE_ID) ?? palettes[0];
  if (!fallback) throw new Error("No palettes defined");
  return fallback;
}
