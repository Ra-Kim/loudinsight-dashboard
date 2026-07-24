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
  const { q, sortBy, order, limit } = await searchParams;

  const params = await searchParams;
  const page = Number(params.page) || 1;

  const data = await getUsers({
    page,
    q: params.q,
    sortBy: params.sortBy,
    order: params.order === "desc" ? "desc" : "asc",
    limit: params.limit || 10,
  });

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-semibold text-gray-900">Hello Evano 👋🏻,</h1>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
        <p className="mt-2 text-sm text-gray-500">
          Params check — q: {q ?? "—"} | page: {page ?? "1"} | sortBy:{" "}
          {sortBy ?? "—"} | order: {order ?? "—"} | imit: {limit ?? "--"}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          {data.users.map((u) => (
            <li key={u.id}>
              {u.firstName} {u.lastName} — {u.address.country} — {u.role}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-gray-400">
          {data.total} total · page {page}
        </p>
      </div>
    </div>
  );
}
