import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PortfolioData } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const localPortfolioPath = path.join(dataDir, "portfolio-next.json");

export async function readLocalPortfolio(): Promise<PortfolioData | null> {
  try {
    const content = await readFile(localPortfolioPath, "utf8");
    return JSON.parse(content) as PortfolioData;
  } catch {
    return null;
  }
}

export async function writeLocalPortfolio(data: PortfolioData): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(localPortfolioPath, JSON.stringify(data, null, 2), "utf8");
}
