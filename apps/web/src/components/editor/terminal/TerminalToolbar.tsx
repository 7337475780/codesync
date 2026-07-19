import React from 'react';
import { Trash2, SplitSquareHorizontal, Settings, Search } from 'lucide-react';
import { useTerminalTabsStore } from '@/store/terminal-tabs-store';

export function TerminalToolbar() {
  const { activeTabId } = useTerminalTabsStore();
  
  return (
    <div className="flex items-center gap-1.5 h-[35px] px-2 bg-[#1e1e1e]">
      <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors" title="Search">
        <Search className="w-3.5 h-3.5" />
      </button>
      <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors" title="Clear Terminal">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors" title="Split Terminal">
        <SplitSquareHorizontal className="w-3.5 h-3.5" />
      </button>
      <div className="w-px h-4 bg-[#3d3d3d] mx-1" />
      <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors" title="Settings">
        <Settings className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
