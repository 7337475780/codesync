import React from 'react';
import { PullRequest } from '@/lib/github/types';
import { getInitials } from '@/lib/string-utils';
import { GitPullRequest, Check, AlertCircle } from 'lucide-react';

export const PullRequestList = ({ pullRequests }: { pullRequests: PullRequest[] }) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
        <h3 className="font-semibold">Pull Requests</h3>
      </div>
      <div className="divide-y divide-border">
        {pullRequests.map(pr => (
          <div key={pr.id} className="p-4 flex items-start gap-3 hover:bg-muted/20 transition-colors">
            <div className={`mt-1 shrink-0 ${pr.state === 'merged' ? 'text-purple-500' : pr.state === 'open' ? 'text-success' : 'text-destructive'}`}>
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-text-primary text-base">{pr.title}</span>
                {pr.labels.map(label => (
                  <span 
                    key={label.name} 
                    className="px-2 py-0.5 rounded-full text-xs font-medium border"
                    style={{ borderColor: label.color, color: label.color, backgroundColor: `${label.color}15` }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                <span className="font-mono">#{pr.number}</span>
                <span className="flex items-center gap-1">
                  by
                  <span 
                    className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-white text-[9px] shrink-0 inline-flex ml-0.5 mr-0.5"
                    style={{ backgroundColor: `hsl(${pr.author.login.length * 40}, 70%, 50%)` }}
                    title={pr.author.login}
                  >
                    {getInitials(pr.author.login)}
                  </span>
                  {pr.author.login}
                </span>
                <span>•</span>
                <span>{pr.state === 'merged' ? `merged ${new Date(pr.mergedAt!).toLocaleDateString()}` : `opened ${new Date(pr.createdAt).toLocaleDateString()}`}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              {pr.state === 'open' && pr.mergeableState === 'clean' && (
                <span className="flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded border border-success/30">
                  <Check className="w-3 h-3 mr-1" /> Mergeable
                </span>
              )}
              {pr.state === 'open' && pr.mergeableState === 'dirty' && (
                <span className="flex items-center text-xs text-destructive bg-destructive/10 px-2 py-1 rounded border border-destructive/30">
                  <AlertCircle className="w-3 h-3 mr-1" /> Conflicts
                </span>
              )}
            </div>
          </div>
        ))}
        {pullRequests.length === 0 && (
          <div className="p-8 text-center text-text-muted">
            <p>No pull requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
