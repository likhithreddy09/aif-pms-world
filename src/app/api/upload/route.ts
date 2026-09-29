import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

const LOGO_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
]);
const DOC_TYPES = new Set(["application/pdf"]);
const MAX_BYTES = 6 * 1024 * 1024;

const EXT_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-").slice(0, 80);
}

/** FormData file parts are Blob-like; avoid `instanceof File` (not defined in some Node runtimes). */
function asUploadBlob(value: FormDataEntryValue | null): Blob | null {
  if (!value || typeof value === "string") return null;
  if (typeof (value as Blob).arrayBuffer !== "function") return null;
  return value as Blob;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await request.formData();
    const file = asUploadBlob(form.get("file"));
    const kind = String(form.get("kind") ?? "logo");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is too large. Maximum size is 6MB." }, { status: 400 });
    }

    const originalName =
      "name" in file && typeof (file as File).name === "string"
        ? (file as File).name
        : "upload";
    const ext = path.extname(originalName).toLowerCase() || (kind === "document" ? ".pdf" : ".png");
    const mime = (file.type || EXT_MIME[ext] || "").toLowerCase();

    const allowed = kind === "document" ? DOC_TYPES : LOGO_TYPES;
    if (!allowed.has(mime)) {
      return NextResponse.json(
        {
          error:
            kind === "document"
              ? "License document must be a PDF."
              : "Image must be PNG, JPG, WEBP or SVG.",
        },
        { status: 400 }
      );
    }

    const filename = `${Date.now()}-${safeName(path.basename(originalName, ext) || "image")}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Unable to upload file. Please try again." }, { status: 500 });
  }
}
