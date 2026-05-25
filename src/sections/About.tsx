import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="pf-section pf-about flex flex-col items-start self-stretch scroll-mt-24"
    >
      <SectionHeading label="About" id="about" />
      <Reveal className="pf-about-body px-4">
        <p className="pf-about-paragraph mb-4 text-base leading-7 ink-body">
          I'm drawn to problems that don't sit cleanly in one field. My degree paired{" "}
          <span className="ink-strong font-medium">software engineering</span> with{" "}
          <span className="ink-strong font-medium">biomedical engineering</span>, and my work has ranged
          from ML models predicting protein-ligand binding, to firmware for an ESP32-powered smart garden,
          to LLM-augmented tooling for engineering teams.
        </p>
        <p className="pf-about-paragraph text-base leading-7 ink-body">
          I picked up coding in my freshman year of high school and haven't really stopped since. Outside
          of work I'm usually running, climbing, cooking, or building a side project.
        </p>
      </Reveal>
    </section>
  );
}
