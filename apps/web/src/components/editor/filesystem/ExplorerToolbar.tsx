import React, { useState } from 'react';
import { FilePlus, FolderPlus, RefreshCw, ListCollapse } from 'lucide-react';
import { useFileSystemStore } from '@/store/filesystem-store';
import { PromptDialog } from './PromptDialog';

export function ExplorerToolbar() {
  const { refresh, createFile, createFolder } = useFileSystemStore();
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

  const handlePromptSubmit = (name: string) => {
    if (promptState.type === 'file') {
      createFile(`/src/${name}`);
    } else {
      createFolder(`/src/${name}`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleNewFile} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="New File">
          <FilePlus className="w-3.5 h-3.5" />
        </button>
        <button onClick={handleNewFolder} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="New Folder">
          <FolderPlus className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => refresh()} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Refresh Explorer">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Collapse Folders in Explorer">
          <ListCollapse className="w-3.5 h-3.5" />
        </button>
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
