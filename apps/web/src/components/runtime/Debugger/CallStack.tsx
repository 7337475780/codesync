import React from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { ArrowRight } from 'lucide-react';

export function CallStack() {
  const { callStack, state } = useDebuggerStore();

  return (
    <div>
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Call Stack</div>
      {state === 'paused' && callStack.map((frame, i) => (
        <div key={frame.id} className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#2d2d2d] cursor-pointer transition-colors ${i === 0 ? 'bg-[#2d2d2d]' : ''}`}>
          <ArrowRight className={`w-3 h-3 shrink-0 ${i === 0 ? 'text-yellow-400' : 'text-gray-600'}`} />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-200">{frame.functionName}</span>
            <span className="text-[10px] text-gray-500 ml-2">{frame.filePath.split('/').pop()}:{frame.line}</span>
          </div>
        </div>
      ))}
      {state !== 'paused' && <div className="text-center text-gray-600 text-xs py-4">Not paused</div>}
    </div>
  );
}
