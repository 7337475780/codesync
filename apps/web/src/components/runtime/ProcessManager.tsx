import React, { useState } from 'react';
import { useProcessStore } from '@/store/process-store';
import { useRuntimeStore } from '@/store/runtime-store';
import { RuntimeProcess } from '@/lib/runtime/types/process';
import { Play, Square, RotateCcw, ChevronDown, ChevronRight, Cpu, MemoryStick } from 'lucide-react';
import { cn } from '@codesync/ui/utils/cn';

function ProcessCard({ process }: { process: RuntimeProcess }) {
  const [expanded, setExpanded] = useState(false);
  const { provider } = useRuntimeStore();
  const { updateProcess } = useProcessStore();

  const statusColor = { running: 'text-green-400', stopped: 'text-gray-500', crashed: 'text-red-400', restarting: 'text-yellow-400' }[process.status];

  return (
    <div className="border border-[#2d2d2d] rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#252526] hover:bg-[#2d2d2d] transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <button className="text-gray-500 hover:text-white">{expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}</button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200 truncate">{process.name}</span>
            <span className={cn('text-[10px] font-semibold uppercase tracking-wider', statusColor)}>{process.status}</span>
          </div>
          <span className="text-[11px] text-gray-500 font-mono truncate">{process.command}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px] text-gray-400">
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{process.cpuPercent.toFixed(1)}%</span>
          <span className="flex items-center gap-1"><MemoryStick className="w-3 h-3" />{process.memoryMb}MB</span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {process.status === 'running' ? (
            <>
              <button onClick={(e) => { e.stopPropagation(); provider?.restartProcess(process.id); updateProcess(process.id, { status: 'restarting' }); }} className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button onClick={(e) => { e.stopPropagation(); provider?.stopProcess(process.id); updateProcess(process.id, { status: 'stopped' }); }} className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10"><Square className="w-3.5 h-3.5" /></button>
            </>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); updateProcess(process.id, { status: 'running' }); }} className="p-1 text-gray-400 hover:text-green-400 rounded hover:bg-white/10"><Play className="w-3.5 h-3.5" /></button>
          )}
        </div>
      </div>
      {expanded && (
        <div className="bg-[#141414] p-3 font-mono text-[11px] text-gray-400 border-t border-[#2d2d2d] max-h-32 overflow-y-auto custom-scrollbar">
          {process.logs.map((l, i) => <div key={i} className="leading-relaxed">{l}</div>)}
        </div>
      )}
    </div>
  );
}

export function ProcessManager() {
  const { processes } = useProcessStore();
  return (
    <div className="flex flex-col gap-2 p-3">
      {processes.map(p => <ProcessCard key={p.id} process={p} />)}
      {processes.length === 0 && <div className="text-center text-gray-500 text-sm py-8">No running processes</div>}
    </div>
  );
}
