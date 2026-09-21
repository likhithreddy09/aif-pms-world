import { LoginForm } from "@/components/admin/login-form";
import Link from "next/link";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 text-cream">
      <div className="w-full max-w-md border border-gold/30 bg-ink-800 p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">PMS AIF World</p>
        <h1 className="mt-3 font-semibold text-4xl">Admin login</h1>
        <p className="mt-2 text-sm text-cream/60">
          Sign in to manage and publish asset managers.
        </p>
        <div className="mt-8">
          <LoginForm nextPath={searchParams.next || "/admin/dashboard"} />
        </div>
        <p className="mt-6 text-xs text-cream/40">
          Demo: admin@pmsaifworld.com / DemoAdmin@2026
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-gold">
          Back to public site
        </Link>
      </div>
    </div>
  );
}
