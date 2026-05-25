import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// GH Pages SPA fallback: serve the same SPA shell for unknown paths so BrowserRouter handles routing.
function spaFallback() {
  return {
    name: "spa-fallback-404",
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const index = resolve(outDir, "index.html");
      const notFound = resolve(outDir, "404.html");
      if (existsSync(index)) copyFileSync(index, notFound);
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), spaFallback()],
  server: { port: 3000, open: true },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
