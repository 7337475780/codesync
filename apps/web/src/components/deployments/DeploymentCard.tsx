import React from 'react';
import { Deployment } from '../../types/deployment';
import { DeploymentStatusBadge } from './DeploymentStatusBadge';

interface DeploymentCardProps {
  deployment: Deployment;
  isLatest?: boolean;
}

export function DeploymentCard({ deployment, isLatest = false }: DeploymentCardProps) {
  return (
    <div className={`p-5 rounded-lg border ${isLatest ? 'border-primary shadow-sm bg-card' : 'border-border bg-muted/30'} flex flex-col space-y-4 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {isLatest ? 'Current Deployment' : 'Previous Deployment'}
          </span>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg">{deployment.branch}</span>
            <span className="text-sm text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
              {deployment.commitSha?.substring(0, 7)}
            </span>
          </div>
        </div>
        <DeploymentStatusBadge status={deployment.status} />
      </div>
      
      <p className="text-sm text-foreground/80 line-clamp-2">
        {deployment.commitMessage}
      </p>
      
      <div className="pt-4 mt-auto border-t border-border flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{new Date(deployment.createdAt).toLocaleDateString()}</span>
        </div>
        <div>
          by {deployment.authorName}
        </div>
      </div>
    </div>
  );
}
