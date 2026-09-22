"use client";

import { useState, useTransition } from "react";
import { FileUpload } from "@/components/admin/file-upload";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { saveSeoSettings, type ActionResult } from "@/lib/content-actions";
import type { SeoSettings } from "@prisma/client";

export function SeoSettingsForm({ settings }: { settings: SeoSettings }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [og, setOg] = useState(settings.defaultOgImage ?? "");
  const [robotsIndex, setRobotsIndex] = useState(settings.robotsIndex);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      siteName: String(form.get("siteName") ?? ""),
      defaultTitle: String(form.get("defaultTitle") ?? ""),
      titleTemplate: String(form.get("titleTemplate") ?? ""),
      defaultDescription: String(form.get("defaultDescription") ?? ""),
      defaultOgImage: og,
      twitterHandle: String(form.get("twitterHandle") ?? ""),
      robotsIndex,
      googleVerification: String(form.get("googleVerification") ?? ""),
    };
    startTransition(async () => {
      const response = await saveSeoSettings(payload);
      setResult(response);
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5 border border-ink/10 bg-white p-6">
      {result?.ok ? (
        <p className="border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          SEO settings saved.
        </p>
      ) : null}
      {result?.error ? (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{result.error}</p>
      ) : null}

      <div>
        <Label htmlFor="siteName">Site name</Label>
        <Input id="siteName" name="siteName" defaultValue={settings.siteName} required />
      </div>
      <div>
        <Label htmlFor="defaultTitle">Default title</Label>
        <Input id="defaultTitle" name="defaultTitle" defaultValue={settings.defaultTitle} required />
      </div>
      <div>
        <Label htmlFor="titleTemplate">Title template</Label>
        <Input id="titleTemplate" name="titleTemplate" defaultValue={settings.titleTemplate} required />
        <p className="mt-1 text-xs text-ink-400">Use %s for the page title.</p>
      </div>
      <div>
        <Label htmlFor="defaultDescription">Default meta description</Label>
        <Textarea
          id="defaultDescription"
          name="defaultDescription"
          rows={4}
          defaultValue={settings.defaultDescription}
          required
        />
      </div>
      <div>
        <FileUpload label="Default OG image" value={og} onChange={setOg} accept="image/*" kind="logo" />
      </div>
      <div>
        <Label htmlFor="twitterHandle">Twitter / X handle</Label>
        <Input id="twitterHandle" name="twitterHandle" defaultValue={settings.twitterHandle ?? ""} placeholder="@pms_aif_world" />
      </div>
      <div>
        <Label htmlFor="googleVerification">Google site verification</Label>
        <Input
          id="googleVerification"
          name="googleVerification"
          defaultValue={settings.googleVerification ?? ""}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={robotsIndex} onChange={(e) => setRobotsIndex(e.target.checked)} />
        Allow search engines to index the site
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save SEO settings"}
      </Button>
    </form>
  );
}
