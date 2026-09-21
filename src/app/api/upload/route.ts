import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

const LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
];
const DOC_TYPES = ["application/pdf"];
const MAX_BYTES = 6 * 1024 * 1024;

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-").slice(0, 80);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") ?? "logo");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large. Maximum size is 6MB." }, { status: 400 });
  }

  const allowed = kind === "document" ? DOC_TYPES : LOGO_TYPES;
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      {
        error:
          kind === "document"
            ? "License document must be a PDF."
            : "Logo must be PNG, JPG, WEBP or SVG.",
      },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".png");
  const filename = `${Date.now()}-${safeName(path.basename(file.name, ext))}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
