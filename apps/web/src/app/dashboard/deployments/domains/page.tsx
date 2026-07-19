import React from 'react';
import { DomainManager } from '@/components/deployments/domain-manager';

export default function DeploymentsDomainsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-semibold">Domains</h2>
        <p className="text-sm text-text-muted mt-1">Manage custom domains and SSL certificates for your deployments.</p>
      </div>
      
      <DomainManager />
    </div>
  );
}
