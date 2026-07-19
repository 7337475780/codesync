import React, { useRef } from 'react';
import { Commit } from '@/lib/github/types';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getInitials } from '@/lib/string-utils';
import { GitCommit, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export const CommitTimeline = ({ commits }: { commits: Commit[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const rowVirtualizer = useVirtualizer({
    count: commits.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 10,
  });

  return (
    <div 
      ref={parentRef}
      className="bg-card border border-border rounded-xl shadow-sm h-[600px] overflow-auto scrollbar-thin"
    >
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const commit = commits[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full px-4"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="h-full border-b border-border flex items-center justify-between hover:bg-muted/20 transition-colors -mx-4 px-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white text-xs shrink-0"
                    style={{ backgroundColor: `hsl(${commit.author.name.length * 40}, 70%, 50%)` }}
                  >
                    {getInitials(commit.author.name)}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{commit.message}</span>
                      {commit.verified && (
                        <span className="text-success flex items-center shrink-0" title="Verified commit">
                          <ShieldCheck className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                      <span className="font-semibold text-text-secondary">{commit.author.name}</span>
                      <span>committed on {new Date(commit.author.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 pl-4">
                  <div className="hidden sm:flex items-center gap-3 text-xs">
                    <span className="text-success">{commit.stats.additions} ++</span>
                    <span className="text-destructive">{commit.stats.deletions} --</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono bg-muted px-2 py-1 rounded">
                    <GitCommit className="w-3.5 h-3.5" />
                    {commit.sha}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
