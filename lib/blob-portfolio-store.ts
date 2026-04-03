import "server-only";

import { head, put } from "@vercel/blob";
import type { PortfolioData } from "@/lib/types";

const portfolioBlobPath = "cms/portfolio-data.json";

export async function readBlobPortfolio(): Promise<PortfolioData | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null;
  }

  try {
    const metadata = await head(portfolioBlobPath);
    const response = await fetch(metadata.url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as PortfolioData;
  } catch {
    return null;
  }
}

export async function writeBlobPortfolio(data: PortfolioData): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return;
  }

  await put(portfolioBlobPath, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  });
}
