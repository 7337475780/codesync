import React, { useState, useEffect } from 'react';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { basename } from '@/lib/filesystem/utils';
import { X, Circle } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';
import { LanguageIcon } from './LanguageIcon';

export function EditorTabs() {
  const { openTabs, models, activeFileId, setActiveTab, closeTab, closeOtherTabs, closeAllTabs } = useFileTabsStore();
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, tabId: string } | null>(null);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex bg-[#1e1e1e] overflow-x-auto custom-scrollbar flex-shrink-0 select-none border-b border-[#2d2d2d] relative">
      {openTabs.map((tabId) => {
        const model = models[tabId];
        if (!model) return null;
        
        const isActive = tabId === activeFileId;
        
        return (
          <div
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ x: e.pageX, y: e.pageY, tabId });
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] border-r border-[#2d2d2d] cursor-pointer text-sm group",
              isActive ? "bg-[#141414] text-white border-t-2 border-t-[#8b5cf6]" : "bg-[#2d2d2d] text-gray-400 hover:bg-[#252526] border-t-2 border-t-transparent"
            )}
          >
            <LanguageIcon path={model.id} />
            <span className={cn("truncate flex-1", model.isDirty && "italic")} title={model.id}>
              {basename(model.id)}
            </span>
            <div className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tabId);
              }}
            >
              {model.isDirty ? (
                <Circle className="w-2 h-2 fill-current" />
              ) : (
                <X className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </div>
        );
      })}

      {contextMenu && (
        <div 
          className="fixed z-50 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md shadow-xl py-1 w-48 text-sm text-gray-300"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            className="w-full text-left px-3 py-1.5 hover:bg-[#007acc] hover:text-white transition-colors"
            onClick={() => closeTab(contextMenu.tabId)}
          >
            Close
          </button>
          <button 
            className="w-full text-left px-3 py-1.5 hover:bg-[#007acc] hover:text-white transition-colors"
            onClick={() => closeOtherTabs(contextMenu.tabId)}
          >
            Close Others
          </button>
          <button 
            className="w-full text-left px-3 py-1.5 hover:bg-[#007acc] hover:text-white transition-colors"
            onClick={() => closeAllTabs()}
          >
            Close All
          </button>
          <div className="h-px bg-[#3d3d3d] my-1" />
          <button 
            className="w-full text-left px-3 py-1.5 hover:bg-[#007acc] hover:text-white transition-colors"
            onClick={() => {
               navigator.clipboard.writeText(models[contextMenu.tabId]?.id || '');
            }}
          >
            Copy Path
          </button>
        </div>
      )}
    </div>
  );
}
