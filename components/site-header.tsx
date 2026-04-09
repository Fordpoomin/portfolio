"use client";

import { motion } from "framer-motion";

export function SiteHeader() {
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-lg transition-all duration-500">
      <div className="section-shell flex min-h-20 items-center justify-between gap-4">
        <motion.a href="#home" whileHover={{ y: -1 }} className="flex items-center gap-3 text-white">
          <span className="size-3 rounded-full bg-gradient-to-br from-glow to-flame shadow-[0_0_28px_rgba(255,184,77,0.8)]" />
          <span className="font-[var(--font-heading)] text-lg font-semibold tracking-[0.08em]">
            POOMIN PORTFOLIO
          </span>
        </motion.a>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
          >
            Admin
          </a>
          <a
            href="#contact"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
