"use client";

import React, { useState } from 'react';
import { useAiStore } from '@/store/ai-store';
import { X, Search, FileCode, FolderClosed, ChevronRight, Check } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FILES = [
  { id: 'f1', name: 'src/app/page.tsx', type: 'file', language: 'typescript' },
  { id: 'f2', name: 'src/components/ui/button.tsx', type: 'file', language: 'typescript' },
  { id: 'f3', name: 'src/store/git-data-store.ts', type: 'file', language: 'typescript' },
  { id: 'f4', name: 'src/store/ai-store.ts', type: 'file', language: 'typescript' },
  { id: 'f5', name: 'package.json', type: 'file', language: 'json' },
  { id: 'f6', name: 'tailwind.config.ts', type: 'file', language: 'typescript' },
  { id: 'f7', name: 'README.md', type: 'file', language: 'markdown' },
];

export const ContextManagerModal = () => {
  const { isContextModalOpen, setContextModalOpen } = useAiStore();
  const [contextFiles, setContextFiles] = React.useState<Array<{id: string; filename: string; language: string; content: string}>>([]);
  const addContextFile = (f: {id: string; filename: string; language: string; content: string}) => setContextFiles(prev => [...prev, f]);
  const removeContextFile = (id: string) => setContextFiles(prev => prev.filter(f => f.id !== id));
  const [search, setSearch] = useState('');

  if (!isContextModalOpen) return null;

  const filteredFiles = MOCK_FILES.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const toggleFile = (file: typeof MOCK_FILES[0]) => {
    const isSelected = contextFiles.some(f => f.id === file.id);
    if (isSelected) {
      removeContextFile(file.id);
    } else {
      addContextFile({
        id: file.id,
        filename: file.name,
        language: file.language,
        content: `// Mock content for ${file.name}`
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[80vh] overflow-hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h2 className="font-semibold">Context Manager</h2>
            <button onClick={() => setContextModalOpen(false)} className="p-1 hover:bg-muted rounded-md text-text-muted hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search files to add as context..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {filteredFiles.map((file: typeof MOCK_FILES[0]) => {
              const isSelected = contextFiles.some((f: {id: string}) => f.id === file.id);
              return (
                <div 
                  key={file.id} 
                  onClick={() => toggleFile(file)}
                  className={`flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <FileCode className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-text-muted'}`} />
                    <span className={isSelected ? 'font-medium' : ''}>{file.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </div>
              );
            })}
            
            {filteredFiles.length === 0 && (
              <div className="p-8 text-center text-text-muted text-sm">
                No files found matching "{search}"
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border flex justify-between items-center bg-muted/30">
            <span className="text-sm text-text-secondary">
              {contextFiles.length} file{contextFiles.length !== 1 && 's'} selected
            </span>
            <Button onClick={() => setContextModalOpen(false)}>Done</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
