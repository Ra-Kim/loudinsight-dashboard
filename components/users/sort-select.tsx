"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Name A–Z", value: "firstName-asc" },
  { label: "Name Z–A", value: "firstName-desc" },
] as const;

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sortBy")
    ? `${searchParams.get("sortBy")}-${searchParams.get("order") ?? "asc"}`
    : "";

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      const [sortBy, order] = value.split("-");
      params.set("sortBy", sortBy);
      params.set("order", order);
    } else {
      params.delete("sortBy");
      params.delete("order");
    }
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <label className="flex items-center gap-1 rounded-lg bg-[#F9FBFF] px-3 py-2 text-xs h-9.5">
      <span className="text-[#7E7E7E]">Sort by :</span>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent font-semibold text-[#3D3C42] outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}