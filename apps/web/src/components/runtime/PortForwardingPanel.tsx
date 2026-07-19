import React from 'react';
import { usePortsStore } from '@/store/ports-store';
import { useRuntimeStore } from '@/store/runtime-store';
import { Copy, ExternalLink, X, Globe, Lock } from 'lucide-react';
import { ForwardedPort } from '@/lib/runtime/types/ports';
import { cn } from '@codesync/ui/utils/cn';

function PortCard({ port }: { port: ForwardedPort }) {
  const { provider } = useRuntimeStore();
  const { updatePort } = usePortsStore();

  return (
    <div className={cn('flex items-center gap-3 px-3 py-2 rounded-md border transition-colors', port.isOpen ? 'border-[#2d2d2d] bg-[#252526]' : 'border-[#2d2d2d] bg-[#1e1e1e] opacity-50')}>
      <div className="w-12 text-center">
        <span className="text-sm font-mono font-semibold text-blue-400">{port.port}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300 truncate">{port.label || port.protocol.toUpperCase()}</span>
          <span className="text-[10px] uppercase font-semibold text-gray-500 bg-[#2d2d2d] px-1.5 py-0.5 rounded">{port.protocol}</span>
        </div>
        <span className="text-[11px] text-gray-500 font-mono">{port.localUrl}</span>
      </div>
      <div className="flex items-center gap-1">
        {port.visibility === 'public' ? <Globe className="w-3.5 h-3.5 text-green-400" /> : <Lock className="w-3.5 h-3.5 text-gray-500" />}
        <button onClick={() => navigator.clipboard.writeText(port.localUrl)} className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10" title="Copy URL"><Copy className="w-3.5 h-3.5" /></button>
        <button onClick={() => window.open(port.localUrl, '_blank')} className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10" title="Open in Browser"><ExternalLink className="w-3.5 h-3.5" /></button>
        {port.isOpen && <button onClick={() => { provider?.closePort(port.id); updatePort(port.id, { isOpen: false }); }} className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10" title="Close Port"><X className="w-3.5 h-3.5" /></button>}
      </div>
    </div>
  );
}

export function PortForwardingPanel() {
  const { ports } = usePortsStore();
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Forwarded Ports</span>
        <span className="text-[10px] text-gray-500">{ports.filter(p => p.isOpen).length} active</span>
      </div>
      {ports.map(p => <PortCard key={p.id} port={p} />)}
      {ports.length === 0 && <div className="text-center text-gray-500 text-sm py-6">No forwarded ports</div>}
    </div>
  );
}
