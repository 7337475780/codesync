import React from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { cn } from '@codesync/ui/utils/cn';

export function RuntimeStatus() {
  const { info } = useRuntimeStore();
  const status = info?.status ?? 'stopped';

  const config = {
    running: { label: 'Running', color: 'bg-green-500', ring: 'bg-green-500/20' },
    starting: { label: 'Starting', color: 'bg-yellow-500', ring: 'bg-yellow-500/20' },
    stopped: { label: 'Stopped', color: 'bg-gray-500', ring: 'bg-gray-500/20' },
    error: { label: 'Error', color: 'bg-red-500', ring: 'bg-red-500/20' },
  }[status];

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#2d2d2d] text-xs font-medium">
      <span className={cn('relative flex h-2 w-2')}>
        {status === 'running' && (
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', config.ring)} />
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2', config.color)} />
      </span>
      <span className="text-gray-300">{config.label}</span>
    </div>
  );
}
