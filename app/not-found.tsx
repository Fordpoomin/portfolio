export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-lg rounded-[2rem] p-8 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">404</p>
        <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold text-white">Page not found</h1>
        <p className="mt-4 text-slate-300">หน้าที่คุณกำลังเปิดไม่มีอยู่ หรืออาจถูกย้ายตำแหน่งแล้ว</p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
