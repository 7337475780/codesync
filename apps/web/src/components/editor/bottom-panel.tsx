import React from 'react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { useTerminalStore } from '@/store/terminal-store';
import { X, Maximize2, Trash2 } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';
import { TerminalContainer } from './terminal/TerminalContainer';
import { TerminalTabs } from './terminal/TerminalTabs';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';

export function BottomPanel() {
  const { bottomPanelVisible, setBottomPanelVisible } = useEditorLayoutStore();
  const { activePanelTab, setActivePanelTab, logs, clearLogs } = useTerminalStore();

  if (!bottomPanelVisible) return null;

  const tabs: { id: 'PROBLEMS' | 'OUTPUT' | 'DEBUG_CONSOLE' | 'TERMINAL', label: string, count?: number }[] = [
    { id: 'PROBLEMS', label: 'Problems', count: 0 },
    { id: 'OUTPUT', label: 'Output' },
    { id: 'DEBUG_CONSOLE', label: 'Debug Console' },
    { id: 'TERMINAL', label: 'Terminal' },
  ];

  return (
    <div className="w-full h-full bg-[#1e1e1e] flex flex-col border-t border-[#2d2d2d]">
      <div className="flex items-center justify-between px-4 py-1 flex-shrink-0">
        <div className="flex items-center gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePanelTab(tab.id as any)}
              className={cn(
                "text-[11px] font-medium tracking-wide uppercase py-1 border-b-2 transition-colors",
                activePanelTab === tab.id 
                  ? "text-white border-white" 
                  : "text-gray-400 border-transparent hover:text-gray-200"
              )}
            >
              {tab.label} {tab.count !== undefined && <span className="ml-1 bg-white/10 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearLogs} className="p-1 text-gray-400 hover:text-white rounded" title="Clear">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white rounded" title="Maximize">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setBottomPanelVisible(false)} className="p-1 text-gray-400 hover:text-white rounded" title="Close Panel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden bg-[#141414]">
        {activePanelTab === 'TERMINAL' && (
          <div className="w-full h-full relative overflow-hidden flex">
            <PanelGroup orientation="horizontal" id="bottom-terminal-layout">
              <Panel id="terminal-content">
                <TerminalContainer />
              </Panel>
              <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-[#007acc] transition-colors cursor-col-resize active:bg-[#007acc] flex-shrink-0" />
              <Panel id="terminal-tabs" defaultSize={20} minSize={10}>
                <TerminalTabs />
              </Panel>
            </PanelGroup>
          </div>
        )}
        {activePanelTab !== 'TERMINAL' && (
          <div className="text-gray-500 italic flex items-center justify-center h-full">
            Nothing to show in {tabs.find(t => t.id === activePanelTab)?.label}
          </div>
        )}
      </div>
    </div>
  );
}
