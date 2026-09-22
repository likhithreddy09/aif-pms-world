import type { ReactNode } from "react";
import { SiteFooter } from "@/components/lux/footer";
import { SiteHeader } from "@/components/lux/header";
import { FloatingDock } from "@/components/lux/dock";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-cream">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingDock />
    </div>
  );
}
