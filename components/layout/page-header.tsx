import { SearchNormal1 } from "iconsax-reactjs";

export function PageHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-medium text-[#0D062D]">Hello Evano 👋🏼,</h1>
      <label className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm sm:flex h-10">
        <SearchNormal1 size={24} color="#7E7E7E" />
        <input
          placeholder="Search"
          className="w-54 bg-transparent text-sm outline-none placeholder:text-[#B5B7C0]"
        />
      </label>
    </div>
  );
}
