"use client";

import { ReactNode } from "react";
import { PageEnter } from "@/components/lux/motion";

export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
