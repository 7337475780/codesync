import React from 'react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { Explorer } from './explorer';
import { SourceControlPanel } from './git/SourceControlPanel';
import { LiveActivityFeed } from '../collaboration/LiveActivityFeed';
import { RuntimeDashboard } from '../runtime/RuntimeDashboard';
import { DebuggerPanel } from '../runtime/Debugger/DebuggerPanel';

export function Sidebar() {
  const { activeSidebarPanel, sidebarVisible } = useEditorLayoutStore();

  if (!sidebarVisible) return null;

  return (
    <div className="w-full h-full bg-[#252526] border-r border-[#2d2d2d] flex flex-col overflow-hidden">
      {activeSidebarPanel === 'EXPLORER' && <Explorer />}
      {activeSidebarPanel === 'SEARCH' && (
        <div className="p-4 text-gray-400 text-sm">Search panel coming soon...</div>
      )}
      {activeSidebarPanel === 'GIT' && <SourceControlPanel />}
      {activeSidebarPanel === 'EXTENSIONS' && (
        <div className="p-4 text-gray-400 text-sm">Extensions coming soon...</div>
      )}
      {activeSidebarPanel === 'AI' && (
        <div className="p-4 text-gray-400 text-sm">AI panel coming soon...</div>
      )}
      {activeSidebarPanel === 'SETTINGS' && (
        <div className="p-4 text-gray-400 text-sm">Settings coming soon...</div>
      )}
      {activeSidebarPanel === 'COLLABORATION' && (
        <div className="flex flex-col h-full">
          <div className="px-4 py-2 border-b border-[#2d2d2d] flex-shrink-0">
            <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Live Collaboration</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <LiveActivityFeed />
          </div>
        </div>
      )}
      {activeSidebarPanel === 'RUNTIME' && <RuntimeDashboard />}
      {activeSidebarPanel === 'DEBUGGER' && <DebuggerPanel />}
    </div>
  );
}
