export default function Loading() {
  return (
    <div className="min-h-[40vh] bg-[#16130e]">
      <div className="container-page py-14">
        <div className="h-3 w-24 animate-pulse rounded-sm bg-gold/25" />
        <div className="mt-4 h-12 w-3/4 max-w-xl animate-pulse rounded-sm bg-gold/15" />
        <div className="mt-4 h-4 w-1/2 max-w-md animate-pulse rounded-sm bg-gold/10" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="h-32 animate-pulse rounded-sm bg-gold/10" />
          <div className="h-32 animate-pulse rounded-sm bg-gold/10" />
          <div className="h-32 animate-pulse rounded-sm bg-gold/10" />
        </div>
      </div>
    </div>
  );
}
