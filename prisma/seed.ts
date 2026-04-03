import { PrismaClient } from "@prisma/client";
import { seedPortfolio } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.certificate.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      ...seedPortfolio.profile,
      experiences: {
        create: seedPortfolio.experiences
      },
      projects: {
        create: seedPortfolio.projects
      },
      educations: {
        create: seedPortfolio.educations
      },
      certificates: {
        create: seedPortfolio.certificates
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
