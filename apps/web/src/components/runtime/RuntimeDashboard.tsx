import React, { useState } from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { RuntimeToolbar } from './RuntimeToolbar';
import { RuntimeStatus } from './RuntimeStatus';
import { RuntimeMetrics } from './RuntimeMetrics';
import { ProcessManager } from './ProcessManager';
import { PortForwardingPanel } from './PortForwardingPanel';
import { TaskRunner } from './Tasks/TaskRunner';
import { Server, Cpu, Network, ListTodo } from 'lucide-react';

type Tab = 'processes' | 'metrics' | 'ports' | 'tasks';

export function RuntimeDashboard() {
  const { info } = useRuntimeStore();
  const [tab, setTab] = useState<Tab>('processes');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'processes', label: 'Processes', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'metrics', label: 'Metrics', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'ports', label: 'Ports', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'tasks', label: 'Tasks', icon: <ListTodo className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <RuntimeToolbar />

      {/* Runtime info bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#1e1e1e] border-b border-[#2d2d2d] shrink-0 flex-wrap gap-y-1">
        <RuntimeStatus />
        {info && (
          <>
            <span className="text-[11px] text-gray-400">{info.framework}</span>
            <span className="text-[11px] text-gray-600">|</span>
            <span className="text-[11px] text-gray-400">{info.nodeVersion}</span>
            <span className="text-[11px] text-gray-600">|</span>
            <span className="text-[11px] text-gray-400">{info.packageManager}</span>
            <span className={`ml-auto text-[10px] font-semibold uppercase tracking-wider ${info.health === 'healthy' ? 'text-green-500' : 'text-yellow-400'}`}>
              ● {info.health}
            </span>
          </>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex items-center border-b border-[#2d2d2d] bg-[#252526] shrink-0 px-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium transition-colors border-b-2 ${tab === t.id ? 'text-white border-blue-500' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {tab === 'processes' && <ProcessManager />}
        {tab === 'metrics' && <RuntimeMetrics />}
        {tab === 'ports' && <PortForwardingPanel />}
        {tab === 'tasks' && <TaskRunner />}
      </div>
    </div>
  );
}
