import React from 'react';
import { Deployment, useDeploymentStore } from '@/store/deployment-store';
import { StatusBadge } from './status-badge';
import { GitBranch, GitCommit, ExternalLink, MoreVertical, RefreshCcw, XCircle, TerminalSquare } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import Link from 'next/link';

const timeAgo = (dateStr: string) => {
  const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

export const DeploymentCard = ({ deployment, isLatest = false }: { deployment: Deployment, isLatest?: boolean }) => {
  const { triggerRedeploy, cancelDeployment } = useDeploymentStore();
  const timeStr = timeAgo(deployment.createdAt);
  
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <StatusBadge status={deployment.status} />
          <span className="text-sm font-medium text-text-primary">
            {deployment.environment} {isLatest && <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full font-normal">Latest</span>}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {deployment.status === 'READY' && (
            <a 
              href={`https://${deployment.url}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 bg-muted/50 px-2 py-1 rounded"
            >
              {deployment.url} <ExternalLink className="w-3 h-3" />
            </a>
          )}
          
          <Button variant="ghost" size="sm" className="h-8 px-2 text-text-muted hover:text-text-primary">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <div className="font-semibold text-base line-clamp-1">{deployment.commitMessage}</div>
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5" />
            <span className="font-mono">{deployment.branch}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitCommit className="w-3.5 h-3.5" />
            <span className="font-mono">{deployment.commitHash.substring(0, 7)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div 
            className="w-5 h-5 rounded-full bg-cover flex items-center justify-center text-white font-bold text-[9px]"
            style={{ 
              backgroundColor: `hsl(${deployment.creator.name.length * 40}, 70%, 50%)`,
              backgroundImage: deployment.creator.avatar.includes('api.dicebear.com') ? `url(${deployment.creator.avatar})` : undefined
            }}
          >
            {!deployment.creator.avatar.includes('api.dicebear.com') && deployment.creator.name.charAt(0)}
          </div>
          <span>{deployment.creator.name} deployed {timeStr}</span>
          {deployment.duration && <span>• {deployment.duration}s</span>}
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/deployments/logs">
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
              <TerminalSquare className="w-3.5 h-3.5 mr-1.5" /> Logs
            </Button>
          </Link>
          
          {(deployment.status === 'READY' || deployment.status === 'ERROR') && (
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5" onClick={() => triggerRedeploy(deployment.id)}>
              <RefreshCcw className="w-3.5 h-3.5 mr-1.5" /> Redeploy
            </Button>
          )}
          
          {(deployment.status === 'BUILDING' || deployment.status === 'QUEUED') && (
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => cancelDeployment(deployment.id)}>
              <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
