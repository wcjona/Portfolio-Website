import { Outlet } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <div className="pf-shell min-h-screen bg-surface text-ink-700 dark:text-zinc-300">
      <a
        href="#main"
        className="pf-skip-link fixed left-[-181px] top-0 z-[1000] h-11 w-[181px] rounded bg-gradient-to-r from-teal-400 via-blue-500 to-purple-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 focus:left-0"
      >
        Skip to Content
      </a>
      <Outlet />
    </div>
  );
}
