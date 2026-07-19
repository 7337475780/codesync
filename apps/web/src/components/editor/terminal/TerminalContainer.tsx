import React from 'react';
import dynamic from 'next/dynamic';
import { useTerminalTabsStore } from '@/store/terminal-tabs-store';

// Dynamic import with SSR disabled since xterm requires 'window'
const Terminal = dynamic(
  () => import('./Terminal').then((mod) => mod.Terminal),
  { ssr: false }
);

export function TerminalContainer() {
  const { tabs, activeTabId } = useTerminalTabsStore();
  
  if (tabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 font-mono text-sm bg-[#141414]">
        No open terminals. Click + to create one.
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
          <Terminal id={tab.id} />
        </div>
      ))}
    </div>
  );
}
