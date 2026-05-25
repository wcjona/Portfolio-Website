export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  links: ProjectLink[];
  cover?: string;
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "bloombot",
    title: "Bloombot · Smart Garden System",
    tagline: "Award-winning automated smart-home garden with pH control and IoT, powered by Symend.",
    description:
      "A fully automated smart-home gardening device with pH control and automatic nutrient dosing driven by live sensor readings. Awarded Best Electrical & Software Engineering Project at the University of Calgary.",
    tech: [
      "ESP32-S3",
      "C++",
      "ESP-IDF",
      "React Native",
      "React",
      "AWS IoT Core",
      "AWS Lambda",
      "DynamoDB",
      "AppSync (GraphQL)",
      "BLE",
      "MQTT",
    ],
    year: "2024 - 2025",
    links: [],
    body: [
      "Bloombot is a fully automated smart-home gardening device with pH control. Live sensor readings drive automatic nutrient dosing, lighting schedules, and watering, making any plant much easier to keep alive.",
      "I developed the embedded firmware for the ESP32-S3 microcontroller in C++ and ESP-IDF, implementing sensor acquisition, actuator control, and real-time MQTT communication with AWS IoT Core.",
      "On the user-facing side, I shipped cross-platform interfaces in React Native (mobile) and React (web) for real-time sensor monitoring, automation rule configuration, and remote actuator control.",
      "Bluetooth Low Energy provisioning lets users securely transfer Wi-Fi credentials from the mobile app to the device, streamlining onboarding. The backend is serverless on AWS Lambda (Node.js), DynamoDB, and AppSync (GraphQL) for bi-directional control and real-time data flow.",
      "I authored actuator drivers for pumps, fans, and lighting using PWM and GPIO, achieving sub-100 ms response latency to automation commands.",
      "Bloombot was awarded Best Electrical & Software Engineering Project at the University of Calgary's 2025 capstone showcase.",
    ],
  },
  {
    slug: "rating-rager",
    title: "Rating Rager",
    tagline: "Data-driven restaurant ranking system for Calgary using sentiment, trend, and geographic analysis.",
    description:
      "A dynamic weighted ranking of every Calgary restaurant combining sentiment, trend, and geographic analysis with overall rating, uniqueness, and price.",
    tech: ["Python", "Google Maps API", "VADER", "KNN", "DBSCAN", "Natural Language Inference"],
    year: "2024",
    links: [],
    body: [
      "Rating Rager is a dynamic weighted ranking system for every Calgary restaurant that combines sentiment, trend, and geographic analysis with overall rating, uniqueness, and price.",
      "I engineered a data pipeline against the Google Maps API processing 16,274 requests to gather and refine data on all 3,940 Calgary restaurants.",
      "VADER sentiment analysis on customer reviews produced accurate, timely sentiment scores. KNN and DBSCAN clustering identified under-served areas and high-performing restaurant clusters.",
      "Natural Language Inference classified cuisine types from restaurant data with 92% accuracy, filling gaps in API-provided data.",
    ],
  },
  {
    slug: "macro-pad",
    title: "Macro Pad from Scratch",
    tagline: "Custom PCB, firmware, and 3D-printed knobs.",
    description:
      "A custom macro pad designed end-to-end: PCB in KiCad, firmware in C for an AVR microcontroller, and 3D-printed rotary knobs.",
    tech: ["KiCad", "AVR", "C", "LUFA", "SolidWorks", "Prusa Slicer"],
    year: "2023 - 2024",
    links: [],
    body: [
      "A custom macro pad designed from scratch, end to end: PCB, firmware, and physical knobs.",
      "I designed the PCB in KiCad and had it manufactured via JLCPCB.",
      "Firmware was programmed for an AVR microcontroller in C using the LUFA USB library, giving it HID compatibility with any host operating system.",
      "Rotary knobs were modeled in SolidWorks and 3D printed via Prusa Slicer for a clean, custom feel.",
    ],
  },
  {
    slug: "im-slime",
    title: "I'm Slime · PvP Web Game",
    tagline: "Player-versus-Player browser game on a microservices architecture.",
    description:
      "A PvP browser game built in React on a flexible microservices-based architecture, with account creation, friends list, and an in-game shop.",
    tech: ["React", "Firebase", "Axios", "Bootstrap", "HTML", "CSS"],
    year: "2022",
    links: [],
    body: [
      "I'm Slime is a Player-versus-Player browser game built in React on a flexible microservices-based architecture.",
      "Community features include account creation, friends list, and private/public messaging, implemented with Firebase, React, and Axios.",
      "An in-game shop allows character and profile customization, built with Bootstrap, HTML, and CSS.",
    ],
  },
  {
    slug: "studyhub",
    title: "StudyHub · Tutor Marketplace",
    tagline: "Full-stack MVC marketplace connecting students with freelance tutors.",
    description:
      "A full-stack marketplace following Model-View-Controller principles to connect students with freelance tutors.",
    tech: ["Node.js", "Express", "Axios", "SQL", "HTML", "CSS", "JavaScript"],
    year: "2022",
    links: [],
    body: [
      "StudyHub is a full-stack marketplace following Model-View-Controller principles, connecting students with freelance tutors.",
      "I developed the REST API routes and a comprehensive database layer using Node.js, Axios, Express.js, and SQL.",
      "The website was designed with HTML, CSS, JavaScript, and deployed on GitHub Pages.",
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    tagline: "This site: a Vite + React + Tailwind rebuild with animated section transitions.",
    description:
      "A full rewrite of my personal portfolio with a morphing hero, animated jump-nav, runtime color palettes, and routed project detail pages.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    links: [
      { label: "GitHub", href: "https://github.com/wcjona/Portfolio-Website" },
      { label: "Live", href: "https://jonathanchong.ca" },
    ],
    body: [
      "Built on Vite + React 18 + TypeScript with Tailwind CSS for styling and Framer Motion for entrance and scroll-reveal animations.",
      "The hero is a single morphing element: scroll-driven motion values interpolate the cream panel's clip-path and the headline's position/scale, collapsing a full-viewport welcome into the left sidebar over one viewport of scroll.",
      "Sections are data-driven so adding a new experience or project is a one-line edit. Projects render as cards on the home page and have their own routed detail page at /projects/:slug.",
      "Dark mode is wired through a useTheme hook that respects prefers-color-scheme and persists choice. Color palettes are runtime-swappable via CSS variables, and adding a new palette is just three hex codes.",
    ],
  },
];

export function findProject(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
