import React, { useState } from 'react';
import { useDebuggerStore } from '@/store/debugger-store';
import { DebugVariable } from '@/lib/runtime/types/debugger';
import { ChevronRight, ChevronDown } from 'lucide-react';

function VariableRow({ variable, depth = 0 }: { variable: DebugVariable; depth?: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-1 py-0.5 hover:bg-[#2d2d2d] rounded px-2 cursor-default group" style={{ paddingLeft: `${8 + depth * 12}px` }}>
        {variable.expandable ? (
          <button onClick={() => setExpanded(!expanded)} className="text-gray-500 hover:text-white">
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : <span className="w-3" />}
        <span className="text-xs text-blue-300 mr-1">{variable.name}</span>
        <span className="text-[10px] text-gray-500 mr-1">{variable.type}</span>
        <span className="text-xs text-orange-300 truncate">{variable.value}</span>
      </div>
      {expanded && variable.children?.map((child, i) => <VariableRow key={i} variable={child} depth={depth + 1} />)}
    </div>
  );
}

const MOCK_VARIABLES: DebugVariable[] = [
  { name: 'req', value: 'Request', type: 'object', expandable: true, children: [{ name: 'method', value: '"GET"', type: 'string' }, { name: 'url', value: '"/api/data"', type: 'string' }] },
  { name: 'userId', value: '"usr_123abc"', type: 'string' },
  { name: 'count', value: '42', type: 'number' },
];

export function VariablesPanel() {
  const { state } = useDebuggerStore();
  const vars = state === 'paused' ? MOCK_VARIABLES : [];
  return (
    <div>
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Variables</div>
      {vars.map((v, i) => <VariableRow key={i} variable={v} />)}
      {vars.length === 0 && <div className="text-center text-gray-600 text-xs py-4">Not paused</div>}
    </div>
  );
}
