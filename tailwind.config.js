/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // surface/sidebar/accent/tint resolve via CSS vars defined in
        // src/styles/index.css. They auto-switch between light/dark variants
        // via the .dark class on <html>, so no `dark:` variants are needed.
        surface: "rgb(var(--surface) / <alpha-value>)",
        sidebar: "rgb(var(--sidebar) / <alpha-value>)",
        ink: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          icon: "#475569",
        },
        accent: {
          about: "rgb(var(--accent-about) / <alpha-value>)",
          section: "rgb(var(--accent-section) / <alpha-value>)",
        },
        tint: {
          section: "rgb(var(--tint-section) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        blink: "blink 1.05s step-end infinite",
      },
    },
  },
  plugins: [],
};
