const TableSkelton = () => {
  return (
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
  );
};

export default TableSkelton;
