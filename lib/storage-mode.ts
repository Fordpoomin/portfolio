import "server-only";

import { prisma } from "@/lib/prisma";

export type StorageMode = "postgres" | "local";

export type StorageDebugInfo = {
  activeSource: StorageMode;
  dbHost: string | null;
  dbName: string | null;
  profileRowId: number | null;
  startWindow: string | null;
  envPriority: string;
  error: string | null;
};

function parseDatabaseMeta() {
  const value = process.env.DATABASE_URL;

  if (!value) {
    return { dbHost: null, dbName: null };
  }

  try {
    const url = new URL(value);
    return {
      dbHost: url.hostname || null,
      dbName: url.pathname.replace(/^\//, "") || null
    };
  } catch {
    return {
      dbHost: null,
      dbName: null
    };
  }
}

export async function getStorageMode(): Promise<StorageMode> {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    return "postgres";
  } catch {
    return "local";
  }
}

export async function getStorageDebugInfo(): Promise<StorageDebugInfo> {
  const { dbHost, dbName } = parseDatabaseMeta();

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: 1 },
      select: {
        id: true,
        startWindow: true
      }
    });

    return {
      activeSource: "postgres",
      dbHost,
      dbName,
      profileRowId: profile?.id ?? null,
      startWindow: profile?.startWindow ?? null,
      envPriority: ".env.development.local -> .env.local -> .env",
      error: null
    };
  } catch (error) {
    return {
      activeSource: "local",
      dbHost,
      dbName,
      profileRowId: null,
      startWindow: null,
      envPriority: ".env.development.local -> .env.local -> .env",
      error: error instanceof Error ? error.message : "Unknown database error"
    };
  }
}
