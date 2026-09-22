"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/file-upload";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { saveBlogPost, type ActionResult } from "@/lib/content-actions";
import type { BlogPost } from "@prisma/client";

function isoDate(value?: Date | string | null) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function BlogForm({ post }: { post?: BlogPost | null }) {
  const router = useRouter();
  const intentRef = useRef<"draft" | "publish">("publish");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(post?.ogImageUrl ?? "");
  const [noIndex, setNoIndex] = useState(post?.noIndex ?? false);

  function onSubmit(intent: "draft" | "publish") {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload = {
        title: String(form.get("title") ?? ""),
        slug: String(form.get("slug") ?? ""),
        excerpt: String(form.get("excerpt") ?? ""),
        body: String(form.get("body") ?? ""),
        coverImageUrl,
        kicker: String(form.get("kicker") ?? "Article"),
        authorName: String(form.get("authorName") ?? ""),
        status: intent === "publish" ? "published" : status,
        publishedAt: String(form.get("publishedAt") ?? ""),
        metaTitle: String(form.get("metaTitle") ?? ""),
        metaDescription: String(form.get("metaDescription") ?? ""),
        ogImageUrl,
        canonicalUrl: String(form.get("canonicalUrl") ?? ""),
        noIndex,
      };

      startTransition(async () => {
        try {
          const response = await saveBlogPost(post?.id ?? null, payload, intent);
          setResult(response);
          if (response.ok) {
            router.push("/admin/blogs");
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

  return (
    <form onSubmit={(e) => onSubmit(intentRef.current)(e)} className="space-y-8">
      {result?.error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{result.error}</p>
      ) : null}

      <section className="space-y-4 border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-lg">Post</h2>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post?.title ?? ""} required />
          <FieldError message={errors.title} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input id="slug" name="slug" defaultValue={post?.slug ?? ""} placeholder="auto-from-title" />
          </div>
          <div>
            <Label htmlFor="kicker">Kicker / category</Label>
            <Input id="kicker" name="kicker" defaultValue={post?.kicker ?? "Article"} />
          </div>
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt ?? ""} />
          <FieldError message={errors.excerpt} />
        </div>
        <div>
          <Label htmlFor="body">Body (paragraphs separated by blank lines)</Label>
          <Textarea id="body" name="body" rows={12} defaultValue={post?.body ?? ""} />
          <FieldError message={errors.body} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="authorName">Author</Label>
            <Input id="authorName" name="authorName" defaultValue={post?.authorName ?? ""} />
          </div>
          <div>
            <Label htmlFor="publishedAt">Publish date</Label>
            <Input
              id="publishedAt"
              name="publishedAt"
              type="date"
              defaultValue={isoDate(post?.publishedAt)}
            />
          </div>
        </div>
        <div>
          <FileUpload label="Cover image" value={coverImageUrl} onChange={setCoverImageUrl} accept="image/*" kind="logo" />
        </div>
        <div className="flex flex-wrap gap-4">
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
        </div>
      </section>

      <section className="space-y-4 border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-lg">SEO</h2>
        <div>
          <Label htmlFor="metaTitle">Meta title</Label>
          <Input id="metaTitle" name="metaTitle" defaultValue={post?.metaTitle ?? ""} />
        </div>
        <div>
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea
            id="metaDescription"
            name="metaDescription"
            rows={3}
            defaultValue={post?.metaDescription ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="canonicalUrl">Canonical URL</Label>
          <Input id="canonicalUrl" name="canonicalUrl" defaultValue={post?.canonicalUrl ?? ""} />
        </div>
        <div>
          <FileUpload label="OG image" value={ogImageUrl} onChange={setOgImageUrl} accept="image/*" kind="logo" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={noIndex} onChange={(e) => setNoIndex(e.target.checked)} />
          No-index (hide from search engines)
        </label>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={pending}
          onClick={() => {
            intentRef.current = "draft";
          }}
          variant="secondary"
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
