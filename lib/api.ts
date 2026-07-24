import type { UsersQuery, UsersResponse } from "./types";

const BASE_URL = "https://dummyjson.com";
export const DEFAULT_PAGE_SIZE = 8;

export async function getUsers({
  page,
  q,
  sortBy,
  order,
  limit = DEFAULT_PAGE_SIZE,
}: UsersQuery): Promise<UsersResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String((page - 1) * limit),
    select: "firstName,lastName,gender,phone,email,address,role,image",
  });

  if (q) params.set("q", q);
  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order ?? "asc");
  }

  const endpoint = q ? "/users/search" : "/users";

  const res = await fetch(`${BASE_URL}${endpoint}?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users (${res.status})`);
  }

  return res.json();
}
