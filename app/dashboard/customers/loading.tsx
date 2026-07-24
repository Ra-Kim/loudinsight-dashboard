import TableSkeleton from "@/components/users/table-skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 p-8 animate-pulse">
      {/* greeting */}
      <div className="h-7 w-64 rounded-md bg-gray-200" />

      {/* stat cards strip */}
      <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-6 w-16 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* table card */}
      <TableSkeleton />
    </div>
  );
}
