import { SearchInput } from "../users/search-input";

export function PageHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-medium text-[#0D062D]">Hello Evano 👋🏼,</h1>
      <SearchInput className="hidden rounded-xl bg-white shadow-sm sm:flex" />
    </div>
  );
}
