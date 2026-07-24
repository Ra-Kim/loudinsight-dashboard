import { getUsers } from "@/lib/api";
import type { UsersQuery } from "@/lib/types";
import { UsersTable } from "./users-table";
import { TablePagination } from "./table-pagination";

export async function UsersSection({ query }: { query: UsersQuery }) {
  const data = await getUsers(query);

  return (
    <>
      <div className="mt-6">
        <UsersTable users={data.users} />
      </div>
      <TablePagination
        page={query.page}
        limit={query.limit ?? 8}
        total={data.total}
      />
    </>
  );
}
