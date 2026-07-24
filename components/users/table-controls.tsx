"use client";

import { useState } from "react";
import { Filter } from "iconsax-reactjs";
import { SearchInput } from "./search-input";
import { SortSelect } from "./sort-select";

export function TableControls() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <div className="flex items-center gap-3">
        <SearchInput className="flex-1 sm:flex-none" />
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="rounded-lg bg-[#F9FBFF] p-2 text-[#7E7E7E] sm:hidden"
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <Filter size={18} color="currentColor" />
        </button>
        <div className="hidden sm:block">
          <SortSelect />
        </div>
      </div>
      {showFilters ? (
        <div className="sm:hidden">
          <SortSelect />
        </div>
      ) : null}
    </div>
  );
}