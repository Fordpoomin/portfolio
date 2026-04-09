import type { StorageMode } from "@/lib/storage-mode";

const storageMeta: Record<
  StorageMode,
  { label: string; description: string; accentClass: string; dotClass: string }
> = {
  postgres: {
    label: "Neon (Postgres) Active",
    description: "The app is currently reading and writing directly to your Neon Postgres database.",
    accentClass: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    dotClass: "bg-cyan-300"
  },
  local: {
    label: "Neon Unavailable",
    description: "The app could not reach Neon/Postgres. Saving is disabled until the database connection works again.",
    accentClass: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    dotClass: "bg-amber-300"
  }
};

export function StorageBadge({ mode }: { mode: StorageMode }) {
  const meta = storageMeta[mode];

  return (
    <div className={`rounded-2xl border px-4 py-3 ${meta.accentClass}`}>
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${meta.dotClass}`} />
        <div>
          <div className="font-[var(--font-heading)] text-sm font-semibold">{meta.label}</div>
          <p className="mt-1 text-xs leading-5 text-white/80">{meta.description}</p>
        </div>
      </div>
    </div>
  );
}
