import React from 'react';
import { VFSNode } from '@/store/filesystem-store';
import { ExplorerFolder } from './ExplorerFolder';
import { ExplorerFile } from './ExplorerFile';

interface ExplorerTreeProps {
  nodes: VFSNode[];
  level?: number;
}

export function ExplorerTree({ nodes, level = 0 }: ExplorerTreeProps) {
  return (
    <div className="flex flex-col w-full">
      {nodes.map(node => (
        <div key={node.path}>
          {node.type === 'folder' ? (
            <ExplorerFolder node={node} level={level} />
          ) : (
            <ExplorerFile node={node} level={level} />
          )}
        </div>
      ))}
    </div>
  );
}
