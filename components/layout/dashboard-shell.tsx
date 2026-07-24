"use client";

import { useState } from "react";
import { HamburgerMenu } from "iconsax-reactjs";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        hovered={hovered}
        onHoverChange={setHovered}
      />

      {/* mobile top bar */}
      <header className="flex h-14 items-center gap-3 bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-gray-500"
          aria-label="Open menu"
        >
          <HamburgerMenu size={22} />
        </button>
        <span className="font-semibold text-[#0D062D]">Dashboard</span>
      </header>

      <main
        className={cn(
          "transition-[padding] duration-200",
          hovered ? "lg:pl-64" : "lg:pl-20",
        )}
      >
        {children}
      </main>
    </div>
  );
}
