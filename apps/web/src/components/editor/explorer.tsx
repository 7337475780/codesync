import React, { useEffect } from 'react';
import { useFileSystemStore } from '@/store/filesystem-store';
import { ExplorerTree } from './filesystem/ExplorerTree';
import { ExplorerToolbar } from './filesystem/ExplorerToolbar';

export function Explorer() {
  const { root, initialize } = useFileSystemStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="w-full h-full flex flex-col shrink-0 bg-[#252526] group">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 h-9">
        <span>Explorer</span>
        <ExplorerToolbar />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
        {root.children && <ExplorerTree nodes={root.children} />}
      </div>
    </div>
  );
}
