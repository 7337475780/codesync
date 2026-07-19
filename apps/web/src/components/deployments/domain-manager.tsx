"use client";

import React, { useState } from 'react';
import { useDeploymentStore, Domain } from '@/store/deployment-store';
import { Globe, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export const DomainManager = () => {
  const { domains, addDomain, removeDomain } = useDeploymentStore();
  const [newDomain, setNewDomain] = useState('');
  
  const handleAdd = () => {
    if (!newDomain.trim()) return;
    addDomain({
      name: newDomain,
      type: 'Alias',
    });
    setNewDomain('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-2">Add Domain</h3>
        <p className="text-sm text-text-muted mb-4">Connect a custom domain to your production deployment.</p>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="e.g. my-app.com" 
              value={newDomain}
              onChange={e => setNewDomain(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-text-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Domain</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">SSL</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {domains.map(domain => (
                <tr key={domain.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-primary">
                    <a href={`https://${domain.name}`} target="_blank" rel="noreferrer" className="hover:underline">
                      {domain.name}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-muted px-2 py-1 rounded text-xs text-text-secondary">
                      {domain.type} {domain.target && `→ ${domain.target}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {domain.status === 'Active' && <span className="flex items-center gap-1.5 text-success"><CheckCircle2 className="w-4 h-4" /> Valid Configuration</span>}
                    {domain.status === 'Pending' && <span className="flex items-center gap-1.5 text-warning"><AlertCircle className="w-4 h-4" /> Invalid Configuration</span>}
                  </td>
                  <td className="px-6 py-4">
                    {domain.ssl === 'Active' && <span className="text-success">Active</span>}
                    {domain.ssl === 'Pending' && <span className="text-warning flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Generating...</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-muted hover:text-text-primary">
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeDomain(domain.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
