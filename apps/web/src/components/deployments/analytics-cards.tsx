import React from 'react';
import { Activity, Users, Globe2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const AnalyticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <span className="flex items-center text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3 mr-1" /> 12.5%
          </span>
        </div>
        <div className="text-sm text-text-secondary font-medium mb-1">Total Visitors</div>
        <div className="text-3xl font-bold text-text-primary">14.2k</div>
        <div className="text-xs text-text-muted mt-2">Last 30 days</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <Activity className="w-5 h-5" />
          </div>
          <span className="flex items-center text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
            <ArrowDownRight className="w-3 h-3 mr-1" /> 2.1%
          </span>
        </div>
        <div className="text-sm text-text-secondary font-medium mb-1">Avg. Response Time</div>
        <div className="text-3xl font-bold text-text-primary">124ms</div>
        <div className="text-xs text-text-muted mt-2">P99 Latency</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Globe2 className="w-5 h-5" />
          </div>
          <span className="flex items-center text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3 mr-1" /> 5.4%
          </span>
        </div>
        <div className="text-sm text-text-secondary font-medium mb-1">Bandwidth</div>
        <div className="text-3xl font-bold text-text-primary">1.2 TB</div>
        <div className="text-xs text-text-muted mt-2">Last 30 days</div>
      </div>
    </div>
  );
};
