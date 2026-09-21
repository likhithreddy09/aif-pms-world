import { Skeleton } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container-page grid gap-6 py-16 sm:grid-cols-3">
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
  );
}
