"use client";

import { useFormStatus } from "react-dom";

export function AdminSaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-amber-200"
    >
      {pending ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-800/25 border-t-slate-950" />
          Saving portfolio...
        </>
      ) : (
        "Save Portfolio Content"
      )}
    </button>
  );
}
