import { Link } from "react-router-dom";

export default function NotFound(): JSX.Element {
  return (
    <main className="pf-not-found mx-auto flex min-h-screen w-full max-w-xl flex-col items-start justify-center px-6 sm:px-10">
      <div className="pf-not-found-code text-xs font-bold uppercase tracking-wider ink-muted">404</div>
      <h1 className="pf-not-found-title mt-2 text-3xl font-bold tracking-tight ink-strong">Page not found</h1>
      <p className="pf-not-found-body mt-3 text-base leading-7 ink-body">That URL doesn't match anything on this site.</p>
      <Link
        to="/"
        className="pf-not-found-back mt-6 inline-flex items-center gap-1.5 rounded-md border border-ink-500/20 px-3 py-1.5 text-sm font-medium ink-strong transition-colors duration-200 hover:border-accent-about/60 hover:bg-tint-section/60 dark:border-zinc-700"
      >
        ← Back home
      </Link>
    </main>
  );
}
