import React, { useState } from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { Breakpoint } from '@/lib/runtime/types/debugger';
import { Circle, CircleOff, Trash2 } from 'lucide-react';

function BreakpointItem({ bp }: { bp: Breakpoint }) {
  const { toggleBreakpoint, removeBreakpoint } = useDebuggerStore();
  const filename = bp.filePath.split('/').pop();
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#2d2d2d] group rounded transition-colors">
      <button onClick={() => toggleBreakpoint(bp.id)} className="text-gray-400 hover:text-white transition-colors shrink-0">
        {bp.enabled ? <Circle className="w-3.5 h-3.5 text-red-500 fill-red-500" /> : <CircleOff className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-gray-200 truncate">{filename}</span>
        <span className="text-[10px] text-gray-500 ml-2">:{bp.line}</span>
      </div>
      <button onClick={() => removeBreakpoint(bp.id)} className="p-0.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded"><Trash2 className="w-3 h-3" /></button>
    </div>
  );
}

export function BreakpointList() {
  const { breakpoints } = useDebuggerStore();
  return (
    <div>
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold flex justify-between">
        <span>Breakpoints</span>
        <span className="text-gray-600">{breakpoints.length}</span>
      </div>
      {breakpoints.map(bp => <BreakpointItem key={bp.id} bp={bp} />)}
      {breakpoints.length === 0 && <div className="text-center text-gray-600 text-xs py-4">No breakpoints set</div>}
    </div>
  );
}
