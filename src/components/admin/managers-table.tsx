"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteAssetManager, setManagerStatus } from "@/lib/actions";
import { ManagerWithCategories } from "@/lib/queries";
import { formatRelative, typeLabel } from "@/lib/utils";

export function ManagersTable({ managers }: { managers: ManagerWithCategories[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (managers.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
        <h2 className="font-semibold text-2xl">No Asset Managers Found</h2>
        <p className="mt-2 text-sm text-ink-500">Start by adding your first asset manager.</p>
        <Link
          href="/admin/asset-managers/new"
          className="mt-6 inline-flex h-10 items-center bg-gold px-4 text-sm uppercase tracking-[0.12em] text-ink"
        >
          + Add Asset Manager
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-ink/10 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-cream text-[11px] uppercase tracking-[0.14em] text-ink-500">
          <tr>
            <th className="px-4 py-3">Logo</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id} className="border-t border-ink/10">
              <td className="px-4 py-3">
                <div className="h-10 w-10 overflow-hidden border border-ink/10 bg-paper">
                  {manager.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={manager.logoUrl} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{manager.name}</td>
              <td className="px-4 py-3">{typeLabel(manager.type)}</td>
              <td className="px-4 py-3">
                <Badge tone={manager.status as "draft" | "published" | "archived"}>
                  {manager.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-ink-500">{formatRelative(manager.updatedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/asset-managers/${manager.id}/edit`} className="text-sm underline">
                    Edit
                  </Link>
                  {manager.status === "published" ? (
                    <button
                      className="text-sm underline"
                      disabled={pending && pendingId === manager.id}
                      onClick={() => {
                        setPendingId(manager.id);
                        startTransition(async () => {
                          await setManagerStatus(manager.id, "draft");
                          router.refresh();
                        });
                      }}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      className="text-sm underline"
                      disabled={pending && pendingId === manager.id}
                      onClick={() => {
                        setPendingId(manager.id);
                        startTransition(async () => {
                          await setManagerStatus(manager.id, "published");
                          router.refresh();
                        });
                      }}
                    >
                      Publish
                    </button>
                  )}
                  <button className="text-sm text-red-700 underline" onClick={() => setConfirmId(manager.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-md bg-white p-6">
            <h3 className="font-semibold text-2xl">Delete asset manager?</h3>
            <p className="mt-2 text-sm text-ink-500">
              This removes the listing from the admin dashboard and the public website.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="danger"
                onClick={() => {
                  startTransition(async () => {
                    await deleteAssetManager(confirmId);
                  });
                }}
              >
                Delete
              </Button>
              <Button variant="outline" onClick={() => setConfirmId(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
