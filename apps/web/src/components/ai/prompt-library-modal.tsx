"use client";

import React, { useState } from 'react';
import { useAiStore } from '@/store/ai-store';
import { X, Search, History, Bookmark, Library, MessageSquare } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_HISTORY = [
  { id: 'h1', title: 'Refactor Auth Provider', date: '2 hours ago', preview: 'Can you help me convert this class component to functional...' },
  { id: 'h2', title: 'Debug Memory Leak', date: 'Yesterday', preview: 'I am seeing a steady increase in memory usage when...' },
  { id: 'h3', title: 'Generate API Docs', date: '3 days ago', preview: 'Write OpenAPI specs for the following Express routes...' },
];

const MOCK_LIBRARY = [
  { id: 'l1', title: 'Code Review Template', type: 'library', content: 'Please review the following code for security vulnerabilities, performance issues, and adherence to SOLID principles. Highlight any anti-patterns.' },
  { id: 'l2', title: 'Generate Unit Tests', type: 'library', content: 'Write comprehensive unit tests for this module using Jest and React Testing Library. Cover edge cases and mock all external dependencies.' },
  { id: 'l3', title: 'Explain Architecture', type: 'library', content: 'Break down the architecture of this project into simple terms. Explain the data flow, state management strategy, and component hierarchy.' },
  { id: 's1', title: 'My Custom API Prompt', type: 'saved', content: 'Generate a typed API client using Axios for the following swagger definition, ensuring all error responses are mapped to custom error classes.' },
];

export const PromptLibraryModal = () => {
  const { isLibraryModalOpen, setLibraryModalOpen, libraryTab } = useAiStore();
  const [search, setSearch] = useState('');

  if (!isLibraryModalOpen) return null;

  const tabs = [
    { id: 'history', label: 'History', icon: History },
    { id: 'saved', label: 'Saved Prompts', icon: Bookmark },
    { id: 'library', label: 'Library', icon: Library },
  ];

  const handleApplyPrompt = (content: string) => {
    // In a real implementation, this would either insert into the chat input
    // or trigger a dispatch. For this mock, we just close the modal.
    // The user can pretend it filled the input.
    setLibraryModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-3xl flex flex-col h-[70vh] overflow-hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h2 className="font-semibold flex items-center gap-2">
              <Library className="w-5 h-5 text-primary" />
              AI Resource Library
            </h2>
            <button onClick={() => setLibraryModalOpen(false)} className="p-1 hover:bg-muted rounded-md text-text-muted hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-48 border-r border-border bg-muted/10 p-2 flex flex-col gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => useAiStore.setState({ libraryTab: tab.id as any })}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full text-left ${
                    libraryTab === tab.id ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-muted hover:text-text-primary'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {libraryTab === 'history' && (
                  MOCK_HISTORY.filter(h => h.title.toLowerCase().includes(search.toLowerCase())).map(item => (
                    <div key={item.id} className="p-3 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer bg-surface">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-text-primary">{item.title}</h4>
                        <span className="text-xs text-text-muted">{item.date}</span>
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-1 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        {item.preview}
                      </p>
                    </div>
                  ))
                )}

                {(libraryTab === 'library' || libraryTab === 'saved') && (
                  MOCK_LIBRARY
                    .filter(item => item.type === libraryTab)
                    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                    .map(item => (
                      <div key={item.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all bg-surface group relative">
                        <h4 className="font-medium text-sm text-text-primary mb-2">{item.title}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.content}</p>
                        
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => handleApplyPrompt(item.content)}>
                            Use Prompt
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
