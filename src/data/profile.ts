export type SocialLink = {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email";
};

export type HeroTitle = { article: "A" | "An"; word: string };

export const profile = {
  name: "Jonathan Chong",
  greeting: "Hi, I'm",
  role: "Software Engineer Building Reliable Systems",
  location: "Toronto, Ontario, Canada",
  blurb:
    "I build full-stack platforms, ML systems, and embedded firmware. Recent University of Calgary Software Engineering grad (Biomed minor) with internships at AMD, Garmin, and Neocycle, shipping tools used by hundreds.",
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
