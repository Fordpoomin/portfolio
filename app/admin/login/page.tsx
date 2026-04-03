import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { loginAction } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass w-full max-w-xl rounded-[2rem] p-8">
        <span className="inline-flex rounded-full bg-amber-300/10 px-4 py-2 font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
          CMS Login
        </span>
        <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-extrabold text-white">
          Portfolio Admin Dashboard
        </h1>
        <p className="mt-4 text-slate-300">
          ล็อกอินเพื่อแก้ไข profile, projects, experience และข้อมูลที่ใช้โชว์ในรอบสัมภาษณ์
        </p>
        {params.error === "invalid" ? (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
          </div>
        ) : null}
        <form action={loginAction} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Username</label>
            <input
              name="username"
              defaultValue="admin"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              defaultValue="admin123"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
            />
          </div>
          <button className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
