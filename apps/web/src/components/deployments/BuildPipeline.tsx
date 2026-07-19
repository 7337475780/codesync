import React from 'react';

export function BuildPipeline({ deploymentId }: { deploymentId: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground">
      <h3 className="text-lg font-medium mb-4">Build Pipeline (Placeholder)</h3>
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-md text-muted-foreground">
        Pipeline Visualization for {deploymentId}
      </div>
    </div>
  );
}
