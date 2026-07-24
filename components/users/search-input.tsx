"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export function SearchInput({
  className,
  placeholder = "Search",
}: {
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get("q") ?? "";
  const [prevUrlValue, setPrevUrlValue] = useState(urlValue);
  const [value, setValue] = useState(urlValue);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sync when URL changes externally (back button), without an effect
  if (urlValue !== prevUrlValue) {
    setPrevUrlValue(urlValue);
    setValue(urlValue);
  }

  function onChange(next: string) {
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (next) params.set("q", next);
      else params.delete("q");
      params.delete("page"); // new search resets to page 1
      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    }, 350);
  }

  return (
    <label
      className={cn(
        "flex h-9.5 items-center gap-2 rounded-[10px] bg-[#F9FBFF] px-3 py-2",
        className,
      )}
    >
      <SearchNormal1
        size={24}
        color="#7E7E7E"
        className={isPending ? "animate-pulse" : ""}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-54 min-w-0 max-w-full bg-transparent text-xs outline-none placeholder:text-[#B5B7C0]"
      />
    </label>
  );
}