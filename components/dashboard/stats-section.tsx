import { getUsers } from "@/lib/api";
import { StatsCards } from "./stat-cards";

export async function StatsSection() {
  // Independent fetch: global total + first users for the avatar cluster.
  // Deduped/cached by Next for 60s, so this doesn't double-hit the API
  // when it overlaps the table's page-1 fetch.
  const data = await getUsers({ page: 1, limit: 5 });

  return (
    <StatsCards total={data.total} avatars={data.users.map((u) => u.image)} />
  );
}
