import React from 'react';
import { VFSNode } from '@/store/filesystem-store';
import { useExplorerStore } from '@/store/explorer-store';
import { useFileTabsStore } from '@/store/file-tabs-store';
import { useFileSystemStore } from '@/store/filesystem-store';
import { LanguageIcon } from '../LanguageIcon';

interface ExplorerFileProps {
  node: VFSNode;
  level: number;
}

export function ExplorerFile({ node, level }: ExplorerFileProps) {
  const { selectedPath, setSelectedPath } = useExplorerStore();
  const { openModel, activeFileId } = useFileTabsStore();
  const { readFile } = useFileSystemStore();
  
  const isSelected = selectedPath === node.path || activeFileId === node.path;

  const handleDoubleClick = async () => {
    setSelectedPath(node.path);
    const content = await readFile(node.path);
    openModel(node.path, content);
  };

  const handleClick = () => {
    setSelectedPath(node.path);
  };

  return (
    <div 
      className={`flex items-center w-full py-1 px-2 cursor-pointer transition-colors select-none group ${isSelected ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-gray-300'}`}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-4 h-4 mr-1 shrink-0"></div> {/* Spacer for alignment */}
      <LanguageIcon path={node.path} />
      <span className="text-sm truncate ml-1.5">{node.name}</span>
    </div>
  );
}
