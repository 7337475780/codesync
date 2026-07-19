import { AppShell } from "@codesync/ui/components/dashboard/app-shell";

export const metadata = {
  title: "Dashboard - CodeSync",
  description: "CodeSync Workspace Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
