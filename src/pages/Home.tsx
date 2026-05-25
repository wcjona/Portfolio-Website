import Sidebar from "../components/Sidebar";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";

export default function Home(): JSX.Element {
  return (
    <div className="pf-home flex w-full flex-col lg:block">
      <Sidebar />
      {/* On desktop, .pf-main-wrapper is offset by the fixed sidebar width and
          centers .pf-main in the remaining viewport. The large top padding
          (lg:pt-[calc(100vh+5rem)]) reserves one viewport of scroll for the
          hero overlay to morph into the sidebar. */}
      <div className="pf-main-wrapper lg:ml-[var(--sidebar-w)]">
        <main
          id="main"
          className="pf-main relative z-20 flex w-full flex-col items-start px-4 pb-24 pt-8 sm:px-10 lg:mx-auto lg:max-w-[680px] lg:px-12 lg:pt-[calc(100vh+5rem)] xl:max-w-[760px]"
        >
          <About />
          <Experience />
          <Projects />
          <footer className="pf-footer mt-20 w-full px-4 text-sm ink-muted">
            <p>Designed and built by Jonathan Chong.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
