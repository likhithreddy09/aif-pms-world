"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { deleteLandingPage, setLandingStatus } from "@/lib/content-actions";
import { formatRelative } from "@/lib/utils";
import type { LandingPage } from "@prisma/client";

export function PagesTable({ pages }: { pages: LandingPage[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="overflow-x-auto border border-ink/10 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-ink/10 text-[11px] uppercase tracking-[0.14em] text-ink-400">
          <tr>
            <th className="px-4 py-3 font-medium">Page</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-ink-400">
                No landing pages yet. Create a page to publish on the public site.
              </td>
            </tr>
          ) : (
            pages.map((page) => (
              <tr key={page.id} className="border-b border-ink/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/pages/${page.id}/edit`} className="font-medium hover:text-gold-dark">
                    {page.title}
                  </Link>
                  <p className="text-xs text-ink-400">/{page.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={page.status as "draft" | "published" | "archived"}>{page.status}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-500">{formatRelative(page.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/pages/${page.id}/edit`} className="text-xs text-gold-dark underline">
                      Edit
                    </Link>
                    {page.status === "published" ? (
                      <Link href={`/${page.slug}`} target="_blank" className="text-xs text-ink-600 underline">
                        View
                      </Link>
                    ) : null}
                    {page.status !== "published" ? (
                      <button
                        type="button"
                        disabled={pending}
                        className="text-xs text-ink-600 underline"
                        onClick={() =>
                          startTransition(async () => {
                            await setLandingStatus(page.id, "published");
                            router.refresh();
                          })
                        }
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={pending}
                        className="text-xs text-ink-600 underline"
                        onClick={() =>
                          startTransition(async () => {
                            await setLandingStatus(page.id, "draft");
                            router.refresh();
                          })
                        }
                      >
                        Unpublish
                      </button>
                    )}
                    <form action={deleteLandingPage.bind(null, page.id)}>
                      <button type="submit" className="text-xs text-red-700 underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
