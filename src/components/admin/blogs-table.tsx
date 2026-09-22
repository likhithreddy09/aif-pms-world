"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { deleteBlogPost, setBlogStatus } from "@/lib/content-actions";
import { formatRelative } from "@/lib/utils";
import type { BlogPost } from "@prisma/client";

export function BlogsTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="overflow-x-auto border border-ink/10 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-ink/10 text-[11px] uppercase tracking-[0.14em] text-ink-400">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-ink-400">
                No blog posts yet. Create your first article.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id} className="border-b border-ink/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/blogs/${post.id}/edit`} className="font-medium hover:text-gold-dark">
                    {post.title}
                  </Link>
                  <p className="text-xs text-ink-400">/{post.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={post.status as "draft" | "published" | "archived"}>{post.status}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-500">{formatRelative(post.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/blogs/${post.id}/edit`} className="text-xs text-gold-dark underline">
                      Edit
                    </Link>
                    {post.status !== "published" ? (
                      <button
                        type="button"
                        disabled={pending}
                        className="text-xs text-ink-600 underline"
                        onClick={() =>
                          startTransition(async () => {
                            await setBlogStatus(post.id, "published");
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
                            await setBlogStatus(post.id, "draft");
                            router.refresh();
                          })
                        }
                      >
                        Unpublish
                      </button>
                    )}
                    <form action={deleteBlogPost.bind(null, post.id)}>
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
