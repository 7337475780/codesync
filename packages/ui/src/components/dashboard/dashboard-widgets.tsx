import { ProductivityWidget } from "./productivity-widget";
import { AIWidget } from "./ai-widget";
import { UsageChart } from "../charts/usage-chart";

export function DashboardWidgets() {
  const usageData = [
    { name: 'Mon', value: 2 },
    { name: 'Tue', value: 4 },
    { name: 'Wed', value: 3.5 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 4 },
    { name: 'Sat', value: 7 },
    { name: 'Sun', value: 8.2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ProductivityWidget />
      </div>
      <div className="space-y-6 flex flex-col">
        <AIWidget />
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 flex-1">
          <h3 className="text-white font-medium mb-1">Storage Usage</h3>
          <p className="text-[12px] text-gray-500 mb-4">8.2 GB / 10 GB limit</p>
          <UsageChart data={usageData} color="#8b5cf6" height={120} showAxes={false} />
        </div>
      </div>
    </div>
  );
}
