"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.header
      animate={{
        paddingTop: isScrolled ? 10 : 0,
        paddingBottom: isScrolled ? 8 : 0
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 z-50 w-full"
    >
      <div
        className={`mx-auto w-full max-w-[1600px] px-4 transition-all duration-500 lg:px-6 ${
          isScrolled ? "pt-2" : "pt-0"
        }`}
      >
      <motion.div
        animate={{
          scale: isScrolled ? 0.985 : 1,
          y: isScrolled ? 2 : 0
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`section-shell flex items-center justify-between gap-4 rounded-[1.6rem] border backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "min-h-[4.3rem] border-white/12 bg-slate-950/78 shadow-[0_18px_45px_rgba(2,8,20,0.38)]"
            : "min-h-20 border-transparent bg-slate-950/72 shadow-none"
        }`}
      >
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
      </motion.div>
      </div>
    </motion.header>
  );
}
