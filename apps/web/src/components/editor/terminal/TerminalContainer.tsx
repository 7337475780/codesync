import React from 'react';
import dynamic from 'next/dynamic';
import { useTerminalTabsStore } from '@/store/terminal-tabs-store';

// Dynamic import with SSR disabled since xterm requires 'window'
const Terminal = dynamic(
  () => import('./Terminal').then((mod) => mod.Terminal),
  { ssr: false }
);

import { useParams } from 'next/navigation';
import { Plus } from 'lucide-react';

export function TerminalContainer() {
  const { tabs, activeTabId, addTab } = useTerminalTabsStore();
  const params = useParams();
  const projectId = params.projectId as string;
  
  if (tabs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-mono text-sm bg-[#141414] gap-3">
        <span>No open terminals.</span>
        <button 
          onClick={() => addTab()}
          className="flex items-center gap-2 px-4 py-2 bg-[#007acc] hover:bg-[#006bb3] text-white rounded-md transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Terminal
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full bg-[#141414] relative">
      {tabs.map((tab) => (
        <div 
          key={tab.id} 
          className="absolute inset-0"
          style={{ 
            opacity: tab.id === activeTabId ? 1 : 0, 
            pointerEvents: tab.id === activeTabId ? 'auto' : 'none',
            zIndex: tab.id === activeTabId ? 10 : 0
          }}
        >
          {/* We keep all terminal instances mounted so they don't lose state/history, but hide inactive ones */}
          <Terminal id={tab.id} projectId={projectId} />
        </div>
      ))}
    </div>
  );
}
