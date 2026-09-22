import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSession } from "@/lib/auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-paper text-ink">
      <AdminShell user={session}>{children}</AdminShell>
    </div>
  );
}
