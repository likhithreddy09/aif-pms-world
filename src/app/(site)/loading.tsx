export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-ink">
      <div className="container-page py-24">
        <div className="h-8 w-40 animate-pulse bg-gold/20" />
        <div className="mt-6 h-16 w-2/3 animate-pulse bg-gold/10" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="h-40 animate-pulse bg-gold/10" />
          <div className="h-40 animate-pulse bg-gold/10" />
          <div className="h-40 animate-pulse bg-gold/10" />
        </div>
      </div>
    </div>
  );
}
