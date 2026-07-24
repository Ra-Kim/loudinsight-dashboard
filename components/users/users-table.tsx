import type { User } from "@/lib/types";
import { getUserStatus } from "@/lib/status";
import { StatusBadge } from "./status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium text-[#0D062D]">No customers found</p>
        <p className="mt-1 text-sm text-gray-400">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            {["Customer Name", "Gender", "Phone Number", "Email", "Country", "Status"].map((h) => (
              <TableHead key={h} className="h-12 text-sm font-medium text-[#B5B7C0] last:text-right">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className="border-b border-gray-100 hover:bg-gray-50/50">
              <TableCell className="py-5 text-sm font-medium text-[#292D32]">
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell className="text-sm text-[#292D32] capitalize">{u.gender}</TableCell>
              <TableCell className="text-sm text-[#292D32]">{u.phone}</TableCell>
              <TableCell className="text-sm text-[#292D32]">{u.email}</TableCell>
              <TableCell className="text-sm text-[#292D32]">{u.address.country}</TableCell>
              <TableCell className="text-right">
                <StatusBadge status={getUserStatus(u)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}