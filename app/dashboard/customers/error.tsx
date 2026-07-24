"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Couldn&apos;t load customers
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Something went wrong fetching the data. It might be a network hiccup.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Try again
        </button>
        {error.digest ? (
          <p className="mt-4 text-xs text-gray-400">Ref: {error.digest}</p>
        ) : null}
      </div>
    </div>
  );
}
