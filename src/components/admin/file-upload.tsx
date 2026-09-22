"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUpload({
  label,
  accept,
  kind,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  accept: string;
  kind: "logo" | "cover" | "document";
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  required?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setLocalError("");
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("kind", kind === "document" ? "document" : "logo");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setLocalError(data.error || "Unable to upload file. Please try again.");
        return;
      }
      onChange(data.url);
    } catch {
      setLocalError("Unable to upload file. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const isImage = kind !== "document";

  return (
    <div>
      <p className="admin-label">
        {label}
        {required ? <span className="ml-1 text-red-700">*</span> : null}
      </p>
      <label
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-ink/20 bg-white p-4 text-center text-sm text-ink-500 hover:border-gold",
          busy && "opacity-60"
        )}
      >
        {isImage && value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Upload preview" className="h-20 w-20 object-cover" />
        ) : kind === "document" && value ? (
          <span className="inline-flex items-center gap-2 text-ink">
            <FileText className="h-4 w-4" /> Document uploaded
          </span>
        ) : (
          <Upload className="h-5 w-5 text-gold-dark" />
        )}
        <span>{busy ? "Uploading…" : "Click to upload"}</span>
        <input
          type="file"
          accept={accept}
          className="sr-only"
          disabled={busy}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>
      {(error || localError) && (
        <p className="mt-1 text-xs text-red-700">{error || localError}</p>
      )}
    </div>
  );
}
