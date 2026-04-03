export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="section-shell flex min-h-20 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 text-white">
          <span className="size-3 rounded-full bg-gradient-to-br from-glow to-flame shadow-[0_0_28px_rgba(255,184,77,0.8)]" />
          <span className="font-[var(--font-heading)] text-lg font-semibold tracking-[0.08em]">
            POOMIN PORTFOLIO
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Admin
          </a>
          <a
            href="#contact"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
