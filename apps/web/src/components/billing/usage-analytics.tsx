import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { HardDrive, Sparkles, Folder, Rocket, Globe } from 'lucide-react';

interface UsageMetricProps {
  icon: React.ElementType;
  title: string;
  used: number;
  total: number;
  unit?: string;
  colorClass: string;
}

function UsageMetric({ icon: Icon, title, used, total, unit = '', colorClass }: UsageMetricProps) {
  const percentage = Math.min(Math.round((used / total) * 100), 100);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-md bg-secondary text-secondary-foreground`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium text-sm">{title}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">{used}</span>
          <span className="text-muted-foreground"> / {total} {unit}</span>
        </div>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function UsageAnalytics() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Usage this month</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your billing cycle resets in 12 days. Upgrade your plan for higher limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <UsageMetric 
          icon={HardDrive}
          title="Storage"
          used={4.2}
          total={10}
          unit="GB"
          colorClass="bg-blue-500"
        />
        <UsageMetric 
          icon={Sparkles}
          title="AI Tokens (GPT-4 / Claude)"
          used={85400}
          total={100000}
          colorClass="bg-purple-500"
        />
        <UsageMetric 
          icon={Folder}
          title="Projects"
          used={12}
          total={20}
          colorClass="bg-emerald-500"
        />
        <UsageMetric 
          icon={Rocket}
          title="Deployments"
          used={45}
          total={100}
          colorClass="bg-orange-500"
        />
        <UsageMetric 
          icon={Globe}
          title="Custom Domains"
          used={2}
          total={5}
          colorClass="bg-indigo-500"
        />
      </div>
    </Card>
  );
}
