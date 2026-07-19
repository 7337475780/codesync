import React from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { Play, Pause, Square, RotateCcw, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import { BreakpointList } from './BreakpointList';
import { CallStack } from './CallStack';
import { VariablesPanel } from './VariablesPanel';
import { WatchExpressions } from './WatchExpressions';
import { DebugConsole } from './DebugConsole';

// Simulate a mock debugger pause
const MOCK_CALL_STACK = [
  { id: 'f1', functionName: 'handleSubmit', filePath: 'src/app/page.tsx', line: 12, column: 4 },
  { id: 'f2', functionName: 'onClick', filePath: 'src/components/ui/button.tsx', line: 45, column: 8 },
];

export function DebuggerPanel() {
  const { state, setState, setCallStack } = useDebuggerStore();

  const handlePause = () => {
    setState('paused');
    setCallStack(MOCK_CALL_STACK);
  };

  const handleContinue = () => {
    setState('running');
    setCallStack([]);
  };

  const handleStop = () => {
    setState('idle');
    setCallStack([]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden text-[13px]">
      {/* Debugger toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#2d2d2d] bg-[#1e1e1e] shrink-0">
        <button onClick={handleContinue} disabled={state !== 'paused'} title="Continue (F5)" className="p-1.5 text-gray-400 hover:text-green-400 disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><Play className="w-3.5 h-3.5" /></button>
        <button onClick={handlePause} disabled={state === 'paused'} title="Pause (F6)" className="p-1.5 text-gray-400 hover:text-yellow-400 disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><Pause className="w-3.5 h-3.5" /></button>
        <button disabled={state !== 'paused'} title="Step Over (F10)" className="p-1.5 text-gray-400 hover:text-blue-400 disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><ArrowRight className="w-3.5 h-3.5" /></button>
        <button disabled={state !== 'paused'} title="Step Into (F11)" className="p-1.5 text-gray-400 hover:text-blue-400 disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
        <button disabled={state !== 'paused'} title="Step Out (Shift+F11)" className="p-1.5 text-gray-400 hover:text-blue-400 disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
        <button onClick={() => { setState('running'); setCallStack([]); }} title="Restart" className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-white/5 rounded transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
        <button onClick={handleStop} title="Stop" className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded transition-colors"><Square className="w-3.5 h-3.5" /></button>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-gray-500">{state}</span>
      </div>

      {/* Scrollable panels */}
      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#2d2d2d]">
        <VariablesPanel />
        <WatchExpressions />
        <CallStack />
        <BreakpointList />
      </div>

      {/* Debug console - fixed at bottom */}
      <div className="h-48 border-t border-[#2d2d2d] shrink-0">
        <DebugConsole />
      </div>
    </div>
  );
}
