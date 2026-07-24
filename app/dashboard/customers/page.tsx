import { StatsSection } from "@/components/dashboard/stats-section";
import { StatsSkeleton } from "@/components/dashboard/stats-skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { TableControls } from "@/components/users/table-controls";
import TableSkeleton from "@/components/users/table-skeleton";
import { UsersSection } from "@/components/users/users-section";
import { Suspense } from "react";

type DashboardSearchParams = Promise<{
  q?: string;
  page?: string;
  sortBy?: string;
  order?: string;
  limit?: string;
}>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 8;
  const order: "asc" | "desc" = params.order === "desc" ? "desc" : "asc";

  const query = {
    page,
    q: params.q,
    sortBy: params.sortBy,
    order,
    limit,
  };

  return (
    <div className="space-y-8 p-4 sm:p-8">
      <PageHeader />

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <div className="rounded-3xl bg-white px-4 py-6 shadow-sm sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-semibold">All Customers</h2>
            <p className="mt-1 text-sm text-[#16C098]">Active Members</p>
          </div>
          <TableControls />
        </div>

        <Suspense
          key={JSON.stringify(query)}
          fallback={
            <div className="mt-6">
              <TableSkeleton />
            </div>
          }
        >
          <UsersSection query={query} />
        </Suspense>
      </div>
    </div>
  );
}