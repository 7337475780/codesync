import React from 'react';
import { useAIStore } from '@/store/ai-store';
import { Coins } from 'lucide-react';

export function AITokenUsage() {
  const { totalTokensUsed } = useAIStore();

  if (totalTokensUsed === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer text-xs" title="Tokens Used">
      <Coins className="w-3.5 h-3.5 text-yellow-500" />
      <span className="text-gray-300 font-mono text-[10px]">{totalTokensUsed.toLocaleString()}</span>
    </div>
  );
}
