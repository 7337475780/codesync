"use client";

import React, { useState } from 'react';
import { useDeploymentStore } from '@/store/deployment-store';
import { DeploymentCard } from '@/components/deployments/deployment-card';
import { Search, Filter } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export default function DeploymentsHistoryPage() {
  const { deployments } = useDeploymentStore();
  const [search, setSearch] = useState('');
  
  const filteredDeployments = deployments.filter(d => 
    d.branch.toLowerCase().includes(search.toLowerCase()) || 
    d.commitMessage.toLowerCase().includes(search.toLowerCase()) ||
    d.creator.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Deployment History</h2>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search deployments..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {filteredDeployments.map(deployment => (
          <DeploymentCard key={deployment.id} deployment={deployment} />
        ))}
        
        {filteredDeployments.length === 0 && (
          <div className="p-12 text-center text-text-muted border border-dashed border-border rounded-xl">
            No deployments found.
          </div>
        )}
      </div>
    </div>
  );
}
