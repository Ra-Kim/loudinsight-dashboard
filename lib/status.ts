import type { User } from "./types";

export type Status = "Active" | "Inactive";

// DummyJSON has no status field; derive deterministically so it's
// stable across server renders (no hydration mismatch, no flicker).
export function getUserStatus(user: User): Status {
  return user.id % 3 === 0 ? "Inactive" : "Active";
}