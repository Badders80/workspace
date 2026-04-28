"use client";

import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

interface PageLayoutProps {
  title: ReactNode;
  description?: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
  stickyHeader?: boolean;
  mainClassName?: string;
  contentClassName?: string;
}

export function PageLayout({
  title,
  description,
  headerActions,
  children,
  stickyHeader = false,
  mainClassName,
  contentClassName,
}: PageLayoutProps) {
  return (
    <main
      className={cn("flex-1 overflow-y-auto bg-slate-50", mainClassName)}
    >
      <div
        className={cn(
          "border-b border-slate-200 bg-white",
          stickyHeader && "sticky top-0 z-30",
        )}
      >
        <div className="px-4 py-4 md:px-8 md:py-6">
          {headerActions ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
                  {title}
                </h1>
                {description && (
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                )}
              </div>
              {headerActions}
            </div>
          ) : (
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={cn("p-4 md:p-8", contentClassName)}>
        {children}
      </div>
    </main>
  );
}
