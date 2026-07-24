import type { Status } from "@/lib/status";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex w-20 justify-center rounded-md border px-3 py-1 text-xs font-medium",
        status === "Active"
          ? "border-[#00B087] bg-[#16C09861] text-[#008767]"
          : "border-[#DF0404] bg-[#FFC5C5] text-[#DF0404]",
      )}
    >
      {status}
    </span>
  );
}
