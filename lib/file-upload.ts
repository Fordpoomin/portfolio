import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

export async function saveUploadedProfileImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = path.extname(file.name || "").toLowerCase() || ".jpg";
  const safeExtension = [".jpg", ".jpeg", ".png", ".webp"].includes(extension) ? extension : ".jpg";

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`profiles/profile-${Date.now()}${safeExtension}`, file, {
      access: "public",
      addRandomSuffix: false
    });

    return blob.url;
  }

  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    throw new Error("Profile image upload requires BLOB_READ_WRITE_TOKEN in production.");
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const fileName = `profile-${Date.now()}${safeExtension}`;
  const filePath = path.join(uploadsDir, fileName);

  const arrayBuffer = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(arrayBuffer));

  return `/uploads/${fileName}`;
}
