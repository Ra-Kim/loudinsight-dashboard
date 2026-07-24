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
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-3 w-28 rounded bg-gray-200" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-52 rounded-lg bg-gray-200" />
            <div className="h-9 w-36 rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4"
            >
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
