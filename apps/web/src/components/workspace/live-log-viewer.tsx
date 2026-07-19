"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Download, Trash2, Search, ArrowDown, Copy, FileJson, FileText } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { useWorkspaceLogStore } from '@/store/workspace-log-store';
import { mockProvisionProvider } from '@/lib/provisioning/mock-provider';
import { useVirtualizer } from '@tanstack/react-virtual';

const levelColors = {
  INFO: 'text-blue-400',
  SUCCESS: 'text-green-400',
  WARNING: 'text-yellow-400',
  ERROR: 'text-red-400',
  DEBUG: 'text-text-muted'
};

export const LiveLogViewer = ({ projectId = 'default' }: { projectId?: string }) => {
  const { logs, isPaused, filterLevel, searchQuery, addLog, setFilterLevel, setSearchQuery, togglePause, clearLogs } = useWorkspaceLogStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const workspaceId = `mock-ws-${projectId}`;
    const unsubscribeLog = mockProvisionProvider.streamLogs(workspaceId, (log) => {
      addLog(log);
    });

    return () => {
      unsubscribeLog();
    };
  }, [projectId, addLog]);

  const filteredLogs = logs.filter(log => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const rowVirtualizer = useVirtualizer({
    count: filteredLogs.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 28, // Estimated height per row
    overscan: 20,
  });

  const scrollToBottom = useCallback(() => {
    if (filteredLogs.length > 0) {
      rowVirtualizer.scrollToIndex(filteredLogs.length - 1, { align: 'end' });
    }
  }, [filteredLogs.length, rowVirtualizer]);

  useEffect(() => {
    if (!isPaused && isAtBottom && filteredLogs.length > 0) {
      scrollToBottom();
    }
  }, [filteredLogs.length, isPaused, isAtBottom, scrollToBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 10;
    setIsAtBottom(isBottom);
  };

  const copyLogs = () => {
    const text = filteredLogs.map(l => `[${new Date(l.timestamp).toISOString()}] [${l.level}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace-logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportTXT = () => {
    const text = filteredLogs.map(l => `[${new Date(l.timestamp).toISOString()}] [${l.level}] ${l.message}`).join('\n');
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace-logs.txt");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col h-full bg-surface text-text-primary font-mono text-[13px]">
      {/* Log Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-white/10 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-background border border-white/10 rounded px-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground mr-2" />
            <input 
              type="text" 
              aria-label="Filter logs"
              placeholder="Filter logs..." 
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-48 text-xs py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            aria-label="Filter by log level"
            className="bg-background border border-white/10 rounded px-2 py-1 text-xs focus:outline-none"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
          >
            <option value="ALL">All Levels</option>
            <option value="INFO">Info</option>
            <option value="SUCCESS">Success</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
            <option value="DEBUG">Debug</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={togglePause} title={isPaused ? "Resume scrolling" : "Pause scrolling"} aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}>
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={clearLogs} title="Clear logs" aria-label="Clear logs">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={copyLogs} title="Copy logs to clipboard" aria-label="Copy logs to clipboard">
            <Copy className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={exportJSON} title="Export as JSON" aria-label="Export as JSON">
            <FileJson className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-text-secondary hover:text-white" onClick={exportTXT} title="Export as TXT" aria-label="Export as TXT">
            <FileText className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Log Stream */}
      <div className="relative flex-1 min-h-0">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto p-4 scroll-smooth"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const log = filteredLogs[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="flex items-start hover:bg-white/[0.02] px-1 py-0.5 rounded group absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <span className="text-text-muted mr-4 shrink-0 select-none">
                    {new Date(log.timestamp).toLocaleTimeString(undefined, { hour12: false })}
                  </span>
                  <span className={`w-20 shrink-0 font-bold ${levelColors[log.level]}`}>
                    {log.level}
                  </span>
                  <span className="break-all">{log.message}</span>
                </div>
              );
            })}
          </div>
          {filteredLogs.length === 0 && (
            <div className="flex flex-col items-center justify-center text-text-muted mt-20">
              <p className="text-sm">No logs found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Scroll to bottom button */}
        {!isAtBottom && (
          <Button
            variant="secondary"
            size="icon"
            onClick={scrollToBottom}
            className="absolute bottom-4 right-8 h-8 w-8 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
            title="Scroll to bottom"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
