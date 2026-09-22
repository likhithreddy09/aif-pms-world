import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";

type Props = { params: { rest: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(["aif", ...params.rest].join("/"));
}

export default async function AifNested({ params }: Props) {
  return <CatchPage slug={["aif", ...params.rest].join("/")} />;
}
