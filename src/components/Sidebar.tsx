import { motion, useReducedMotionConfig } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { profile } from "../data/profile";
import type { SocialLink } from "../data/profile";
import HeroOverlay from "./HeroOverlay";
import JumpNav from "./JumpNav";
import FontToggle from "./FontToggle";
import PaletteSwitcher from "./PaletteSwitcher";
import ThemeToggle from "./ThemeToggle";
import Typewriter from "./Typewriter";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function SocialIcon({ kind }: { kind: SocialLink["kind"] }): JSX.Element {
  const cls =
    "h-5 w-5 text-ink-icon dark:text-zinc-400 transition-colors duration-200 group-hover:text-ink-900 dark:group-hover:text-zinc-100";
  switch (kind) {
    case "github":
      return <FaGithub aria-hidden="true" className={cls} />;
    case "linkedin":
      return <FaLinkedin aria-hidden="true" className={cls} />;
    case "email":
      return <FaEnvelope aria-hidden="true" className={cls} />;
    default: {
      const _exhaustive: never = kind;
      throw new Error(`Unhandled social kind: ${_exhaustive as string}`);
    }
  }
}

function SidebarDetails(): JSX.Element {
  return (
    <>
      <h2 className="pf-sidebar-role mb-4 w-full text-lg font-normal leading-6 tracking-tight ink-strong xl:text-xl xl:leading-7">
        {profile.role}
      </h2>
      <div
        className="pf-sidebar-location mb-4 flex w-full items-center gap-1.5 text-sm ink-muted"
        aria-label="Location"
      >
        <FaMapMarkerAlt aria-hidden="true" className="h-4 w-4" />
        <span>{profile.location}</span>
      </div>
      <p className="pf-sidebar-blurb mb-10 w-full max-w-full text-base font-normal leading-6 ink-body">
        {profile.blurb}
      </p>

      <div className="pf-sidebar-jumpnav mb-10">
        <JumpNav />
      </div>

      <div className="pf-sidebar-actions mt-auto mb-6 flex flex-wrap items-center gap-3">
        <div className="pf-sidebar-socials flex items-center gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.kind}
              href={social.href}
              target={social.kind === "email" ? undefined : "_blank"}
              rel={social.kind === "email" ? undefined : "noopener noreferrer"}
              aria-label={`${social.label}${social.kind === "email" ? " (opens mail client)" : " (opens in a new tab)"}`}
              className="pf-social-link group inline-flex cursor-pointer items-center transition-opacity duration-200 hover:opacity-80"
              data-social={social.kind}
            >
              <SocialIcon kind={social.kind} />
            </a>
          ))}
        </div>
        <span className="pf-sidebar-toggles ml-1 flex items-center gap-2">
          <PaletteSwitcher placement="top" />
          <FontToggle />
          <ThemeToggle />
        </span>
      </div>
    </>
  );
}

const mobileHeroVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.5, delayChildren: 0.2 } },
};

function MobileHero(): JSX.Element {
  const reduce = useReducedMotionConfig();
  const initial = reduce ? false : "hidden";

  return (
    <motion.section
      variants={mobileHeroVariants}
      initial={initial}
      animate="show"
      className="pf-mobile-hero relative flex min-h-screen flex-col items-center justify-center bg-sidebar px-6 text-center sm:px-10 lg:hidden"
      aria-label="Hero"
    >
      <motion.p
        variants={itemVariants}
        className="pf-mobile-hero-greeting ink-muted"
      >
        {profile.greeting}
      </motion.p>
      <motion.h1
        variants={itemVariants}
        className="pf-mobile-hero-name mt-6 text-4xl font-bold leading-tight tracking-tight ink-strong sm:text-5xl"
      >
        {profile.name}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="pf-mobile-hero-subtitle mt-10 text-xl font-normal ink-body sm:text-2xl"
      >
        <Typewriter phrases={profile.heroTitles} startDelayMs={1400} />
      </motion.p>
    </motion.section>
  );
}

function MobileHeader(): JSX.Element {
  const reduce = useReducedMotionConfig();
  const initial = reduce ? false : "hidden";

  return (
    <motion.header
      variants={containerVariants}
      initial={initial}
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="pf-mobile-header flex flex-col items-start bg-sidebar px-6 pb-8 pt-12 sm:px-10 lg:hidden"
    >
      <div className="pf-mobile-header-top flex w-full items-start justify-between gap-4">
        <div className="flex-1">
          <motion.h2
            variants={itemVariants}
            className="pf-mobile-header-name mb-2 text-xl font-bold leading-tight tracking-tight ink-strong"
          >
            {profile.name}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="pf-mobile-header-role text-sm font-normal leading-5 tracking-tight ink-strong"
          >
            {profile.role}
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="pf-mobile-header-toggles flex flex-col items-end gap-2">
          <PaletteSwitcher placement="bottom" />
          <FontToggle />
          <ThemeToggle />
        </motion.div>
      </div>
      <motion.div
        variants={itemVariants}
        className="pf-mobile-header-location mt-3 flex items-center gap-1.5 text-sm ink-muted"
        aria-label="Location"
      >
        <FaMapMarkerAlt aria-hidden="true" className="h-4 w-4" />
        <span>{profile.location}</span>
      </motion.div>
      <motion.p variants={itemVariants} className="pf-mobile-header-blurb mt-4 text-sm leading-6 ink-body">
        {profile.blurb}
      </motion.p>
      <motion.div variants={itemVariants} className="pf-mobile-header-socials mt-5 flex items-center gap-4">
        {profile.socials.map((social) => (
          <a
            key={social.kind}
            href={social.href}
            target={social.kind === "email" ? undefined : "_blank"}
            rel={social.kind === "email" ? undefined : "noopener noreferrer"}
            aria-label={social.label}
            className="pf-social-link group inline-flex cursor-pointer items-center transition-opacity duration-200 hover:opacity-80"
            data-social={social.kind}
          >
            <SocialIcon kind={social.kind} />
          </a>
        ))}
      </motion.div>
    </motion.header>
  );
}

export default function Sidebar(): JSX.Element {
  return (
    <>
      {/* Desktop: full-viewport hero that morphs into the left sidebar on scroll. */}
      <div className="hidden lg:block">
        <HeroOverlay>
          <SidebarDetails />
        </HeroOverlay>
      </div>

      {/* Mobile: static full-viewport hero, followed by a stacked header. */}
      <MobileHero />
      <MobileHeader />
    </>
  );
}
