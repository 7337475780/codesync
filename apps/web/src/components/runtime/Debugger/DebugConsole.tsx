import React, { useState, useRef, useEffect } from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { Trash2 } from 'lucide-react';

export function DebugConsole() {
  const { consoleOutput, clearConsole, addConsoleOutput } = useDebuggerStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [consoleOutput]);

  const handleEval = () => {
    if (!input.trim()) return;
    addConsoleOutput(`> ${input}`);
    addConsoleOutput(`← "${input}" evaluated`);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#2d2d2d] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Debug Console</span>
        <button onClick={clearConsole} className="text-gray-500 hover:text-white"><Trash2 className="w-3 h-3" /></button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[11px] p-2 text-gray-300 space-y-0.5">
        {consoleOutput.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-blue-300' : line.startsWith('←') ? 'text-green-300' : 'text-gray-400'}>{line}</div>
        ))}
        {consoleOutput.length === 0 && <div className="text-gray-600 text-center py-4">Console output will appear here.</div>}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-1 border-t border-[#2d2d2d] p-1 shrink-0">
        <span className="text-gray-500 text-xs pl-1">&gt;</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleEval()} placeholder="Evaluate expression..." className="flex-1 bg-transparent text-xs text-gray-200 outline-none pl-1" />
      </div>
    </div>
  );
}
