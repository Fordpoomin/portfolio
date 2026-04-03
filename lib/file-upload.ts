import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveUploadedProfileImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const extension = path.extname(file.name || "").toLowerCase() || ".jpg";
  const safeExtension = [".jpg", ".jpeg", ".png", ".webp"].includes(extension) ? extension : ".jpg";
  const fileName = `profile-${Date.now()}${safeExtension}`;
  const filePath = path.join(uploadsDir, fileName);

  const arrayBuffer = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(arrayBuffer));

  return `/uploads/${fileName}`;
}
