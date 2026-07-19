"use client";

import React, { useState } from 'react';
import { Save, AlertTriangle, Trash2, PowerOff } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';
import { Input } from '@codesync/ui/components/ui/input';

export default function SettingsPage({ params }: { params: { projectId: string } }) {
  const [workspaceName, setWorkspaceName] = useState(`workspace-${params.projectId}`);
  const [autoSleep, setAutoSleep] = useState('30');
  const [cpu, setCpu] = useState('2');
  const [ram, setRam] = useState('4');

  return (
    <div className="flex flex-col space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Workspace Settings</h2>
        <p className="text-muted-foreground mt-1">Configure runtime specifications and lifecycle policies.</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">General Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Workspace Name</label>
              <Input 
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Auto Sleep (minutes)</label>
              <p className="text-xs text-muted-foreground mb-2">Workspace will automatically suspend after this period of inactivity.</p>
              <select 
                value={autoSleep}
                onChange={(e) => setAutoSleep(e.target.value)}
                className="flex h-9 w-full max-w-xs rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never (Persistent)</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
          <p className="text-sm text-muted-foreground mb-4">Adjust the hardware resources allocated to your workspace container. Requires a restart.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">CPU Cores ({cpu} vCPU)</label>
              <input 
                type="range" 
                min="1" max="8" step="1" 
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>8</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Memory ({ram} GB)</label>
              <input 
                type="range" 
                min="2" max="16" step="2" 
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2</span>
                <span>16</span>
              </div>
            </div>
          </div>
          <Button variant="outline">
            Apply Resources & Restart
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/20 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-destructive/10 px-6 py-4 border-b border-destructive/20">
            <h3 className="text-lg font-semibold text-destructive flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> Danger Zone
            </h3>
          </div>
          <div className="bg-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Restart Workspace</h4>
                <p className="text-sm text-muted-foreground mt-1">Gracefully restart all running processes and containers.</p>
              </div>
              <Button variant="outline">
                <PowerOff className="w-4 h-4 mr-2" /> Restart
              </Button>
            </div>
            <div className="h-px bg-border w-full" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Delete Workspace</h4>
                <p className="text-sm text-muted-foreground mt-1">Permanently remove this workspace and all uncommitted files. This cannot be undone.</p>
              </div>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Workspace
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
