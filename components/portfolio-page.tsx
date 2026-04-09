import Image from "next/image";
import { AnimateInView } from "@/components/animate-in-view";
import { HeroDepthScene } from "@/components/hero-depth-scene";
import { HoverCard } from "@/components/hover-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import type { PortfolioData } from "@/lib/types";

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const { profile, experiences, projects, educations, certificates } = data;
  const themeStyle = {
    ["--theme-primary" as string]: profile.primaryColor,
    ["--theme-secondary" as string]: profile.secondaryColor
  } as React.CSSProperties;

  return (
    <div className="portfolio-stage relative overflow-hidden" style={themeStyle}>
      <SiteHeader />

      {/* Add top padding to prevent content being hidden behind fixed navbar */}
      <main className="pt-24 md:pt-28">
        <section id="home" className="relative overflow-hidden py-20 lg:py-28 transition-all duration-500">
          <HeroDepthScene />
          <div className="absolute inset-0 bg-hero-grid bg-[length:48px_48px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute left-[8%] top-12 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] blur-2xl" />
          <div className="absolute bottom-12 right-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,184,77,0.18),transparent_72%)] blur-3xl" />
          <div className="section-shell relative grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <AnimateInView>
              <div>
                <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                  Available for Front-End / Full Stack Roles
                </span>
                <h1 className="max-w-4xl font-[var(--font-heading)] text-5xl font-extrabold leading-none text-white sm:text-6xl lg:text-7xl">
                  {profile.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-amber-50">{profile.subheadline}</p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{profile.summary}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
                  >
                    View Projects
                  </a>
                  <a
                    href="#experience"
                    className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Experience
                  </a>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {[
                    { label: "Years Experience", value: profile.yearsExperience },
                    { label: "Project Stories", value: profile.projectCount },
                    { label: "Current Focus", value: profile.currentRole }
                  ].map((item) => (
                    <HoverCard key={item.label}>
                      <div className="glass depth-card rounded-3xl p-5">
                        <div className="font-[var(--font-heading)] text-2xl font-bold text-white">{item.value}</div>
                        <div className="mt-2 text-sm text-slate-400">{item.label}</div>
                      </div>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.1}>
              <div className="glass depth-card rounded-[2rem] p-6 shadow-xl transition-all duration-500 lg:p-8">
                <div className="relative mb-5 h-56 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/50 sm:h-72">
                  <Image src={profile.avatarPath} alt={profile.fullName} fill className="object-cover transition duration-700 hover:scale-[1.04]" priority />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(8,17,31,0.45)_100%)]" />
                </div>
                <span
                  className="inline-flex rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.24em]"
                  style={{ backgroundColor: `${profile.secondaryColor}1a`, color: profile.secondaryColor }}
                >
                  Portfolio Profile
                </span>
                <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold text-white">
                  {profile.fullName} ({profile.nickname})
                </h2>
                <p className="mt-3 text-slate-300">{profile.resumeFocus}</p>
                <ul className="mt-5 space-y-3 text-slate-300">
                  {profile.highlightItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-2 rounded-full" style={{ backgroundColor: profile.primaryColor }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {profile.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      {social.label}: {social.value}
                    </a>
                  ))}
                </div>
              </div>
            </AnimateInView>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="section-shell">
            <AnimateInView>
              <SectionHeading
                eyebrow="About"
                title="Ready for teams that want polished UI and dependable delivery"
                description="ข้อมูลด้านล่างสรุปจาก resume และจัดเลเยอร์ใหม่ให้เหมาะกับงานสัมภาษณ์ ทั้งมุม business value และ technical capability"
              />
            </AnimateInView>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <AnimateInView>
                <div className="glass depth-card rounded-[2rem] p-6 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.personalDetails.map((item) => (
                    <HoverCard key={item.label}>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                        <div className="text-sm text-slate-400">{item.label}</div>
                        <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                      </div>
                    </HoverCard>
                  ))}
                </div>
                </div>
              </AnimateInView>

              <AnimateInView delay={0.08}>
                <div className="glass depth-card rounded-[2rem] p-6 lg:p-8">
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white">Core Skills</h3>
                <div className="mt-6 space-y-6">
                  {profile.skillGroups.map((group) => (
                    <div key={group.group}>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: profile.primaryColor }}>
                        {group.group}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
                            style={{ borderColor: "rgba(255,255,255,0.1)" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-slate-950/20 py-20">
          <div className="section-shell">
            <AnimateInView>
              <SectionHeading eyebrow="Experience" title="Career timeline with hands-on shipping experience" />
            </AnimateInView>
            <div className="space-y-5">
              {experiences.map((item, index) => (
                <AnimateInView key={`${item.company}-${item.sortOrder}`} delay={index * 0.06}>
                  <HoverCard>
                    <article className="glass depth-card rounded-[2rem] p-6 lg:p-8">
                      <div className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.period}</div>
                      <h3 className="mt-3 font-[var(--font-heading)] text-2xl font-bold text-white">{item.position}</h3>
                      <p className="mt-2 text-slate-300">
                        {item.company} <span className="text-slate-500">· {item.location}</span>
                      </p>
                      {item.salary ? <p className="mt-2 text-sm text-slate-400">เงินเดือน: {item.salary}</p> : null}
                      <ul className="mt-5 space-y-3 text-slate-300">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 size-2 rounded-full" style={{ backgroundColor: profile.secondaryColor }} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </HoverCard>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="section-shell">
            <AnimateInView>
              <SectionHeading eyebrow="Projects" title="Selected work stories tailored for interview conversations" />
            </AnimateInView>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <AnimateInView key={`${project.name}-${project.sortOrder}`} delay={index * 0.08}>
                  <HoverCard>
                    <article className="glass depth-card rounded-[2rem] p-6 transition duration-300 hover:border-amber-200/20 hover:bg-white/[0.06]">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: profile.primaryColor }}>
                        {project.category}
                      </span>
                      <h3 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-white">{project.name}</h3>
                      <p className="mt-4 text-slate-300">{project.summary}</p>
                      <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                        {project.stack}
                      </div>
                      <div className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Impact</div>
                      <p className="mt-2 text-slate-300">{project.impact}</p>
                    </article>
                  </HoverCard>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            <AnimateInView>
              <div className="glass depth-card rounded-[2rem] p-6 lg:p-8">
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white">Education</h3>
              <div className="mt-6 space-y-5">
                {educations.map((item) => (
                  <HoverCard key={`${item.school}-${item.sortOrder}`}>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                      <div className="text-sm text-slate-400">{item.period}</div>
                      <div className="mt-2 text-xl font-semibold text-white">{item.degree}</div>
                      <p className="mt-2 text-slate-300">{item.school}</p>
                      <p className="text-sm text-slate-400">
                        {[item.major, item.faculty].filter(Boolean).join(" · ")}
                      </p>
                      {item.gpa ? <p className="mt-2 text-sm text-slate-400">GPA {item.gpa}</p> : null}
                    </div>
                  </HoverCard>
                ))}
              </div>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.08}>
              <div className="glass depth-card rounded-[2rem] p-6 lg:p-8">
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-white">Languages, strengths, and mobility</h3>
              <div className="mt-6 space-y-5">
                {profile.languages.map((language) => (
                  <HoverCard key={language.name}>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                      <div className="text-lg font-semibold text-white">{language.name}</div>
                      <p className="mt-2 text-slate-300">
                        พูด {language.speaking} · อ่าน {language.reading} · เขียน {language.writing}
                      </p>
                    </div>
                  </HoverCard>
                ))}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300">
                  <div className="font-semibold text-white">Strengths</div>
                  <p className="mt-2">{profile.strengths.join(" | ")}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300">
                  <div className="font-semibold text-white">Typing Speed</div>
                  <p className="mt-2">{profile.typingSpeed}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300">
                  <div className="font-semibold text-white">Transport</div>
                  <p className="mt-2">{profile.transport}</p>
                </div>
              </div>
              </div>
            </AnimateInView>
          </div>

          <div className="section-shell mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {certificates.map((certificate, index) => (
              <AnimateInView key={`${certificate.title}-${certificate.sortOrder}`} delay={index * 0.06}>
                <HoverCard>
                  <div className="glass depth-card rounded-[2rem] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <div className="text-sm text-slate-400">{certificate.period}</div>
                    <div className="mt-2 font-semibold text-white">{certificate.title}</div>
                    <div className="mt-2 text-sm text-slate-400">{certificate.issuer}</div>
                  </div>
                </HoverCard>
              </AnimateInView>
            ))}
          </div>
        </section>

        <section id="contact" className="pb-20">
          <div className="section-shell">
            <AnimateInView>
              <div className="glass depth-card flex flex-col gap-8 rounded-[2rem] p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: profile.primaryColor }}>Ready to work</span>
                  <h2 className="mt-3 max-w-3xl font-[var(--font-heading)] text-3xl font-extrabold text-white lg:text-4xl">
                    กำลังมองหาทีมที่ต้องการคนลงมือทำเว็บได้จริง ตั้งแต่ UI ถึงระบบหลังบ้าน
                  </h2>
                  <p className="mt-4 text-slate-300">
                    {profile.availability} · {profile.location} · เริ่มงาน {profile.startWindow}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      className="rounded-full px-5 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: profile.primaryColor }}
                    >
                      {social.value}
                    </a>
                  ))}
                </div>
              </div>
            </AnimateInView>
          </div>
        </section>
      </main>
    </div>
  );
}
