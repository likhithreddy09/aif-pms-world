"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify, uniqueSlug } from "@/lib/slug";
import {
  blogFormSchema,
  blogPublishSchema,
  landingFormSchema,
  landingPublishSchema,
  seoSettingsSchema,
} from "@/lib/validators";
import type { ActionResult } from "@/lib/actions";
import { faqsFromText, sectionsFromText } from "@/lib/content-format";

export type { ActionResult };

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function saveBlogPost(
  id: string | null,
  raw: unknown,
  intent: "draft" | "publish"
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = (intent === "publish" ? blogPublishSchema : blogFormSchema).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please correct the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  const status = intent === "publish" ? "published" : data.status || "draft";

  try {
    const baseSlug = data.slug?.trim() || slugify(data.title);
    const slug = await uniqueSlug(baseSlug, async (candidate) => {
      const existing = await db.blogPost.findUnique({ where: { slug: candidate } });
      return Boolean(existing && existing.id !== id);
    });

    const publishedAt =
      status === "published"
        ? parseDate(data.publishedAt) ?? new Date()
        : parseDate(data.publishedAt);

    const payload = {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      body: data.body,
      coverImageUrl: emptyToNull(data.coverImageUrl),
      kicker: data.kicker || "Article",
      authorName: emptyToNull(data.authorName),
      status,
      publishedAt,
      metaTitle: emptyToNull(data.metaTitle),
      metaDescription: emptyToNull(data.metaDescription),
      ogImageUrl: emptyToNull(data.ogImageUrl),
      canonicalUrl: emptyToNull(data.canonicalUrl),
      noIndex: data.noIndex,
    };

    const post = id
      ? await db.blogPost.update({ where: { id }, data: payload })
      : await db.blogPost.create({ data: payload });

    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/admin/dashboard");
    return { ok: true, id: post.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save blog post." };
  }
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const post = await db.blogPost.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function setBlogStatus(id: string, status: "draft" | "published" | "archived") {
  await requireAdmin();
  const post = await db.blogPost.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "published" ? new Date() : undefined,
    },
  });
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blogs");
  revalidatePath("/");
}

export async function saveLandingPage(
  id: string | null,
  raw: unknown,
  intent: "draft" | "publish"
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = (intent === "publish" ? landingPublishSchema : landingFormSchema).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please correct the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  const status = intent === "publish" ? "published" : data.status || "draft";

  try {
    const slug = await uniqueSlug(data.slug || data.title, async (candidate) => {
      const existing = await db.landingPage.findUnique({ where: { slug: candidate } });
      return Boolean(existing && existing.id !== id);
    });

    const sections = sectionsFromText(data.sectionsText);
    const faqs = faqsFromText(data.faqsText);
    const widgets = data.widgets
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);

    const payload = {
      title: data.title,
      slug,
      eyebrow: data.eyebrow,
      lead: data.lead,
      sectionsJson: JSON.stringify(sections),
      widgetsJson: JSON.stringify(widgets),
      faqsJson: JSON.stringify(faqs),
      kind: data.kind || "generic",
      status,
      metaTitle: emptyToNull(data.metaTitle),
      metaDescription: emptyToNull(data.metaDescription),
      ogImageUrl: emptyToNull(data.ogImageUrl),
      canonicalUrl: emptyToNull(data.canonicalUrl),
      noIndex: data.noIndex,
    };

    const page = id
      ? await db.landingPage.update({ where: { id }, data: payload })
      : await db.landingPage.create({ data: payload });

    revalidatePath("/");
    revalidatePath(`/${page.slug}`);
    revalidatePath("/admin/pages");
    revalidatePath("/admin/dashboard");
    return { ok: true, id: page.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save landing page." };
  }
}

export async function deleteLandingPage(id: string) {
  await requireAdmin();
  const page = await db.landingPage.delete({ where: { id } });
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function setLandingStatus(id: string, status: "draft" | "published" | "archived") {
  await requireAdmin();
  const page = await db.landingPage.update({ where: { id }, data: { status } });
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pages");
}

export async function saveSeoSettings(raw: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = seoSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please correct the SEO fields." };
  }
  const data = parsed.data;
  await db.seoSettings.upsert({
    where: { id: "site" },
    create: {
      id: "site",
      siteName: data.siteName,
      defaultTitle: data.defaultTitle,
      titleTemplate: data.titleTemplate,
      defaultDescription: data.defaultDescription,
      defaultOgImage: emptyToNull(data.defaultOgImage),
      twitterHandle: emptyToNull(data.twitterHandle),
      robotsIndex: data.robotsIndex,
      googleVerification: emptyToNull(data.googleVerification),
    },
    update: {
      siteName: data.siteName,
      defaultTitle: data.defaultTitle,
      titleTemplate: data.titleTemplate,
      defaultDescription: data.defaultDescription,
      defaultOgImage: emptyToNull(data.defaultOgImage),
      twitterHandle: emptyToNull(data.twitterHandle),
      robotsIndex: data.robotsIndex,
      googleVerification: emptyToNull(data.googleVerification),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/seo");
  return { ok: true };
}
