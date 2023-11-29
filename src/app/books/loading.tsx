export default function Loading() {
  return (
    <div>
      <h2 className="py-4 text-2xl font-bold">Books</h2>
      <div className="flex flex-wrap gap-2">
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
        <div className="h-72 w-56 animate-pulse rounded bg-slate-600" />
      </div>
    </div>
  );
}
