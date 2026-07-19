"use client";

import React, { useEffect, useState } from 'react';
import { FrameworkDetectionCard } from '@/components/workspace/framework-detection-card';
import { PackageDetectionCard } from '@/components/workspace/package-detection-card';
import { mockProvisionProvider } from '@/lib/provisioning/mock-provider';
import { WorkspaceMetrics } from '@/lib/provisioning/types';
import { motion } from 'framer-motion';

export default function WorkspacePage({ params }: { params: { projectId: string } }) {
  const [metrics, setMetrics] = useState<WorkspaceMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkUsage: 0,
    provisionTime: 0,
  });

  useEffect(() => {
    const workspaceId = `mock-ws-${params.projectId}`;
    const fetchMetrics = async () => {
      const data = await mockProvisionProvider.getMetrics(workspaceId);
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 1000);
    return () => clearInterval(interval);
  }, [params.projectId]);
  return (
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Info Column */}
      <div className="md:col-span-2 space-y-8">
        <FrameworkDetectionCard />
        <PackageDetectionCard />
      </div>

      {/* Sidebar */}
      <div className="space-y-8">

            {/* Metrics Snapshot */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Current Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-medium">{metrics.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(metrics.cpuUsage, 100)}%` }} 
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Memory</span>
                    <span className="font-medium">{(metrics.memoryUsage / 1024).toFixed(1)} GB / 4 GB</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-purple-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metrics.memoryUsage / 4096) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Disk</span>
                    <span className="font-medium">{(metrics.diskUsage / 1024).toFixed(1)} GB / 10 GB</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metrics.diskUsage / 10240) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium">{metrics.networkUsage.toFixed(1)} MB/s</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Provision Time</span>
                    <span className="font-medium">{metrics.provisionTime}s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
