type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="mb-3 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
        {eyebrow}
      </span>
      <h2 className="font-[var(--font-heading)] text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <span className="section-heading-line mt-4 block h-px w-40 overflow-hidden rounded-full bg-white/10">
        <span className="section-heading-line__beam block h-full w-24" />
      </span>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}
