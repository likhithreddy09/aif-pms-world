"use client";

import { useState } from "react";
import { loginAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function action(formData: FormData) {
    setPending(true);
    setError("");
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={nextPath} />
      <div>
        <Label htmlFor="email" className="!text-gold-muted">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue="admin@pmsaifworld.com"
          required
          className="border-white/20 bg-ink text-cream placeholder:text-cream/40"
        />
      </div>
      <div>
        <Label htmlFor="password" className="!text-gold-muted">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="border-white/20 bg-ink text-cream placeholder:text-cream/40"
        />
      </div>
      {error ? <p className="text-sm text-red-200">{error}</p> : null}
      <Button type="submit" variant="gold" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
