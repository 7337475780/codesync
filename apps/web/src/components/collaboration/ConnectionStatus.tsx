import React from 'react';
import { useCollaborationStore } from '@/store/collaboration-store';
import { Wifi, WifiOff, RefreshCcw } from 'lucide-react';

export function ConnectionStatus() {
  const { isConnected, provider } = useCollaborationStore();

  if (!provider) return null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer text-xs">
      {isConnected ? (
        <>
          <Wifi className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-gray-300">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3.5 h-3.5 text-red-400" />
          <span className="text-gray-400">Offline</span>
        </>
      )}
    </div>
  );
}
