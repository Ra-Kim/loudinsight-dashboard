import { StatsCards } from "@/components/dashboard/stat-cards";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/users/search-input";
import { SortSelect } from "@/components/users/sort-select";
import { TablePagination } from "@/components/users/table-pagination";
import { UsersTable } from "@/components/users/users-table";
import { getUsers } from "@/lib/api";

type DashboardSearchParams = Promise<{
  q?: string;
  page?: string;
  sortBy?: string;
  order?: string;
  limit?: number;
}>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 8;

  const data = await getUsers({
    page,
    q: params.q,
    sortBy: params.sortBy,
    order: params.order === "desc" ? "desc" : "asc",
    limit,
  });

  return (
    <div className="space-y-8 p-8">
      <PageHeader />
      <StatsCards
        total={data.total}
        avatars={data.users.slice(0, 5).map((u) => u.image)}
      />
      <div className="rounded-3xl bg-white px-8 py-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-semibold">
              All Customers
            </h2>
            <p className="mt-1 text-sm text-[#16C098]">Active Members</p>
          </div>
          <div className="flex gap-3">
            <SearchInput />
            <SortSelect />
          </div>
        </div>

        <div className="mt-6">
          <UsersTable users={data.users} />
        </div>

        <TablePagination page={page} limit={limit} total={data.total} />
      </div>
    </div>
  );
}
