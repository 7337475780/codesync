import React, { useState } from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { Plus, X } from 'lucide-react';

export function WatchExpressions() {
  const { watchExpressions, addWatchExpression, removeWatchExpression } = useDebuggerStore();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    addWatchExpression(input.trim());
    setInput('');
  };

  return (
    <div>
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Watch</div>
      <div className="flex items-center gap-1 px-2 pb-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Expression..."
          className="flex-1 bg-[#1e1e1e] border border-[#3e3e42] rounded px-2 py-1 text-xs text-gray-200 outline-none focus:border-[#007fd4]"
        />
        <button onClick={handleAdd} className="p-1 text-gray-400 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
      </div>
      {watchExpressions.map(w => (
        <div key={w.id} className="flex items-center gap-2 px-3 py-1 hover:bg-[#2d2d2d] group">
          <span className="text-xs text-blue-300 flex-1">{w.expression}</span>
          <span className="text-xs text-orange-300">{w.value ?? '–'}</span>
          <button onClick={() => removeWatchExpression(w.id)} className="p-0.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X className="w-3 h-3" /></button>
        </div>
      ))}
    </div>
  );
}
