export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: {
    country: string;
  };
  role: "admin" | "moderator" | "user";
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// lib/types.ts
export interface UsersQuery {
  page: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  limit?: number;
}
