"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { uniqueSlug } from "@/lib/slug";
import { managerFormSchema, publishSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseNumber(value?: string | null) {
  if (!value || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseIntValue(value?: string | null) {
  if (!value || value.trim() === "") return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

export type ActionResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  id?: string;
};

export async function saveAssetManager(
  id: string | null,
  raw: unknown,
  intent: "draft" | "publish"
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = (intent === "publish" ? publishSchema : managerFormSchema).safeParse(raw);
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
    const slug = await uniqueSlug(data.name, async (candidate) => {
      const existing = await db.assetManager.findUnique({ where: { slug: candidate } });
      return Boolean(existing && existing.id !== id);
    });

    const payload = {
      name: data.name,
      displayName: emptyToNull(data.displayName),
      slug,
      description: data.description,
      type: data.type,
      websiteUrl: emptyToNull(data.websiteUrl),
      logoUrl: emptyToNull(data.logoUrl),
      coverImageUrl: emptyToNull(data.coverImageUrl),
      contactPerson: emptyToNull(data.contactPerson),
      contactEmail: emptyToNull(data.contactEmail),
      contactPhone: emptyToNull(data.contactPhone),
      address: emptyToNull(data.address),
      sebiRegistrationNumber: emptyToNull(data.sebiRegistrationNumber),
      registrationType: emptyToNull(data.registrationType),
      licenseDocumentUrl: emptyToNull(data.licenseDocumentUrl),
      licenseValidity: parseDate(data.licenseValidity),
      strategyName: emptyToNull(data.strategyName),
      investmentPhilosophy: emptyToNull(data.investmentPhilosophy),
      investmentApproach: emptyToNull(data.investmentApproach),
      riskProfile: emptyToNull(data.riskProfile),
      minimumInvestment: emptyToNull(data.minimumInvestment),
      lockInPeriod: emptyToNull(data.lockInPeriod),
      inceptionDate: parseDate(data.inceptionDate),
      aum: emptyToNull(data.aum),
      clientCount: parseIntValue(data.clientCount),
      oneYearReturn: parseNumber(data.oneYearReturn),
      threeYearReturn: parseNumber(data.threeYearReturn),
      fiveYearReturn: parseNumber(data.fiveYearReturn),
      sinceInceptionReturn: parseNumber(data.sinceInceptionReturn),
      status,
      featured: data.featured,
    };

    const manager = id
      ? await db.assetManager.update({
          where: { id },
          data: {
            ...payload,
            categories: {
              deleteMany: {},
              create: data.categoryIds.map((categoryId) => ({ categoryId })),
            },
          },
        })
      : await db.assetManager.create({
          data: {
            ...payload,
            categories: {
              create: data.categoryIds.map((categoryId) => ({ categoryId })),
            },
          },
        });

    revalidatePath("/");
    revalidatePath("/pms");
    revalidatePath("/aif");
    revalidatePath("/asset-managers");
    revalidatePath(`/asset-managers/${manager.slug}`);
    revalidatePath("/admin/asset-managers");
    revalidatePath("/admin/dashboard");

    return { ok: true, id: manager.id };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Unable to save asset manager. Please try again." };
  }
}

export async function setManagerStatus(id: string, status: "draft" | "published" | "archived") {
  await requireAdmin();
  const manager = await db.assetManager.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/");
  revalidatePath("/pms");
  revalidatePath("/aif");
  revalidatePath("/asset-managers");
  revalidatePath(`/asset-managers/${manager.slug}`);
  revalidatePath("/admin/asset-managers");
  revalidatePath("/admin/dashboard");
}

export async function deleteAssetManager(id: string) {
  await requireAdmin();
  await db.assetManager.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/pms");
  revalidatePath("/aif");
  revalidatePath("/asset-managers");
  revalidatePath("/admin/asset-managers");
  revalidatePath("/admin/dashboard");
  redirect("/admin/asset-managers");
}

export async function createCategory(name: string) {
  await requireAdmin();
  const trimmed = name.trim();
  if (!trimmed) {
    return { ok: false, error: "Category name is required." };
  }
  try {
    const { slugify } = await import("@/lib/slug");
    await db.category.create({
      data: { name: trimmed, slug: slugify(trimmed) },
    });
    revalidatePath("/admin/categories");
    return { ok: true };
  } catch {
    return { ok: false, error: "A category with this name already exists." };
  }
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
