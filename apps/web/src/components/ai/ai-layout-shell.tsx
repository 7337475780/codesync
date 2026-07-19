"use client";

import React from 'react';
import { useAiStore, AiMode } from '@/store/ai-store';
import { ContextManagerModal } from './context-manager-modal';
import { PromptLibraryModal } from './prompt-library-modal';
import { AiUsageModal } from './ai-usage-modal';
import { MessageSquare, FileSearch, Code2, Bug, Workflow, FolderPlus, FileText, TestTube, Globe, History, Bookmark, Activity, Search, Library, Database } from 'lucide-react';

const modes: { id: AiMode; label: string; icon: React.ElementType }[] = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'project-analysis', label: 'Project Analysis', icon: FileSearch },
  { id: 'code-review', label: 'Code Review', icon: Code2 },
  { id: 'bug-finder', label: 'Bug Finder', icon: Bug },
  { id: 'architecture-planner', label: 'Architecture', icon: Workflow },
  { id: 'generate', label: 'Generate', icon: FolderPlus },
];

export const AiLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const { activeMode, setMode, setLibraryModalOpen, setContextModalOpen, setUsageModalOpen } = useAiStore();

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Modals */}
      <ContextManagerModal />
      <PromptLibraryModal />
      <AiUsageModal />

      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-surface flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center text-primary font-bold">
              AI
            </div>
            <h1 className="font-semibold text-lg">CodeSync AI</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin">
          <div>
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">Agent Modes</h2>
            <nav className="space-y-1">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setMode(mode.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    activeMode === mode.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-secondary hover:bg-muted/50 hover:text-text-primary'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">Library</h2>
            <nav className="space-y-1">
              <button onClick={() => setLibraryModalOpen(true, 'history')} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <History className="w-4 h-4" /> History
              </button>
              <button onClick={() => setLibraryModalOpen(true, 'saved')} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <Bookmark className="w-4 h-4" /> Saved Prompts
              </button>
              <button onClick={() => setLibraryModalOpen(true, 'library')} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <Library className="w-4 h-4" /> Prompt Library
              </button>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">Workspace</h2>
            <nav className="space-y-1">
              <button onClick={() => setContextModalOpen(true)} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <Database className="w-4 h-4" /> Context Manager
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <Search className="w-4 h-4" /> Global Search
              </button>
              <button onClick={() => setUsageModalOpen(true)} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-text-secondary hover:bg-muted/50 hover:text-text-primary">
                <Activity className="w-4 h-4" /> AI Usage
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};
