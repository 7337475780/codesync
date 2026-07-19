import React from 'react';

export function DeploymentLogs({ deploymentId }: { deploymentId: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground">
      <h3 className="text-lg font-medium mb-4">Deployment Logs (Placeholder)</h3>
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted bg-black text-green-400 font-mono text-sm rounded-md p-4 overflow-hidden">
        &gt; Starting build process for {deploymentId}...<br/>
        &gt; Installing dependencies...<br/>
        &gt; Build successful.<br/>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
