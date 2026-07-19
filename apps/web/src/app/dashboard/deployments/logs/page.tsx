"use client";

import React from 'react';
import { useDeploymentStore } from '@/store/deployment-store';
import { DeploymentLogs } from '@/components/deployments/deployment-logs';
import { DeploymentTimeline } from '@/components/deployments/deployment-timeline';

export default function DeploymentsLogsPage() {
  const { deployments, activeDeploymentId } = useDeploymentStore();
  const deployment = deployments.find(d => d.id === activeDeploymentId) || deployments[0];

  if (!deployment) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Build Logs</h2>
            <p className="text-sm text-text-muted mt-1">
              Commit <span className="font-mono bg-muted px-1 rounded text-text-primary">{deployment.commitHash.substring(0, 7)}</span> on <span className="font-mono bg-muted px-1 rounded text-text-primary">{deployment.branch}</span>
            </p>
          </div>
        </div>
        
        <DeploymentLogs isBuilding={deployment.status === 'BUILDING'} />
      </div>

      <div className="w-full lg:w-72 flex-shrink-0">
        <h3 className="font-medium text-sm text-text-muted uppercase tracking-wider mb-6">Timeline</h3>
        <DeploymentTimeline deployment={deployment} />
      </div>
    </div>
  );
}
