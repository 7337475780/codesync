import React, { useEffect } from 'react';
import { useGitStore } from '@/store/git-store';
import { RefreshCw, MoreHorizontal, Check, GitBranch } from 'lucide-react';
import { CommitBox } from './CommitBox';
import { ChangesList } from './ChangesList';

export function SourceControlPanel() {
  const { changes, branches, initialize, refresh, isRefreshing } = useGitStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const stagedChanges = changes.filter(c => c.staged);
  const unstagedChanges = changes.filter(c => !c.staged);
  
  const currentBranch = branches.find(b => b.isCurrent)?.name || 'main';

  return (
    <div className="w-full h-full flex flex-col shrink-0 bg-[#252526] select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 h-9">
        <span>Source Control</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => refresh()} 
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Views and More Actions">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Branch Info */}
      <div className="px-4 py-2 flex items-center gap-2 text-sm text-gray-300 border-b border-[#2d2d2d] cursor-pointer hover:bg-[#2a2d2e] transition-colors">
        <GitBranch className="w-4 h-4 text-gray-500" />
        <span className="font-medium truncate">{currentBranch}</span>
      </div>

      {/* Commit Box */}
      <CommitBox />

      {/* Changes List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 pb-4">
        <ChangesList title="Staged Changes" files={stagedChanges} staged={true} />
        <ChangesList title="Changes" files={unstagedChanges} staged={false} />
        
        {changes.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <Check className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">There are no active changes to commit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
