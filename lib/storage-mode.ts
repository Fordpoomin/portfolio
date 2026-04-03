import "server-only";

import { prisma } from "@/lib/prisma";

export type StorageMode = "mysql" | "blob" | "local";

export async function getStorageMode(): Promise<StorageMode> {
  // Force Neon (Postgres) as the only storage mode
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    return "mysql";
  } catch {
    return "local";
  }
}
