export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function uniqueSlug(
  baseName: string,
  exists: (slug: string) => Promise<boolean>
) {
  const base = slugify(baseName) || "asset-manager";
  let slug = base;
  let i = 2;
  while (await exists(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}
