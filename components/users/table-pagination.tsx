"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function TablePagination({
  page, limit, total,
}: { page: number; limit: number; total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams);
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    router.push(`?${params.toString()}`, { scroll: false });
  }

  // windowed page list: 1 … around current … last
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-[#B5B7C0]">
        Showing data {start} to {end} of {total.toLocaleString()} entries
      </p>
      <div className="flex items-center gap-2">
        <PageBtn label="‹" disabled={page <= 1} onClick={() => goTo(page - 1)} />
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-1 text-xs text-[#404B52]">…</span>
          ) : (
            <PageBtn key={p} label={String(p)} active={p === page} onClick={() => goTo(p)} />
          ),
        )}
        <PageBtn label="›" disabled={page >= totalPages} onClick={() => goTo(page + 1)} />
      </div>
    </div>
  );
}

function PageBtn({ label, active, disabled, onClick }: {
  label: string; active?: boolean; disabled?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-6 min-w-6 rounded border px-1.5 text-xs transition",
        active
          ? "border-[#5932EA] bg-[#5932EA] text-white"
          : "border-[#EEEEEE] bg-[#F5F5F5] text-[#404B52] hover:bg-gray-200",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {label}
    </button>
  );
}