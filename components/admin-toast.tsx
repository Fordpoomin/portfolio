"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const toastConfig = {
  mysql: {
    title: "Saved to MySQL",
    description: "ข้อมูล portfolio ถูกบันทึกลงฐานข้อมูลและไฟล์ local เรียบร้อยแล้ว",
    accent: "#63c9d9",
    icon: "success"
  },
  local: {
    title: "Saved Locally",
    description: "MySQL ยังไม่พร้อม ตอนนี้บันทึกลงไฟล์ local ให้เรียบร้อยแล้ว",
    accent: "#f5b942",
    icon: "warning"
  }
} as const;

export function AdminToast({ status }: { status?: string }) {
  const [open, setOpen] = useState(Boolean(status && status in toastConfig));

  useEffect(() => {
    if (!status || !(status in toastConfig)) {
      return;
    }

    const timeout = window.setTimeout(() => setOpen(false), 3600);
    return () => window.clearTimeout(timeout);
  }, [status]);

  if (!status || !(status in toastConfig)) {
    return null;
  }

  const toast = toastConfig[status as keyof typeof toastConfig];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 w-[min(92vw,420px)]"
        >
          <div className="glass rounded-[1.6rem] border border-white/10 p-4 shadow-2xl">
            <div className="flex items-start gap-4">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${toast.accent}22`, color: toast.accent }}
              >
                {toast.icon === "success" ? <SuccessIcon /> : <WarningIcon />}
              </div>
              <div className="min-w-0">
                <div className="font-[var(--font-heading)] text-lg font-bold text-white">{toast.title}</div>
                <p className="mt-1 text-sm leading-6 text-slate-300">{toast.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.2]">
      <path d="M5 12.5 9.5 17 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.2]">
      <path d="M12 8v5" strokeLinecap="round" />
      <path d="M12 17h.01" strokeLinecap="round" />
      <path
        d="M10.3 4.84 3.56 16.1A2 2 0 0 0 5.27 19h13.46a2 2 0 0 0 1.71-2.9L13.7 4.84a2 2 0 0 0-3.4 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
