import React from 'react';
import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { VFSNode } from '@/store/filesystem-store';
import { useExplorerStore } from '@/store/explorer-store';
import { ExplorerTree } from './ExplorerTree';

interface ExplorerFolderProps {
  node: VFSNode;
  level: number;
}

export function ExplorerFolder({ node, level }: ExplorerFolderProps) {
  const { expandedFolders, toggleFolder } = useExplorerStore();
  const isExpanded = expandedFolders.has(node.path);

  return (
    <div className="flex flex-col w-full">
      <div 
        className="flex items-center w-full py-1 px-2 cursor-pointer hover:bg-[#2a2d2e] text-gray-300 transition-colors select-none group"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => toggleFolder(node.path)}
      >
        <div className="w-4 h-4 flex items-center justify-center mr-1 text-gray-400 group-hover:text-gray-200">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
        <Folder className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
        <span className="text-sm truncate">{node.name}</span>
      </div>
      
      {isExpanded && node.children && (
        <ExplorerTree nodes={node.children} level={level + 1} />
      )}
    </div>
  );
}
