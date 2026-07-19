import React from 'react';
import { GitBranch, CheckCircle2, Bell, RefreshCw } from 'lucide-react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { ConnectionStatus } from '../collaboration/ConnectionStatus';
import { AITokenUsage } from '../ai/AITokenUsage';

export function StatusBar() {
  const { toggleBottomPanel, bottomPanelVisible, toggleAiPanel, aiPanelVisible } = useEditorLayoutStore();
  const { activeFileId, models } = useFileTabsStore();
  
  const activeFile = activeFileId ? models[activeFileId] : null;

  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-xs select-none shrink-0 overflow-hidden z-20">
      <div className="flex items-center gap-4 h-full">
        <button className="flex items-center gap-1.5 hover:bg-white/20 h-full px-2 transition-colors">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main*</span>
        </button>
        <button className="flex items-center gap-1.5 hover:bg-white/20 h-full px-2 transition-colors">
          <RefreshCw className="w-3 h-3" />
        </button>
        <div className="flex items-center gap-1.5 h-full px-2">
          <CheckCircle2 className="w-3 h-3" />
          <span>0 errors, 0 warnings</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 h-full">
        {activeFile && activeFile.id !== 'welcome' && (
          <>
            <button className="hover:bg-white/20 h-full px-2 transition-colors flex items-center">
              Ln {activeFile.cursorPosition.lineNumber}, Col {activeFile.cursorPosition.column}
            </button>
            <button className="hover:bg-white/20 h-full px-2 transition-colors flex items-center">
              Spaces: 2
            </button>
            <button className="hover:bg-white/20 h-full px-2 transition-colors flex items-center">
              UTF-8
            </button>
            <button className="hover:bg-white/20 h-full px-2 transition-colors flex items-center">
              CRLF
            </button>
            <button className="hover:bg-white/20 h-full px-2 transition-colors flex items-center capitalize">
              {activeFile.id.split('.').pop()}
            </button>
            <div className="w-px h-3 bg-white/20 mx-1" />
          </>
        )}
        <AITokenUsage />
        <ConnectionStatus />
        <button 
          onClick={toggleAiPanel}
          className={`hover:bg-white/20 h-full px-2 transition-colors flex items-center font-medium ${aiPanelVisible ? 'bg-white/20' : ''}`}
        >
          CodeSync AI
        </button>
        <button 
          onClick={toggleBottomPanel}
          className={`hover:bg-white/20 h-full px-2 transition-colors flex items-center ${bottomPanelVisible ? 'bg-white/20' : ''}`}
        >
          <Bell className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
