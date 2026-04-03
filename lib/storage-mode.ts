import "server-only";

import { prisma } from "@/lib/prisma";

export type StorageMode = "mysql" | "blob" | "local";

export async function getStorageMode(): Promise<StorageMode> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return "blob";
  }

  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    return "mysql";
  } catch {
    return "local";
  }
}
