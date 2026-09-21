"use client";

import { useState, useTransition } from "react";
import { createCategory, deleteCategory } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function CategoriesManager({
  categories,
}: {
  categories: { id: string; name: string; slug: string }[];
}) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <form
        className="h-fit space-y-3 border border-ink/10 bg-white p-5"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const name = String(new FormData(form).get("name") ?? "");
          startTransition(async () => {
            const result = await createCategory(name);
            if (!result.ok) setError(result.error || "Unable to add category.");
            else {
              setError("");
              form.reset();
            }
          });
        }}
      >
        <Label htmlFor="name">New category</Label>
        <Input id="name" name="name" required placeholder="e.g. Flexi Cap" />
        {error ? <p className="text-xs text-red-700">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          Add category
        </Button>
      </form>
      <div className="border border-ink/10 bg-white">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between border-b border-ink/10 px-4 py-3 last:border-b-0"
          >
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-xs text-ink-400">{category.slug}</p>
            </div>
            <button
              className="text-sm text-red-700 underline"
              onClick={() =>
                startTransition(async () => {
                  await deleteCategory(category.id);
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
