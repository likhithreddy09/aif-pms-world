import type { Prisma } from "@prisma/client";

export const managerInclude = {
  categories: { include: { category: true } },
} satisfies Prisma.AssetManagerInclude;

export type ManagerWithCategories = Prisma.AssetManagerGetPayload<{
  include: typeof managerInclude;
}>;

export function categoryNames(manager: ManagerWithCategories) {
  return manager.categories.map((item) => item.category.name);
}
