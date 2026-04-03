"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { clearAdminSession, createAdminSession, validateAdminCredentials } from "@/lib/auth";
import { saveUploadedProfileImage } from "@/lib/file-upload";
import { writeLocalPortfolio } from "@/lib/local-portfolio-store";
import type { CertificateItem, EducationItem, ExperienceItem, PortfolioData, ProjectItem } from "@/lib/types";
import { linesToArray, safeJsonParse } from "@/lib/utils";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!validateAdminCredentials(username, password)) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function savePortfolioAction(formData: FormData) {
  const uploadedAvatar = formData.get("avatarFile");
  const avatarFromUpload =
    uploadedAvatar instanceof File ? await saveUploadedProfileImage(uploadedAvatar) : null;

  const profileData = {
    id: 1,
    fullName: String(formData.get("fullName") ?? ""),
    nickname: String(formData.get("nickname") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    subheadline: String(formData.get("subheadline") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    location: String(formData.get("location") ?? ""),
    availability: String(formData.get("availability") ?? ""),
    resumeFocus: String(formData.get("resumeFocus") ?? ""),
    yearsExperience: String(formData.get("yearsExperience") ?? ""),
    projectCount: String(formData.get("projectCount") ?? ""),
    currentRole: String(formData.get("currentRole") ?? ""),
    expectedSalary: String(formData.get("expectedSalary") ?? ""),
    startWindow: String(formData.get("startWindow") ?? ""),
    avatarPath: avatarFromUpload ?? String(formData.get("avatarPath") ?? "/profile.jpg"),
    primaryColor: String(formData.get("primaryColor") ?? "#f5b942"),
    secondaryColor: String(formData.get("secondaryColor") ?? "#63c9d9"),
    personalDetails: safeJsonParse(formData.get("personalDetails"), []),
    highlightItems: linesToArray(formData.get("highlightItems")),
    skillGroups: safeJsonParse(formData.get("skillGroups"), []),
    languages: safeJsonParse(formData.get("languages"), []),
    strengths: linesToArray(formData.get("strengths")),
    typingSpeed: String(formData.get("typingSpeed") ?? ""),
    transport: String(formData.get("transport") ?? ""),
    socials: safeJsonParse(formData.get("socials"), [])
  };

  const experiences = safeJsonParse(formData.get("experiences"), []);
  const projects = safeJsonParse(formData.get("projects"), []);
  const educations = safeJsonParse(formData.get("educations"), []);
  const certificates = safeJsonParse(formData.get("certificates"), []);

  const normalizedExperiences: ExperienceItem[] = Array.isArray(experiences)
    ? experiences.map((item: Record<string, unknown>, index: number) => ({
        period: String(item.period ?? ""),
        company: String(item.company ?? ""),
        position: String(item.position ?? ""),
        location: String(item.location ?? ""),
        salary: String(item.salary ?? ""),
        highlights: Array.isArray(item.highlights) ? item.highlights.map(String) : [],
        sortOrder: Number(item.sortOrder ?? index + 1)
      }))
    : [];

  const normalizedProjects: ProjectItem[] = Array.isArray(projects)
    ? projects.map((item: Record<string, unknown>, index: number) => ({
        name: String(item.name ?? ""),
        category: String(item.category ?? ""),
        stack: String(item.stack ?? ""),
        summary: String(item.summary ?? ""),
        impact: String(item.impact ?? ""),
        link: String(item.link ?? "#"),
        sortOrder: Number(item.sortOrder ?? index + 1)
      }))
    : [];

  const normalizedEducations: EducationItem[] = Array.isArray(educations)
    ? educations.map((item: Record<string, unknown>, index: number) => ({
        period: String(item.period ?? ""),
        school: String(item.school ?? ""),
        degree: String(item.degree ?? ""),
        major: String(item.major ?? ""),
        faculty: String(item.faculty ?? ""),
        gpa: String(item.gpa ?? ""),
        sortOrder: Number(item.sortOrder ?? index + 1)
      }))
    : [];

  const normalizedCertificates: CertificateItem[] = Array.isArray(certificates)
    ? certificates.map((item: Record<string, unknown>, index: number) => ({
        period: String(item.period ?? ""),
        issuer: String(item.issuer ?? ""),
        title: String(item.title ?? ""),
        sortOrder: Number(item.sortOrder ?? index + 1)
      }))
    : [];

  const localPayload: PortfolioData = {
    profile: profileData,
    experiences: normalizedExperiences,
    projects: normalizedProjects,
    educations: normalizedEducations,
    certificates: normalizedCertificates
  };

  let saveTarget = "local";

  try {
    await prisma.$transaction(async (tx) => {
      await tx.profile.upsert({
        where: { id: 1 },
        update: profileData,
        create: profileData
      });

      await tx.experience.deleteMany({ where: { profileId: 1 } });
      await tx.project.deleteMany({ where: { profileId: 1 } });
      await tx.education.deleteMany({ where: { profileId: 1 } });
      await tx.certificate.deleteMany({ where: { profileId: 1 } });

      if (normalizedExperiences.length > 0) {
        await tx.experience.createMany({
          data: normalizedExperiences.map((item) => ({
            profileId: 1,
            period: item.period,
            company: item.company,
            position: item.position,
            location: item.location,
            salary: item.salary,
            highlights: item.highlights,
            sortOrder: item.sortOrder
          }))
        });
      }

      if (normalizedProjects.length > 0) {
        await tx.project.createMany({
          data: normalizedProjects.map((item) => ({
            profileId: 1,
            name: item.name,
            category: item.category,
            stack: item.stack,
            summary: item.summary,
            impact: item.impact,
            link: item.link,
            sortOrder: item.sortOrder
          }))
        });
      }

      if (normalizedEducations.length > 0) {
        await tx.education.createMany({
          data: normalizedEducations.map((item) => ({
            profileId: 1,
            period: item.period,
            school: item.school,
            degree: item.degree,
            major: item.major,
            faculty: item.faculty,
            gpa: item.gpa,
            sortOrder: item.sortOrder
          }))
        });
      }

      if (normalizedCertificates.length > 0) {
        await tx.certificate.createMany({
          data: normalizedCertificates.map((item) => ({
            profileId: 1,
            period: item.period,
            issuer: item.issuer,
            title: item.title,
            sortOrder: item.sortOrder
          }))
        });
      }
    });

    await writeLocalPortfolio(localPayload);
    saveTarget = "mysql";
  } catch {
    await writeLocalPortfolio(localPayload);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect(`/admin?status=${saveTarget}`);
}
