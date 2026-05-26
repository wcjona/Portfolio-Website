export type SocialLink = {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email";
};

export type HeroTitle = { article: "A" | "An"; word: string };

export const profile = {
  name: "Jonathan Chong",
  greeting: "Hi, I'm",
  role: "Software Development Engineer II at AMD",
  location: "Toronto, Ontario, Canada",
  blurb:
    "Software Development Engineer II at AMD building reliable systems across full-stack platforms, ML workflows, and embedded tooling. University of Calgary Software Engineering grad (Biomed minor) with prior internships at AMD, Garmin, and Neocycle.",
  socials: [
    { label: "GitHub", href: "https://github.com/wcjona", kind: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jonathanchongyyc", kind: "linkedin" },
    { label: "Email", href: "mailto:jonathanchongyyc@gmail.com", kind: "email" },
  ] satisfies SocialLink[],
  heroTitles: [
    { article: "A", word: "Software Engineer" },
    { article: "A", word: "Full-Stack Developer" },
    { article: "A", word: "Machine Learning Engineer" },
    { article: "An", word: "Embedded Systems Engineer" },
    { article: "A", word: "Synthetic Biology Developer" },
    { article: "An", word: "Automation Engineer" },
    { article: "An", word: "Open-Source Contributor" },
  ] satisfies HeroTitle[],
  resumeHref: "/Resume.pdf",
} as const;
