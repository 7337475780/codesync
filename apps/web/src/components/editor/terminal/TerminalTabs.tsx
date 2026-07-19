import React from 'react';
import { useTerminalTabsStore } from '@/store/terminal-tabs-store';
import { Plus, X, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';
import { TerminalToolbar } from './TerminalToolbar';

export function TerminalTabs() {
  const { tabs, activeTabId, setActiveTab, removeTab, addTab } = useTerminalTabsStore();

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] flex-shrink-0 select-none overflow-hidden">
      <div className="flex justify-end p-2 border-b border-[#2d2d2d]">
        <TerminalToolbar />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col pt-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 cursor-pointer text-[11px] uppercase tracking-wide font-medium group transition-colors",
              isActive ? "bg-[#2d2d2d] text-white border-l-2 border-l-[#8b5cf6]" : "bg-transparent text-gray-400 hover:bg-[#252526] border-l-2 border-l-transparent"
            )}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate flex-1">
              {tab.title}
            </span>
            <div className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
            >
              <X className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        );
      })}
      
      <button 
        onClick={() => addTab()}
        className="mx-3 mt-2 py-1.5 hover:bg-white/5 transition-colors flex items-center justify-center text-gray-400 hover:text-white rounded border border-dashed border-[#2d2d2d] hover:border-gray-500"
      >
        <Plus className="w-4 h-4" />
      </button>
      </div>
    </div>
  );
}
