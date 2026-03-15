import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile } = await requireUser();

  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}
