import { Prisma } from "@prisma/client";
import { readBlobPortfolio } from "@/lib/blob-portfolio-store";
import { readLocalPortfolio } from "@/lib/local-portfolio-store";
import { prisma } from "@/lib/prisma";
import { seedPortfolio } from "@/lib/seed-data";
import type { PortfolioData } from "@/lib/types";

function parseJsonArray<T>(value: Prisma.JsonValue, fallback: T): T {
  if (Array.isArray(value)) {
    return value as T;
  }

  return fallback;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: 1 },
      include: {
        experiences: { orderBy: { sortOrder: "asc" } },
        projects: { orderBy: { sortOrder: "asc" } },
        educations: { orderBy: { sortOrder: "asc" } },
        certificates: { orderBy: { sortOrder: "asc" } }
      }
    });

    if (!profile) {
      return (await readBlobPortfolio()) ?? (await readLocalPortfolio()) ?? seedPortfolio;
    }

    return {
      profile: {
        id: profile.id,
        fullName: profile.fullName,
        nickname: profile.nickname,
        headline: profile.headline,
        subheadline: profile.subheadline,
        summary: profile.summary,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        availability: profile.availability,
        resumeFocus: profile.resumeFocus,
        yearsExperience: profile.yearsExperience,
        projectCount: profile.projectCount,
        currentRole: profile.currentRole,
        expectedSalary: profile.expectedSalary,
        startWindow: profile.startWindow,
        avatarPath: profile.avatarPath,
        primaryColor: profile.primaryColor,
        secondaryColor: profile.secondaryColor,
        personalDetails: parseJsonArray(profile.personalDetails, []),
        highlightItems: parseJsonArray(profile.highlightItems, []),
        skillGroups: parseJsonArray(profile.skillGroups, []),
        languages: parseJsonArray(profile.languages, []),
        strengths: parseJsonArray(profile.strengths, []),
        typingSpeed: profile.typingSpeed,
        transport: profile.transport,
        socials: parseJsonArray(profile.socials, [])
      },
      experiences: profile.experiences.map((item) => ({
        ...item,
        highlights: parseJsonArray(item.highlights, [])
      })),
      projects: profile.projects,
      educations: profile.educations,
      certificates: profile.certificates
    };
  } catch {
    return (await readBlobPortfolio()) ?? (await readLocalPortfolio()) ?? seedPortfolio;
  }
}
