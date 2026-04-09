import { redirect } from "next/navigation";
import { logoutAction, savePortfolioAction } from "@/app/admin/actions";
import { AdminSaveButton } from "@/components/admin-save-button";
import { AdminToast } from "@/components/admin-toast";
import { StorageBadge } from "@/components/storage-badge";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPortfolioData } from "@/lib/portfolio";
import { getStorageDebugInfo, getStorageMode } from "@/lib/storage-mode";

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const data = await getPortfolioData();
  const storageMode = await getStorageMode();
  const storageDebug = await getStorageDebugInfo();
  const { profile } = data;

  return (
    <main className="min-h-screen">
      <AdminToast status={params.status} />
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[320px_1fr]">
        <aside className="glass m-4 rounded-[2rem] p-6 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <span className="inline-flex rounded-full bg-amber-300/10 px-4 py-2 font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
            Portfolio CMS
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-extrabold text-white">Manage Content</h1>
          <p className="mt-4 text-slate-300">
            Update portfolio content from one place for both the public site and the primary database source.
          </p>
          <div className="mt-6">
            <StorageBadge mode={storageMode} />
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-300">
            <div className="font-[var(--font-heading)] text-sm font-semibold text-white">Debug Status</div>
            <div className="mt-2">
              Source: {storageDebug.activeSource === "postgres" ? "Neon/Postgres" : "Unavailable / seed fallback"}
            </div>
            <div>DB Host: {storageDebug.dbHost ?? "-"}</div>
            <div>DB Name: {storageDebug.dbName ?? "-"}</div>
            <div>Profile Row: {storageDebug.profileRowId ?? "-"}</div>
            {/* <div>Current Start Window: {storageDebug.startWindow ?? "-"}</div> */}
            <div>Env Priority: {storageDebug.envPriority}</div>
            {storageDebug.error ? <div className="mt-2 text-amber-200">DB Error: {storageDebug.error}</div> : null}
          </div>
          <div className="mt-8 space-y-3">
            <a
              href="/"
              target="_blank"
              className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-white"
            >
              Open Portfolio
            </a>
            <form action={logoutAction}>
              <button className="w-full rounded-2xl bg-white/5 px-4 py-3 text-white">Logout</button>
            </form>
          </div>
        </aside>

        <section className="p-4 lg:p-8">
          <form action={savePortfolioAction} className="space-y-6">
            <div className="glass rounded-[2rem] p-6">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white">Profile Overview</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Field label="Full Name" name="fullName" defaultValue={profile.fullName} />
                <Field label="Nickname" name="nickname" defaultValue={profile.nickname} />
                <Field label="Headline" name="headline" defaultValue={profile.headline} className="xl:col-span-3" />
                <Field label="Email" name="email" defaultValue={profile.email} />
                <Field label="Phone" name="phone" defaultValue={profile.phone} />
                <Field label="Location" name="location" defaultValue={profile.location} />
                <Field label="Availability" name="availability" defaultValue={profile.availability} />
                <Field label="Resume Focus" name="resumeFocus" defaultValue={profile.resumeFocus} className="xl:col-span-2" />
                <Field label="Current Role" name="currentRole" defaultValue={profile.currentRole} />
                <Field label="Years Experience" name="yearsExperience" defaultValue={profile.yearsExperience} />
                <Field label="Project Count" name="projectCount" defaultValue={profile.projectCount} />
                <Field label="Expected Salary" name="expectedSalary" defaultValue={profile.expectedSalary} />
                <Field label="Start Window" name="startWindow" defaultValue={profile.startWindow} />
                <Field label="Avatar Path" name="avatarPath" defaultValue={profile.avatarPath} />
                <ColorField label="Primary Color" name="primaryColor" defaultValue={profile.primaryColor} />
                <ColorField label="Secondary Color" name="secondaryColor" defaultValue={profile.secondaryColor} />
                <FileField
                  label="Upload New Profile Image"
                  name="avatarFile"
                  description="Supports .jpg, .jpeg, .png, and .webp. The path updates automatically after save."
                />
              </div>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <TextArea label="Subheadline" name="subheadline" defaultValue={profile.subheadline} rows={4} />
                <TextArea label="Summary" name="summary" defaultValue={profile.summary} rows={4} />
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="glass rounded-[2rem] p-6">
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white">Structured Profile Data</h2>
                <div className="mt-6 space-y-4">
                  <TextArea
                    label="Personal Details JSON"
                    name="personalDetails"
                    defaultValue={JSON.stringify(profile.personalDetails, null, 2)}
                    rows={10}
                    mono
                  />
                  <TextArea
                    label="Skill Groups JSON"
                    name="skillGroups"
                    defaultValue={JSON.stringify(profile.skillGroups, null, 2)}
                    rows={12}
                    mono
                  />
                  <TextArea
                    label="Languages JSON"
                    name="languages"
                    defaultValue={JSON.stringify(profile.languages, null, 2)}
                    rows={8}
                    mono
                  />
                  <TextArea
                    label="Social Links JSON"
                    name="socials"
                    defaultValue={JSON.stringify(profile.socials, null, 2)}
                    rows={8}
                    mono
                  />
                </div>
              </div>

              <div className="glass rounded-[2rem] p-6">
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white">Highlights & Extras</h2>
                <div className="mt-6 space-y-4">
                  <TextArea
                    label="Highlight Items (1 line = 1 item)"
                    name="highlightItems"
                    defaultValue={profile.highlightItems.join("\n")}
                    rows={6}
                  />
                  <TextArea
                    label="Strengths (1 line = 1 item)"
                    name="strengths"
                    defaultValue={profile.strengths.join("\n")}
                    rows={6}
                  />
                  <Field label="Typing Speed" name="typingSpeed" defaultValue={profile.typingSpeed} />
                  <Field label="Transport" name="transport" defaultValue={profile.transport} />
                </div>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-6">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white">Timeline & Portfolio Collections</h2>
              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <TextArea
                  label="Experiences JSON"
                  name="experiences"
                  defaultValue={JSON.stringify(data.experiences, null, 2)}
                  rows={18}
                  mono
                />
                <TextArea
                  label="Projects JSON"
                  name="projects"
                  defaultValue={JSON.stringify(data.projects, null, 2)}
                  rows={18}
                  mono
                />
                <TextArea
                  label="Educations JSON"
                  name="educations"
                  defaultValue={JSON.stringify(data.educations, null, 2)}
                  rows={14}
                  mono
                />
                <TextArea
                  label="Certificates JSON"
                  name="certificates"
                  defaultValue={JSON.stringify(data.certificates, null, 2)}
                  rows={14}
                  mono
                />
              </div>
            </div>

            <AdminSaveButton />
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  defaultValue,
  className,
  type = "text"
}: {
  label: string;
  name: string;
  defaultValue: string;
  className?: string;
  type?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
      />
    </label>
  );
}

function ColorField({
  label,
  name,
  defaultValue
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
        <input
          type="color"
          defaultValue={defaultValue}
          className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent"
          disabled
        />
        <input
          name={name}
          defaultValue={defaultValue}
          className="flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2 text-white outline-none transition focus:border-amber-300/50"
        />
      </div>
    </label>
  );
}

function FileField({
  label,
  name,
  description
}: {
  label: string;
  name: string;
  description: string;
}) {
  return (
    <label className="xl:col-span-3">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4">
        <input
          name={name}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-amber-300"
        />
        <p className="mt-3 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows,
  mono = false
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows: number;
  mono?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 ${mono ? "font-mono text-sm" : ""}`}
      />
    </label>
  );
}
