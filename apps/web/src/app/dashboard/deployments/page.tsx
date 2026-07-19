"use client";

import React from 'react';
import { useDeploymentStore } from '@/store/deployment-store';
import { DeploymentCard } from '@/components/deployments/deployment-card';
import { AnalyticsCards } from '@/components/deployments/analytics-cards';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import Link from 'next/link';

export default function DeploymentsOverviewPage() {
  const { deployments } = useDeploymentStore();
  
  const productionDeployments = deployments.filter(d => d.environment === 'Production');
  const previewDeployments = deployments.filter(d => d.environment === 'Preview');
  
  const currentProduction = productionDeployments[0];

  return (
    <div className="space-y-10 pb-10">
      
      {/* Current Production */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Current Production
          </h2>
          <Link href="/dashboard/deployments/history">
            <Button variant="ghost" size="sm" className="text-text-muted hover:text-text-primary">
              View History <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        {currentProduction ? (
          <DeploymentCard deployment={currentProduction} isLatest />
        ) : (
          <div className="p-8 border border-dashed border-border rounded-xl text-center">
            <p className="text-text-muted">No production deployments found.</p>
          </div>
        )}
      </section>

      {/* Analytics Summary */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
        <AnalyticsCards />
      </section>

      {/* Recent Previews */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Preview Deployments</h2>
        </div>
        
        <div className="space-y-4">
          {previewDeployments.slice(0, 3).map(deployment => (
            <DeploymentCard key={deployment.id} deployment={deployment} />
          ))}
          
          {previewDeployments.length === 0 && (
            <div className="p-8 border border-dashed border-border rounded-xl text-center">
              <p className="text-text-muted">No preview deployments found.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
