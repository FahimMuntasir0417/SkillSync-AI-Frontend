export function CardSkeleton() {
  return (
    <div className="card h-full overflow-hidden">
      <div className="skeleton h-44 w-full" />
      <div className="space-y-4 p-5">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-6 w-4/5 rounded" />
        <div className="skeleton h-16 w-full rounded" />
        <div className="flex gap-3">
          <div className="skeleton h-8 w-20 rounded" />
          <div className="skeleton h-8 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="card overflow-hidden">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 border-b border-border p-4 last:border-0">
          <div className="skeleton h-5 rounded" />
          <div className="skeleton h-5 rounded" />
          <div className="skeleton h-5 rounded" />
          <div className="skeleton h-5 rounded" />
        </div>
      ))}
    </div>
  );
}
