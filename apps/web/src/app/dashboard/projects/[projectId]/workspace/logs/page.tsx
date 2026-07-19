"use client";

import React from 'react';
import { LiveLogViewer } from '@/components/workspace/live-log-viewer';

export default function LogsPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Live Logs</h2>
        <p className="text-muted-foreground mt-1">Real-time output from the workspace provisioning and runtime.</p>
      </div>
      <div className="flex-1 border rounded-xl overflow-hidden shadow-sm min-h-0 bg-surface">
        <LiveLogViewer projectId={params.projectId} />
      </div>
    </div>
  );
}
