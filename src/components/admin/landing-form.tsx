"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/file-upload";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import {
  saveLandingPage,
  type ActionResult,
} from "@/lib/content-actions";
import { faqsToText, sectionsToText } from "@/lib/content-format";
import { cn } from "@/lib/utils";
import type { LandingPage } from "@prisma/client";

function parseJsonSafe<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function LandingForm({ page }: { page?: LandingPage | null }) {
  const router = useRouter();
  const intentRef = useRef<"draft" | "publish">("publish");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [status, setStatus] = useState(page?.status ?? "draft");
  const [ogImageUrl, setOgImageUrl] = useState(page?.ogImageUrl ?? "");
  const [noIndex, setNoIndex] = useState(page?.noIndex ?? false);
  const [lead, setLead] = useState(page?.lead ?? "");

  const sectionsDefault = page
    ? sectionsToText(parseJsonSafe(page.sectionsJson, [] as { heading: string; body: string }[]))
    : "";
  const faqsDefault = page
    ? faqsToText(parseJsonSafe(page.faqsJson, [] as { q: string; a: string }[]))
    : "";
  const widgetsDefault = page
    ? parseJsonSafe<string[]>(page.widgetsJson, []).join(", ")
    : "stats, voices";

  function onSubmit(intent: "draft" | "publish") {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const nextStatus =
        intent === "publish" ? "published" : status === "archived" ? "archived" : "draft";

      const payload = {
        title: String(form.get("title") ?? ""),
        slug: String(form.get("slug") ?? ""),
        eyebrow: String(form.get("eyebrow") ?? ""),
        lead: String(form.get("lead") ?? ""),
        sectionsText: String(form.get("sectionsText") ?? ""),
        widgets: String(form.get("widgets") ?? ""),
        faqsText: String(form.get("faqsText") ?? ""),
        kind: String(form.get("kind") ?? "generic"),
        status: nextStatus,
        metaTitle: String(form.get("metaTitle") ?? ""),
        metaDescription: String(form.get("metaDescription") ?? ""),
        ogImageUrl,
        canonicalUrl: String(form.get("canonicalUrl") ?? ""),
        noIndex,
      };

      startTransition(async () => {
        try {
          const response = await saveLandingPage(page?.id ?? null, payload, intent);
          setResult(response);
          if (response.ok) {
            router.push("/admin/pages");
            router.refresh();
          }
        } catch (error) {
          console.error(error);
          setResult({
            ok: false,
            error:
              "Could not reach the server. Disable ad-block / request-blocking extensions for localhost, then try again.",
          });
        }
      });
    };
  }

  const errors = result?.fieldErrors ?? {};
  const leadOkForPublish = lead.trim().length >= 20;

  return (
    <form onSubmit={(e) => onSubmit(intentRef.current)(e)} className="space-y-8">
      {result?.error ? (
        <div className="space-y-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p className="font-medium">{result.error}</p>
          {Object.keys(errors).length > 0 ? (
            <ul className="list-disc space-y-0.5 pl-5 text-xs">
              {Object.entries(errors).map(([key, message]) => (
                <li key={key}>
                  <span className="font-medium capitalize">{key}</span>: {message}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <section className="space-y-4 border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-lg">Landing page</h2>
        <div>
          <Label htmlFor="title" required>
            Title
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={page?.title ?? ""}
            required
            className={cn(errors.title && "border-red-500 focus:border-red-500 focus:ring-red-200")}
          />
          <FieldError message={errors.title} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="slug" required>
              URL slug
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={page?.slug ?? ""}
              required
              placeholder="our-advantage"
              className={cn(errors.slug && "border-red-500 focus:border-red-500 focus:ring-red-200")}
            />
            <p className="mt-1 text-xs text-ink-400">Public URL: /your-slug</p>
            <FieldError message={errors.slug} />
          </div>
          <div>
            <Label htmlFor="kind">Kind</Label>
            <Input id="kind" name="kind" defaultValue={page?.kind ?? "generic"} />
          </div>
        </div>
        <div>
          <Label htmlFor="eyebrow">Eyebrow</Label>
          <Input id="eyebrow" name="eyebrow" defaultValue={page?.eyebrow ?? ""} />
        </div>
        <div>
          <Label htmlFor="lead" required>
            Lead / intro
          </Label>
          <Textarea
            id="lead"
            name="lead"
            rows={3}
            value={lead}
            onChange={(e) => setLead(e.target.value)}
            className={cn(errors.lead && "border-red-500 focus:border-red-500 focus:ring-red-200")}
          />
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <p className={cn("text-xs", leadOkForPublish ? "text-ink-400" : "text-amber-700")}>
              {lead.trim().length}/20 characters minimum to publish
            </p>
            <FieldError message={errors.lead} />
          </div>
        </div>
        <div>
          <Label htmlFor="sectionsText">Sections (one per line: Heading | Body)</Label>
          <Textarea
            id="sectionsText"
            name="sectionsText"
            rows={8}
            defaultValue={sectionsDefault}
            placeholder={"Why us | We focus on concentration, not collection.\nProcess | 5P framework then QRC scores."}
          />
          <p className="mt-1 text-xs text-ink-400">
            Separate heading and body with a pipe: <code>Heading | Body text</code>
          </p>
        </div>
        <div>
          <Label htmlFor="widgets">Widgets (comma-separated)</Label>
          <Input
            id="widgets"
            name="widgets"
            defaultValue={widgetsDefault}
            placeholder="stats, qrc, orbit, voices, blog, products"
          />
          <p className="mt-1 text-xs text-ink-400">
            Available: stats, fivep, orbit, qrc, voices, blog, products, team, awards, events, news, compare, form, marquee
          </p>
        </div>
        <div>
          <Label htmlFor="faqsText">FAQs (one per line: Question | Answer)</Label>
          <Textarea
            id="faqsText"
            name="faqsText"
            rows={5}
            defaultValue={faqsDefault}
            placeholder="What is PMS? | Portfolio Management Services for high-net-worth investors."
          />
          <p className="mt-1 text-xs text-ink-400">
            Separate question and answer with a pipe: <code>Question | Answer</code>
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span>Status</span>
          <select
            className="border border-ink/15 bg-white px-2 py-1.5 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <p className="text-xs text-ink-400">
          “Save draft” always stores a draft (or archive). “Publish” requires a lead of at least 20
          characters.
        </p>
      </section>

      <section className="space-y-4 border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-lg">SEO</h2>
        <div>
          <Label htmlFor="metaTitle">Meta title</Label>
          <Input id="metaTitle" name="metaTitle" defaultValue={page?.metaTitle ?? ""} />
        </div>
        <div>
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea
            id="metaDescription"
            name="metaDescription"
            rows={3}
            defaultValue={page?.metaDescription ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="canonicalUrl">Canonical URL</Label>
          <Input
            id="canonicalUrl"
            name="canonicalUrl"
            defaultValue={page?.canonicalUrl ?? ""}
            placeholder="https://www.pmsaifworld.com/your-page"
            className={cn(
              errors.canonicalUrl && "border-red-500 focus:border-red-500 focus:ring-red-200"
            )}
          />
          <p className="mt-1 text-xs text-ink-400">Optional. Must be a full URL starting with https://</p>
          <FieldError message={errors.canonicalUrl} />
        </div>
        <div>
          <FileUpload label="OG image" value={ogImageUrl} onChange={setOgImageUrl} accept="image/*" kind="logo" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={noIndex} onChange={(e) => setNoIndex(e.target.checked)} />
          No-index
        </label>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={pending}
          variant="secondary"
          onClick={() => {
            intentRef.current = "draft";
          }}
        >
          Save draft
        </Button>
        <Button
          type="submit"
          disabled={pending}
          onClick={() => {
            intentRef.current = "publish";
          }}
        >
          {pending ? "Saving…" : "Publish"}
        </Button>
      </div>
    </form>
  );
}
