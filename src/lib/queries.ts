import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const managerInclude = {
  categories: { include: { category: true } },
} satisfies Prisma.AssetManagerInclude;

export type ManagerWithCategories = Prisma.AssetManagerGetPayload<{
  include: typeof managerInclude;
}>;

export function categoryNames(manager: ManagerWithCategories) {
  return manager.categories.map((item) => item.category.name);
}

export async function getPublishedManagers(filters?: {
  type?: "PMS" | "AIF" | "BOTH";
  query?: string;
  category?: string;
}) {
  const where: Prisma.AssetManagerWhereInput = {
    status: "published",
  };

  if (filters?.type === "PMS" || filters?.type === "AIF") {
    where.OR = [{ type: filters.type }, { type: "BOTH" }];
  }

  if (filters?.query) {
    const q = filters.query;
    where.AND = [
      ...(Array.isArray(where.AND) ? where.AND : where.AND ? [where.AND] : []),
      {
        OR: [
          { name: { contains: q } },
          { displayName: { contains: q } },
          { description: { contains: q } },
          { strategyName: { contains: q } },
        ],
      },
    ];
  }

  if (filters?.category) {
    where.categories = {
      some: {
        category: {
          OR: [{ slug: filters.category }, { name: filters.category }],
        },
      },
    };
  }

  return db.assetManager.findMany({
    where,
    include: managerInclude,
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

export async function getFeaturedManagers() {
  return db.assetManager.findMany({
    where: { status: "published", featured: true },
    include: managerInclude,
    orderBy: { name: "asc" },
    take: 6,
  });
}

export async function getManagerBySlug(slug: string) {
  return db.assetManager.findFirst({
    where: { slug, status: "published" },
    include: managerInclude,
  });
}

export async function getManagerById(id: string) {
  return db.assetManager.findUnique({
    where: { id },
    include: managerInclude,
  });
}

export async function getAllManagers() {
  return db.assetManager.findMany({
    include: managerInclude,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getDashboardStats() {
  const [total, pms, aif, published, drafts] = await Promise.all([
    db.assetManager.count(),
    db.assetManager.count({ where: { OR: [{ type: "PMS" }, { type: "BOTH" }] } }),
    db.assetManager.count({ where: { OR: [{ type: "AIF" }, { type: "BOTH" }] } }),
    db.assetManager.count({ where: { status: "published" } }),
    db.assetManager.count({ where: { status: "draft" } }),
  ]);

  const recent = await db.assetManager.findMany({
    include: managerInclude,
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  return { total, pms, aif, published, drafts, recent };
}

export async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}
