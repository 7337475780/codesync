import React from 'react';
import { Play, Bug, Terminal, SplitSquareHorizontal, Share2, Rocket } from 'lucide-react';
import { PresenceBar } from '../collaboration/PresenceBar';

export function EditorToolbar() {
  const items = [
    { id: 'run', icon: Play, label: 'Run Code' },
    { id: 'debug', icon: Bug, label: 'Debug' },
    { id: 'terminal', icon: Terminal, label: 'New Terminal' },
    { id: 'split', icon: SplitSquareHorizontal, label: 'Split Editor' },
    { id: 'share', icon: Share2, label: 'Share' },
    { id: 'deploy', icon: Rocket, label: 'Deploy' },
  ];

  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-[#1e1e1e] border-b border-[#2d2d2d] shrink-0">
      <PresenceBar />
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        {items.map(item => (
          <button
            key={item.id}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title={item.label}
          >
            <item.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
