import "server-only";

import { prisma } from "@/lib/prisma";

export type StorageMode = "mysql" | "local";

export async function getStorageMode(): Promise<StorageMode> {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    return "mysql";
  } catch {
    return "local";
  }
}
