"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight2, Setting, CloseSquare } from "iconsax-reactjs";
import { DASHBOARD_NAV, type NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";
import { UpgradeCard } from "./upgrade-card";
import Image from "next/image";

const user = { name: "Evano", role: "Project Manager" };

export function Sidebar({
  open,
  onClose,
  hovered,
  onHoverChange,
}: {
  open: boolean;
  onClose: () => void;
  hovered: boolean;
  onHoverChange: (h: boolean) => void;
}) {
  const collapsed = !hovered;
  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white transition-[transform,width] duration-200 md:translate-x-0 overflow-hidden",
          open ? "translate-x-0" : "-translate-x-full",
          "w-64",
          collapsed && "md:w-20",
        )}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        {/* header */}
        <div
          className={cn(
            "flex h-16 items-center px-6 pt-6",
            collapsed ? "md:justify-center md:px-0" : "justify-between",
          )}
        >
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <Setting size={32} color="#0D062D" variant="Outline" />
            {!collapsed ? (
              <span className="text-[26px] font-semibold text-[#0D062D]">
                Dashboard
                <span className="ml-2 align-baseline text-[10px] font-normal text-[#838383]">
                  v.01
                </span>
              </span>
            ) : null}
          </Link>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 md:hidden"
            aria-label="Close menu"
          >
            <CloseSquare size={22} />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-8">
          {DASHBOARD_NAV.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              collapsed={collapsed}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* footer */}
        <div className="space-y-6 px-4 pb-8">
          {!collapsed ? <UpgradeCard /> : null}
          <div
            className={cn(
              "flex items-center gap-3 px-2",
              collapsed && "md:justify-center",
            )}
          >
            <Image
              src={"/profile.svg"}
              alt="profile"
              height={42}
              width={42}
              loading="eager"
            />
            {!collapsed ? (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#0D062D]">
                  {user.name}
                </p>
                <p className="truncate text-xs text-gray-400">{user.role}</p>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active =
    item.href !== "#" &&
    (pathname === item.href || pathname.startsWith(`${item.href}/`));
  const IconComp = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
        collapsed && "md:justify-center md:px-0",
        active ? "bg-[#5932EA] text-white" : "text-[#9197B3] hover:bg-gray-50",
      )}
    >
      <IconComp size={24} variant={"Linear"} color="currentColor" />
      {!collapsed ? (
        <>
          <span className="flex-1">{item.label}</span>
          {item.hasSubmenu ? (
            <ArrowRight2 size={16} color="currentColor" />
          ) : null}
        </>
      ) : null}
    </Link>
  );
}
