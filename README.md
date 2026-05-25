# Jonathan Chong — Portfolio

Personal portfolio for Jonathan Chong, served at **[jonathanchong.ca](https://jonathanchong.ca)** via GitHub Pages.

## Stack

- **[Vite](https://vitejs.dev/)** + **React 18** + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)** for styling (custom palette mirroring [ariesjchang.com](https://www.ariesjchang.com/) + a derived dark theme)
- **[Framer Motion](https://www.framer.com/motion/)** for entrance, scroll-reveal, and theme-toggle animations
- **[React Router](https://reactrouter.com/)** for routed project detail pages (`/projects/:slug`)
- **[react-icons](https://react-icons.github.io/react-icons/)** for the social and UI icons

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & deploy (GitHub Pages → jonathanchong.ca)

```bash
npm run build        # outputs to dist/
npm run preview      # local preview of the production build
npm run deploy       # publishes dist/ to the gh-pages branch
```

Deploy notes:

- `vite.config.ts` writes a `404.html` copy of `index.html` so refreshing deep links like `/projects/portfolio-website` works on GH Pages.
- `public/CNAME` keeps the `jonathanchong.ca` custom domain mapped across deploys.

## Content

All content is **data-driven**:

| File | What it owns |
| --- | --- |
| `src/data/profile.ts` | Name, role tagline, location, blurb, social links |
| `src/data/experience.ts` | Work experience list + honors/awards |
| `src/data/projects.ts` | Projects (also drives the `/projects/:slug` detail pages) |

To add a new project, append an entry to `src/data/projects.ts` and the card + detail page render automatically.

## Color palettes

Palettes live in [`src/data/palettes.ts`](src/data/palettes.ts). To add one, append an entry with **two** pairs of hex codes — one for light mode, one for dark mode (pull both from [colorhunt.co](https://colorhunt.co/)):

```ts
{
  id: "mint",                                   // unique slug
  label: "Mint",                                // shown in the picker
  accents: {                                    // LIGHT MODE
    about:   "#0FB981",                         //   identity color (drives bg tint + active nav + About)
    section: "#22D3EE",                         //   shared accent for Experience + Projects sections
  },
  dark: {                                       // DARK MODE (optional)
    about:   "#6EE7B7",                         //   typically brighter so accents pop on near-black
    section: "#7DD3FC",
  },
}
```

The `dark` pair is optional — if omitted, the light accents are reused in dark mode (rarely looks great).

Auto-derived (you don't specify):

- **Hover tints** for experience / project cards — mixed with white in light mode, with near-black in dark mode
- **Page surface + sidebar backgrounds** — `about` tinted at ~4% / 15% over white (light) and ~5% / 9% over near-black (dark), so the whole page reflects the palette

### How runtime switching works

`usePalette` writes both `-light` and `-dark` CSS variables to `:root`. The `.dark` class selector in [`src/styles/index.css`](src/styles/index.css) redirects the *active* vars (e.g., `--accent-about`) to whichever variant matches the current theme. That means **toggling theme is just a class swap — no JS palette re-application required**, and **switching palette updates both modes simultaneously**.

The active palette is stored in `localStorage` under `palette` (id) and `palette-vars` (the resolved RGB triples that the FOUC-prevention script in `index.html` replays before paint).

## Stable class names & IDs

Every meaningful element has a `pf-*` class hook (and a few IDs / `data-*` attributes for unique cases). Add custom CSS targeting these in your own stylesheet — they survive across redesigns and won't get tree-shaken by Tailwind.

### Layout shell

| Hook | Where | What it is |
| --- | --- | --- |
| `.pf-shell` | `App.tsx` | Top-level wrapper around every route |
| `.pf-skip-link` | `App.tsx` | "Skip to Content" link (visible on focus) |
| `.pf-home` | `Home.tsx` | Home page wrapper (sidebar + main) |
| `.pf-main-wrapper` | `Home.tsx` | Offset container (left margin = sidebar width on lg+) that holds `.pf-main` and provides the centering context |
| `.pf-main` / `#main` | `Home.tsx` | Right-column scrolling content area (`mx-auto` centers it inside `.pf-main-wrapper` on lg+) |
| `.pf-footer` | `Home.tsx` | "Designed and built by..." footer |

### Hero (desktop morph)

| Hook | What it is |
| --- | --- |
| `.pf-hero-panel` | Cream background panel that morphs from full-viewport to sidebar |
| `.pf-hero-name` / `#hero-name` | The morphing "Jonathan Chong" headline |
| `.pf-hero-chrome` | Wrapper around greeting + subtitle + scroll hint (fades out on scroll) |
| `.pf-hero-greeting` | "hi, i'm" line — positioned at `top-[33vh]` (17vh above the headline center) |
| `.pf-hero-subtitle` | Subtitle line that hosts the typewriter — positioned at `top-[67vh]` (17vh below the headline center). Tweak the `top-[Xvh]` value on either to move them; keep symmetry for matching gaps. |

### Mobile hero & header

| Hook | What it is |
| --- | --- |
| `.pf-mobile-hero` | First full-screen section on mobile |
| `.pf-mobile-hero-greeting` / `.pf-mobile-hero-name` / `.pf-mobile-hero-subtitle` | The three stacked lines |
| `.pf-mobile-header` | Second mobile section with sidebar info |
| `.pf-mobile-header-top` | Row containing name + theme/palette toggles |
| `.pf-mobile-header-name` / `.pf-mobile-header-role` / `.pf-mobile-header-location` / `.pf-mobile-header-blurb` | Individual text rows |
| `.pf-mobile-header-toggles` | Palette + theme toggle pair |
| `.pf-mobile-header-socials` | Social icon row |

### Sidebar details (desktop)

| Hook | What it is |
| --- | --- |
| `.pf-sidebar` (also `.pf-sidebar--desktop`) | The fixed sidebar container (only the details — the headline is `pf-hero-name`) |
| `.pf-sidebar-role` | Role tagline (`profile.role`) |
| `.pf-sidebar-location` | Location row |
| `.pf-sidebar-blurb` | Bio paragraph |
| `.pf-sidebar-jumpnav` | Wrapper around the jump-nav |
| `.pf-sidebar-actions` | Bottom row (socials + toggles) |
| `.pf-sidebar-socials` | Social icon group |
| `.pf-sidebar-toggles` | Palette + theme toggle pair |
| `.pf-social-link` (with `data-social="github\|linkedin\|email"`) | Each social icon link |

### Jump nav

| Hook | What it is |
| --- | --- |
| `.pf-jump-nav` | The `<nav>` |
| `.pf-jump-nav-item` (with `data-target="about\|experience\|projects"`) | Each button |
| `.pf-jump-nav-item--active` | Modifier added to the currently-visible section's button |
| `.pf-jump-nav-line` | Animated underline |
| `.pf-jump-nav-label` | Text label |

### Sections (in main column)

| Hook | What it is |
| --- | --- |
| `.pf-section` | All sections share this |
| `.pf-about` / `.pf-experience` / `.pf-projects` | Section-specific |
| `#about` / `#experience` / `#projects` | Scroll targets |
| `.pf-section-heading` (with `data-section="about\|experience\|projects"`) | Sticky-on-mobile section label; modifier classes `--mobile` / `--desktop` |
| `.pf-about-paragraph` | Each `<p>` inside the About section |

### Experience cards

| Hook | What it is |
| --- | --- |
| `.pf-experience-list` | Container `<div>` |
| `.pf-experience-card` (with `data-company="..."`) | Each card |
| `.pf-experience-card-date` | "JUL 2025 — PRESENT"-style label |
| `.pf-experience-card-header` | Wrapper for role + link arrow |
| `.pf-experience-card-link` | The `<a>` to the company page |
| `.pf-experience-card-role` | "Role · Company" text |
| `.pf-experience-card-location` | Location line under role |
| `.pf-experience-card-bullets` / `.pf-experience-card-bullet` | Bullet `<ul>` / `<li>` |
| `.pf-resume-link` | "View Full Resume" download link |
| `.pf-honors` / `.pf-honors-heading` / `.pf-honors-list` / `.pf-honor` / `.pf-honor-title` / `.pf-honor-meta` | Honors & Awards block |

### Project cards & detail page

| Hook | What it is |
| --- | --- |
| `.pf-projects-list` | Container `<div>` |
| `.pf-project-card` (with `data-project="slug"`) | Each card |
| `.pf-project-card-header` | Top row with title + year |
| `.pf-project-card-title` / `.pf-project-card-year` / `.pf-project-card-description` | Card text |
| `.pf-project-card-tech` / `.pf-tech-chip` | Tech chip list / individual chips |
| `.pf-project-detail` | Detail page `<main>` |
| `.pf-project-detail-bar` | Top bar with "Back" + toggles |
| `.pf-project-detail-back` / `.pf-project-detail-actions` | Left/right halves of the bar |
| `.pf-project-detail-article` | The `<article>` |
| `.pf-project-detail-year` / `.pf-project-detail-title` / `.pf-project-detail-tagline` | Hero text |
| `.pf-project-detail-tech` / `.pf-project-detail-links` / `.pf-project-detail-link` / `.pf-project-detail-cover` / `.pf-project-detail-body` | Body sections |

### Controls

| Hook | What it is |
| --- | --- |
| `.pf-theme-toggle` (with `data-theme="light\|dark"`) | Sun/moon toggle button |
| `.pf-palette-switcher` (with `data-palette="ember\|ocean\|..."`) | Palette switcher root |
| `.pf-palette-switcher-trigger` | The clickable button |
| `.pf-palette-switcher-menu` | The popover `<ul>` |
| `.pf-palette-switcher-item` (with `data-palette="..."`) | Each `<li>` |
| `.pf-palette-switcher-option` / `--active` | The button inside each item |
| `.pf-typewriter` (or `--reduced` for `prefers-reduced-motion`) | Wrapper span |
| `.pf-typewriter-article` / `.pf-typewriter-word` / `.pf-typewriter-caret` | "An" / typed text / blinking caret |

## Customizing styles

The project uses a **hybrid** approach (the same one the Tailwind team recommends):

- **Tailwind utility classes inline in JSX** — for layout (`flex`, `grid`, `absolute`), responsive variants (`sm:`, `lg:`, `xl:`), dark mode (`dark:`), hover/focus states, and conditional/active classes. These are concise and ergonomic inline.
- **`src/styles/components.css`** — for "tunable" values you'll iterate on (positions, sizes, paddings, typography) targeted at the `pf-*` hooks above. This file is loaded **after** Tailwind's utility layer in `src/main.tsx`, so any rule defined here wins specificity ties against the inline utilities.

Use `@apply` inside `components.css` to keep design tokens (Tailwind utility names) without losing CSS file ergonomics:

```css
/* src/styles/components.css */
.pf-hero-subtitle {
  @apply text-2xl font-normal sm:text-3xl;
  top: 67vh;
}

/* Tighten experience card bullet spacing */
.pf-experience-card-bullets {
  gap: 0.25rem;
}

/* Custom hover for Garmin card only */
.pf-experience-card[data-company="Garmin"]:hover {
  outline: 1px solid rgb(var(--accent-section) / 0.5);
}

/* Make the morphing hero name even bigger on huge displays */
@media (min-width: 1600px) {
  .pf-hero-name {
    font-size: 3rem;
  }
}
```

### Pattern summary

| Where it lives | What goes there |
| --- | --- |
| **JSX `className`** | layout primitives, responsive variants, dark mode, hover/focus, conditional classes, animation-driven classes |
| **`components.css` (with `@apply`)** | font sizes, positions, paddings, colors, hover tints — anything you'll tweak repeatedly via the `pf-*` hooks |
| **`tailwind.config.js`** | design tokens (colors, fonts, breakpoints) |
| **`index.css` `:root`** | CSS variable defaults (palette, sidebar width) |

## Layout

```
src/
  App.tsx                # router shell + skip-to-content link
  main.tsx               # entry, mounts BrowserRouter
  components/
    Sidebar.tsx          # fixed left sidebar (lg+) / top header (mobile)
    JumpNav.tsx          # in-page nav with animated underline + active section detection
    ThemeToggle.tsx      # accessible role=switch sun/moon toggle
    Reveal.tsx           # scroll-reveal wrapper (respects prefers-reduced-motion)
    ExperienceCard.tsx
    ProjectCard.tsx
    ExternalLinkIcon.tsx
    SectionHeading.tsx
  sections/
    About.tsx
    Experience.tsx
    Projects.tsx
  pages/
    Home.tsx
    ProjectDetail.tsx
    NotFound.tsx
  hooks/
    useTheme.ts          # localStorage + prefers-color-scheme; toggles html.dark
    useActiveSection.ts  # IntersectionObserver-driven active section id
  data/{profile,experience,projects}.ts
  styles/index.css       # tailwind base/components/utilities + small globals
```
