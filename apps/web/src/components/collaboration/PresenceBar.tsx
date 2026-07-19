import React from 'react';
import { usePresenceStore } from '@/store/presence-store';
import { PresenceAvatar } from './PresenceAvatar';
import { Users, Share2 } from 'lucide-react';

export function PresenceBar() {
  const { collaborators, activeUsers } = usePresenceStore();

  if (collaborators.length === 0) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-1">
      <div className="flex items-center -space-x-2">
        {collaborators.slice(0, 5).map((collaborator, index) => (
          <div key={collaborator.id} className="relative z-0" style={{ zIndex: 10 - index }}>
            <PresenceAvatar 
              collaborator={collaborator} 
              isCurrentUser={index === 0} 
            />
          </div>
        ))}
        {collaborators.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-[#333333] border border-[#2d2d2d] flex items-center justify-center text-xs text-white font-medium relative z-0 ml-[-8px]">
            +{collaborators.length - 5}
          </div>
        )}
      </div>

      <div className="h-4 w-px bg-[#333333] mx-1" />

      <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5">
        <Users className="w-3.5 h-3.5" />
        <span className="font-medium">{activeUsers} Online</span>
      </button>

      <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white transition-colors px-3 py-1 rounded font-medium shadow-sm ml-2">
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>
    </div>
  );
}
