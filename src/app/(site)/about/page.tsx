import { getPage } from "@/data/pages";
import { EditorialView } from "@/components/lux/editorial";

export const metadata = { title: "About PMS AIF WORLD" };

export default function AboutPage() {
  const page = getPage("about-us");
  if (!page) return null;
  return <EditorialView page={page} />;
}
