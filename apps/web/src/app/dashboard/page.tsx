import { WelcomeSection } from "@codesync/ui/components/dashboard/welcome-section";
import { QuickActions } from "@codesync/ui/components/dashboard/quick-actions";
import { DashboardWidgets } from "@codesync/ui/components/dashboard/dashboard-widgets";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4 sm:p-8 lg:p-12 w-full pb-24">
      <WelcomeSection />
      <QuickActions />
      <DashboardWidgets />
    </div>
  );
}
