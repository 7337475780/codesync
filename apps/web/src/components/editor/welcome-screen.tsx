import React, { useState } from 'react';
import { FileCode2, FolderOpen, Search, GitBranch } from 'lucide-react';
import { useFileSystemStore } from '@/store/filesystem-store';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { PromptDialog } from './filesystem/PromptDialog';

export function WelcomeScreen() {
  const { createFile, createFolder, readFile } = useFileSystemStore();
  const { openModel } = useFileTabsStore();
  
  const [promptState, setPromptState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'file' | 'folder';
  }>({ isOpen: false, title: '', type: 'file' });

  const handleNewFile = () => {
    setPromptState({ isOpen: true, title: 'Enter file name:', type: 'file' });
  };

  const handleNewFolder = () => {
    setPromptState({ isOpen: true, title: 'Enter folder name:', type: 'folder' });
  };

  const handlePromptSubmit = async (name: string) => {
    const path = `/src/${name}`;
    if (promptState.type === 'file') {
      await createFile(path);
      const content = await readFile(path);
      openModel(path, content);
    } else {
      await createFolder(path);
    }
  };

  const openRecent = async (file: string) => {
    try {
      const path = file.startsWith('/') ? file : `/${file}`;
      const content = await readFile(path);
      openModel(path, content);
    } catch (e) {
      console.error('Failed to open recent file', e);
      // Just create it dynamically if it doesn't exist for the mock
      const path = file.startsWith('/') ? file : `/${file}`;
      await createFile(path);
      const content = await readFile(path);
      openModel(path, content);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center bg-[#1e1e1e] text-gray-400 p-8 select-none h-full">
        <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
          <FileCode2 className="w-12 h-12 text-[#8b5cf6]" />
        </div>
        
        <h1 className="text-3xl font-light text-white mb-2 tracking-tight">CodeSync IDE</h1>
        <p className="text-gray-500 mb-12">The modern enterprise development environment</p>
        
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Start</h2>
            <button onClick={handleNewFile} className="flex items-center gap-3 px-4 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-left group">
              <FileCode2 className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div>
                <div className="text-sm font-medium text-gray-200">New File</div>
                <div className="text-xs text-gray-500">Create a new empty file</div>
              </div>
            </button>
            <button onClick={handleNewFolder} className="flex items-center gap-3 px-4 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-left group">
              <FolderOpen className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
              <div>
                <div className="text-sm font-medium text-gray-200">Open Folder</div>
                <div className="text-xs text-gray-500">Open a local directory</div>
              </div>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-left group">
              <GitBranch className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
              <div>
                <div className="text-sm font-medium text-gray-200">Clone Repository</div>
                <div className="text-xs text-gray-500">Clone from GitHub</div>
              </div>
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Recent</h2>
            <div className="flex flex-col gap-1">
              {['src/app/page.tsx', 'src/components/button.tsx', 'package.json', 'README.md'].map(file => (
                <button key={file} onClick={() => openRecent(file)} className="text-left px-3 py-2 text-sm text-gray-400 hover:text-blue-400 hover:bg-[#2d2d2d] rounded transition-colors truncate">
                  {file}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PromptDialog 
        isOpen={promptState.isOpen}
        title={promptState.title}
        onClose={() => setPromptState(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handlePromptSubmit}
      />
    </>
  );
}
