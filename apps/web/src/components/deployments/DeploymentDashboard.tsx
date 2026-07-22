import React, { useEffect, useState } from 'react';
import { useDeploymentStore } from '../../stores/deployment-store';
import { DeploymentStatusBadge } from './DeploymentStatusBadge';
import { DeploymentCard } from './DeploymentCard';
import { BuildPipeline } from './BuildPipeline';
import { CustomDomains } from './CustomDomains';
import { EnvironmentManager } from './EnvironmentManager';
import { TrafficAnalytics } from './TrafficAnalytics';
import { DeploymentLogs } from './DeploymentLogs';

export function DeploymentDashboard({ projectId }: { projectId: string }) {
  const { currentDeployment, setCurrentDeployment, deployments, fetchDeployments } = useDeploymentStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (projectId) {
      fetchDeployments(projectId);
    }
  }, [projectId, fetchDeployments]);

  useEffect(() => {
    if (deployments.length > 0 && !currentDeployment) {
      setCurrentDeployment(deployments[0]);
    }
  }, [deployments, currentDeployment, setCurrentDeployment]);

  if (!currentDeployment) {
    return <div className="p-8 text-center animate-pulse">Loading deployment data...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Deployments</h1>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground text-sm">
              <a href={currentDeployment.url || '#'} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                {currentDeployment.url?.replace('https://', '')}
              </a>
            </span>
            <DeploymentStatusBadge status={currentDeployment.status} />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Deploy Now
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {['overview', 'pipeline', 'analytics', 'settings', 'logs'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DeploymentCard deployment={currentDeployment} isLatest />
              {deployments.filter(d => d.id !== currentDeployment.id).slice(0, 2).map(d => (
                <DeploymentCard key={d.id} deployment={d} />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'pipeline' && (
          <BuildPipeline deploymentId={currentDeployment.id} />
        )}

        {activeTab === 'analytics' && (
          <TrafficAnalytics />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <CustomDomains projectId={projectId} />
            <EnvironmentManager projectId={projectId} />
          </div>
        )}
        
        {activeTab === 'logs' && (
          <DeploymentLogs deploymentId={currentDeployment.id} />
        )}
      </div>
    </div>
  );
}
