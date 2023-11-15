export default function Loading() {
  return (
    <div>
      <h2 className="font-bold text-2xl py-4">Books</h2>
      <div className="flex gap-2 flex-wrap">
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
        <div className="w-56 h-72 bg-slate-600 animate-pulse rounded" />
      </div>
    </div>
  );
}
