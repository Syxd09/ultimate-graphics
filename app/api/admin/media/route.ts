import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAuthorized } from "@/lib/admin-auth";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

async function ensureImagesDir() {
  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  } catch {}
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureImagesDir();

  try {
    const files = await fs.readdir(IMAGES_DIR);
    const imageList = [];

    for (const file of files) {
      // Ignore hidden files and system thumbs
      if (file.startsWith(".")) continue;

      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"].includes(ext)) {
        continue;
      }

      const filePath = path.join(IMAGES_DIR, file);
      const stat = await fs.stat(filePath);

      imageList.push({
        name: file,
        url: `/images/${file}`,
        size: stat.size,
        ext: ext.replace(".", "").toUpperCase(),
        mtime: stat.mtime.toISOString(),
      });
    }

    // Sort newest first
    imageList.sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime());

    return NextResponse.json({ success: true, media: imageList });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to scan media directory" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureImagesDir();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file uploaded" }, { status: 400 });
    }

    const rawName = file.name;
    const ext = path.extname(rawName).toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"];

    if (!allowed.includes(ext)) {
      return NextResponse.json(
        { error: `File type ${ext} not allowed. Allowed formats: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    // Clean filename
    const baseName = path
      .basename(rawName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const uniqueName = `${baseName || "asset"}-${Date.now()}${ext}`;
    const destinationPath = path.join(IMAGES_DIR, uniqueName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(destinationPath, buffer);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      file: {
        name: uniqueName,
        url: `/images/${uniqueName}`,
        size: buffer.length,
        ext: ext.replace(".", "").toUpperCase(),
        mtime: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("name");

    if (!fileName) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // Prevent directory traversal
    const safeName = path.basename(fileName);
    const filePath = path.join(IMAGES_DIR, safeName);

    await fs.unlink(filePath);

    return NextResponse.json({ success: true, message: "Image removed permanently" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete image" }, { status: 500 });
  }
}

