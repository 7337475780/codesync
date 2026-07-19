"use client";

import React, { useState } from 'react';
import { useDeploymentStore } from '@/store/deployment-store';
import { Lock, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export default function DeploymentsEnvironmentPage() {
  const { envVars, addEnvVar, removeEnvVar } = useDeploymentStore();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});

  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    addEnvVar({
      key: newKey,
      value: newValue,
      environments: ['Production', 'Preview'],
    });
    setNewKey('');
    setNewValue('');
  };

  const toggleShow = (id: string) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-semibold">Environment Variables</h2>
        <p className="text-sm text-text-muted mt-1">Manage secure environment variables for your builds and deployments.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Add New Variable</h3>
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">Key</label>
                <input 
                  type="text" 
                  placeholder="e.g. DATABASE_URL" 
                  value={newKey}
                  onChange={e => setNewKey(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">Value</label>
                <input 
                  type="text" 
                  placeholder="e.g. postgres://..." 
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </div>
            </div>
          </div>
          <div className="pt-6">
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="font-medium text-sm text-text-secondary flex items-center gap-2">
            <Lock className="w-4 h-4" /> System Variables
          </h3>
        </div>
        <div className="divide-y divide-border">
          {envVars.map(env => (
            <div key={env.id} className="p-4 flex items-center justify-between group hover:bg-muted/10 transition-colors">
              <div className="flex-1 flex items-center gap-4">
                <div className="font-mono text-sm font-medium w-1/3">{env.key}</div>
                <div className="font-mono text-sm text-text-muted w-1/2 flex items-center gap-2">
                  {showValues[env.id] ? env.value : '••••••••••••••••••••'}
                  <button onClick={() => toggleShow(env.id)} className="text-text-muted hover:text-text-primary p-1">
                    {showValues[env.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {env.environments.map(e => (
                    <span key={e} className="text-[10px] uppercase bg-muted px-1.5 py-0.5 rounded text-text-secondary">{e}</span>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeEnvVar(env.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {envVars.length === 0 && (
            <div className="p-8 text-center text-text-muted text-sm">
              No environment variables configured.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
