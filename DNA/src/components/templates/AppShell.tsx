"use client";

import type { ReactNode, ComponentType } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "../../lib/utils";
import { AppSidebar } from "../organisms/AppSidebar";
import { BrandMark } from "../atoms/BrandMark";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  group?: string;
}

interface AppShellProps {
  children: ReactNode;
  brandMark?: ReactNode;
  headerActions?: ReactNode;
  sidebarItems: NavItem[];
  activePath?: string;
}

export function AppShell({
  children,
  brandMark,
  headerActions,
  sidebarItems,
  activePath,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            {brandMark ?? <BrandMark />}
          </div>
          {headerActions && (
            <div className="flex items-center gap-3">
              {headerActions}
            </div>
          )}
        </div>
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        <AppSidebar items={sidebarItems} activePath={activePath} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
