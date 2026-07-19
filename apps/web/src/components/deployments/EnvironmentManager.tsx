import React from 'react';

export function EnvironmentManager({ projectId }: { projectId: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground">
      <h3 className="text-lg font-medium mb-4">Environment Variables (Placeholder)</h3>
      <p className="text-sm text-muted-foreground mb-4">Manage environment variables for project {projectId}</p>
      <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80">
        Add Variable
      </button>
    </div>
  );
}
