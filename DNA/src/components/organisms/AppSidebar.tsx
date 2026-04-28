"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "../../lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  group?: string;
}

interface AppSidebarProps {
  items: NavItem[];
  activePath?: string;
}

export function AppSidebar({ items, activePath }: AppSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by their group field
  const groupedItems = items.reduce<Record<string, NavItem[]>>((acc, item) => {
    const group = item.group ?? "General";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const isActive = (href: string) =>
    activePath ? href === activePath || activePath.startsWith(`${href}/`) : false;

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Mobile toggle */}
      <button
        type="button"
        className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] -translate-x-full flex-col border-r border-slate-200 bg-white pt-16 shadow-lg transition-transform duration-200 ease-in-out md:relative md:inset-auto md:z-auto md:w-[260px] md:translate-x-0 md:pt-0 md:shadow-none md:transition-none",
          sidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex-1 px-3 py-4">
          <nav className="mt-3 space-y-4 text-sm">
            {Object.entries(groupedItems).map(([group, groupItems]) => (
              <div key={group}>
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {group}
                </p>
                <div className="mt-1 space-y-1">
                  {groupItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-700 transition",
                          active
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : "hover:bg-slate-100",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
