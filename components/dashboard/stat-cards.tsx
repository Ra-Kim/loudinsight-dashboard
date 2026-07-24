import { Profile2User, Monitor, ProfileTick } from "iconsax-reactjs";
import { ArrowUp, ArrowDown } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export function StatsCards({
  total,
  avatars,
}: {
  total: number;
  avatars: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8 xl:grid-cols-3">
      <Stat
        icon={<Profile2User size={40} color="#00AC4F" variant="Outline" />}
        label="Total Customers"
        value={total.toLocaleString()}
        trend={<Trend up value="16%" />}
      />
      <Stat
        icon={<ProfileTick size={40} color="#00AC4F" variant="Outline" />}
        label="Members"
        value="1,893"
        trend={<Trend value="1%" />}
        divider
      />
      <Stat
        icon={<Monitor size={40} color="#00AC4F" variant="Outline" />}
        label="Active Now"
        value="189"
        className="sm:col-span-2 xl:col-span-1"
        divider
        trend={
          <div className="mt-1 flex -space-x-2">
            {avatars.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border border-white bg-gray-100"
              />
            ))}
          </div>
        }
      />
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  trend,
  divider,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: React.ReactNode;
  divider?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        divider && "xl:border-l xl:border-gray-100 xl:pl-8",
        className,
      )}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-b from-[#D3FFE7] to-[#EFFFF6]">
        {icon}
      </span>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-semibold text-[#0D062D]">{value}</p>
        {trend}
      </div>
    </div>
  );
}

function Trend({ up, value }: { up?: boolean; value: string }) {
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
      {up ? (
        <ArrowUp size={14} color="#00AC4F" />
      ) : (
        <ArrowDown size={14} color="#D0004B" />
      )}
      <span
        className={
          up ? "font-semibold text-[#00AC4F]" : "font-semibold text-[#D0004B]"
        }
      >
        {value}
      </span>
      this month
    </p>
  );
}