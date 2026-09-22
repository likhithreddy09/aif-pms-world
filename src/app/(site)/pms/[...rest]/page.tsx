import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";

type Props = { params: { rest: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(["pms", ...params.rest].join("/"));
}

export default async function PmsNested({ params }: Props) {
  return <CatchPage slug={["pms", ...params.rest].join("/")} />;
}
