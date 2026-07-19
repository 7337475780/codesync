"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

const MOCK_LOGS = [
  "[10:01:23.100] Cloning github.com/codesync-dev/web (Branch: main, Commit: a1b2c3d)",
  "[10:01:23.500] Cloning completed: 400ms",
  "[10:01:23.600] Running build command 'npm run build'...",
  "[10:01:24.000] > web@0.1.0 build",
  "[10:01:24.000] > next build",
  "[10:01:25.100] Attention: Next.js now collects completely anonymous telemetry regarding usage.",
  "[10:01:25.500] info  - Loaded env from .env.production",
  "[10:01:26.200] info  - Creating an optimized production build...",
  "[10:01:32.400] info  - Compiled successfully",
  "[10:01:32.400] info  - Collecting page data...",
  "[10:01:38.100] info  - Generating static pages (12/12)",
  "[10:01:39.000] info  - Finalizing page optimization...",
  "[10:01:40.000] Route (app)                              Size     First Load JS",
  "[10:01:40.000] ┌ ○ /                                    1.2 kB         85.1 kB",
  "[10:01:40.000] ├ ○ /dashboard                           3.4 kB         87.3 kB",
  "[10:01:40.000] ├ λ /dashboard/deployments               4.1 kB         88.0 kB",
  "[10:01:40.000] └ ○ /dashboard/settings                  2.8 kB         86.7 kB",
  "[10:01:41.200] Build completed. Populating build cache...",
  "[10:01:42.000] Uploading build cache (120MB)...",
  "[10:01:44.500] Build cache uploaded: 2.5s",
  "[10:01:44.600] Creating deployment...",
  "[10:01:45.000] Deployment created successfully."
];

export const DeploymentLogs = ({ isBuilding = false }: { isBuilding?: boolean }) => {
  const [logs, setLogs] = useState<string[]>(isBuilding ? [] : MOCK_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBuilding) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < MOCK_LOGS.length) {
        setLogs(prev => [...prev, MOCK_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isBuilding]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-border/50 overflow-hidden flex flex-col h-[500px] shadow-sm">
      <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-[#111]">
        <div className="flex items-center gap-2 text-text-muted text-xs font-medium">
          <Terminal className="w-3.5 h-3.5" /> Build Logs
        </div>
        <div className="flex items-center gap-2">
          {isBuilding && <span className="flex items-center gap-1.5 text-xs text-primary"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live</span>}
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-text-muted hover:text-text-primary">Copy</Button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed scrollbar-thin text-gray-300"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex hover:bg-white/5 px-2 py-0.5 rounded transition-colors break-all">
            <span className="text-gray-600 mr-4 select-none w-6 text-right shrink-0">{i + 1}</span>
            <span className={
              log.includes('error') || log.includes('failed') ? 'text-red-400' :
              log.includes('info') ? 'text-blue-400' :
              log.includes('success') ? 'text-green-400' :
              log.includes('Attention') ? 'text-yellow-400' : ''
            }>
              {log}
            </span>
          </div>
        ))}
        {isBuilding && logs.length < MOCK_LOGS.length && (
          <div className="flex px-2 py-0.5">
            <span className="text-gray-600 mr-4 select-none w-6 text-right shrink-0">{logs.length + 1}</span>
            <span className="w-2 h-3.5 bg-gray-400 animate-pulse mt-1 inline-block" />
          </div>
        )}
      </div>
    </div>
  );
};
