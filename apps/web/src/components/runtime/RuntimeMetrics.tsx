import React from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { RuntimeMetrics as MetricsType } from '@/lib/runtime/types/runtime';
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { Cpu, MemoryStick, HardDrive, Activity } from 'lucide-react';

interface MetricCardProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  color: string;
  data: { v: number }[];
}

function MetricCard({ label, icon, value, unit, color, data }: MetricCardProps) {
  return (
    <div className="bg-[#2d2d2d] rounded-lg p-3 flex flex-col gap-2 border border-[#3e3e42]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-xs">{icon}{label}</div>
        <span className="text-white font-mono text-sm font-semibold">{value.toFixed(1)}<span className="text-gray-400 text-[10px] ml-0.5">{unit}</span></span>
      </div>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <YAxis domain={[0, 100]} hide />
            <Tooltip contentStyle={{ display: 'none' }} />
            <defs>
              <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${label})`} strokeWidth={1.5} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full bg-[#1e1e1e] rounded-full h-1">
        <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function RuntimeMetrics() {
  const { metrics } = useRuntimeStore();
  const latest = metrics[metrics.length - 1];

  const cpuData = metrics.map(m => ({ v: m.cpu }));
  const memData = metrics.map(m => ({ v: m.memory }));
  const netData = metrics.map(m => ({ v: Math.min((m.networkIn + m.networkOut) / 2, 100) }));
  const diskData = metrics.map(m => ({ v: m.disk }));

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      <MetricCard label="CPU" icon={<Cpu className="w-3.5 h-3.5" />} value={latest?.cpu ?? 0} unit="%" color="#3b82f6" data={cpuData} />
      <MetricCard label="Memory" icon={<MemoryStick className="w-3.5 h-3.5" />} value={latest?.memory ?? 0} unit="%" color="#8b5cf6" data={memData} />
      <MetricCard label="Disk" icon={<HardDrive className="w-3.5 h-3.5" />} value={latest?.disk ?? 0} unit="%" color="#f59e0b" data={diskData} />
      <MetricCard label="Network" icon={<Activity className="w-3.5 h-3.5" />} value={(latest?.networkIn ?? 0) + (latest?.networkOut ?? 0)} unit="kb/s" color="#10b981" data={netData} />
    </div>
  );
}
