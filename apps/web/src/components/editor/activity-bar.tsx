import React from 'react';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { Files, Search, GitBranch, Blocks, Bot, Settings, User, Users, Play, Bug } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';

export function ActivityBar() {
  const { activeSidebarPanel, setActiveSidebarPanel, sidebarVisible, setSidebarVisible } = useEditorLayoutStore();

  const handlePanelClick = (panel: 'EXPLORER' | 'SEARCH' | 'GIT' | 'EXTENSIONS' | 'AI' | 'SETTINGS') => {
    if (activeSidebarPanel === panel && sidebarVisible) {
      setSidebarVisible(false);
    } else {
      setActiveSidebarPanel(panel);
    }
  };

  const TopIcons = [
    { id: 'EXPLORER', icon: Files, label: 'Explorer (Ctrl+Shift+E)' },
    { id: 'SEARCH', icon: Search, label: 'Search (Ctrl+Shift+F)' },
    { id: 'GIT', icon: GitBranch, label: 'Source Control (Ctrl+Shift+G)' },
    { id: 'EXTENSIONS', icon: Blocks, label: 'Extensions (Ctrl+Shift+X)' },
    { id: 'AI', icon: Bot, label: 'AI Assistant (Ctrl+L)' },
    { id: 'COLLABORATION', icon: Users, label: 'Live Collaboration' },
    { id: 'RUNTIME', icon: Play, label: 'Runtime & Processes' },
    { id: 'DEBUGGER', icon: Bug, label: 'Debugger (Ctrl+Shift+D)' },
  ] as const;

  const BottomIcons = [
    { id: 'ACCOUNT', icon: User, label: 'Account' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings (Ctrl+,)' },
  ] as const;

  return (
    <div className="w-12 h-full bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col justify-between shrink-0 select-none">
      <div className="flex flex-col items-center py-2 gap-2">
        {TopIcons.map((item) => {
          const isActive = activeSidebarPanel === item.id && sidebarVisible;
          return (
            <button
              key={item.id}
              onClick={() => handlePanelClick(item.id as any)}
              className={cn(
                "relative w-full h-12 flex items-center justify-center transition-colors text-gray-400 hover:text-white group",
                isActive && "text-white"
              )}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8b5cf6]" />
              )}
              <item.icon className="w-6 h-6 stroke-[1.5]" />
            </button>
          );
        })}
      </div>
      
      <div className="flex flex-col items-center py-2 gap-2">
        {BottomIcons.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'SETTINGS') handlePanelClick('SETTINGS');
            }}
            className="relative w-full h-12 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            title={item.label}
          >
            <item.icon className="w-6 h-6 stroke-[1.5]" />
          </button>
        ))}
      </div>
    </div>
  );
}
