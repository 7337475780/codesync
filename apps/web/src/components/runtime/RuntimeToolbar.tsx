import React from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { Play, Square, RotateCcw, Bug } from 'lucide-react';

export function RuntimeToolbar() {
  const { info, provider } = useRuntimeStore();
  const isRunning = info?.status === 'running';

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2d2d2d] bg-[#1e1e1e] shrink-0">
      <div className="flex items-center gap-1 mr-2">
        <button
          onClick={() => provider?.start()}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors"
        >
          <Play className="w-3.5 h-3.5" /> Run
        </button>
        <button
          onClick={() => provider?.stop()}
          disabled={!isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors"
        >
          <Square className="w-3.5 h-3.5" /> Stop
        </button>
        <button
          onClick={() => provider?.restart()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#2d2d2d] hover:bg-[#3e3e42] text-gray-300 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#2d2d2d] hover:bg-[#3e3e42] text-blue-400 font-medium transition-colors"
        >
          <Bug className="w-3.5 h-3.5" /> Debug
        </button>
      </div>
    </div>
  );
}
