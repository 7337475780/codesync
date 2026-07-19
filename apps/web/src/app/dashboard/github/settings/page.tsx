"use client";

import React, { useEffect, useState } from 'react';
import { useGithubStore } from '@/store/github-store';
import { Settings, Github, Webhook, ShieldAlert } from 'lucide-react';
import { GithubLoading } from '@/components/github/github-loading';
import { Button } from '@codesync/ui/components/ui/button';

export default function GlobalSettingsPage() {
  const { account, fetchAccount } = useGithubStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount().finally(() => setLoading(false));
  }, [fetchAccount]);

  if (loading) return <GithubLoading text="Loading settings..." />;
  
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Settings className="w-16 h-16 text-text-muted mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect GitHub</h2>
        <p className="text-text-muted max-w-md mb-6">You need to connect your GitHub account to manage settings.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          GitHub Settings
        </h2>
        <p className="text-text-muted">Manage your GitHub integration and webhooks.</p>
      </div>
      
      <div className="grid gap-6">
        {/* Connected Account Section */}
        <div className="border border-border rounded-xl bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Github className="w-6 h-6 text-text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connected Account</h3>
                <p className="text-sm text-text-muted">You are currently connected to GitHub.</p>
              </div>
            </div>
            <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10" onClick={() => console.log('Disconnecting...')}>
              Disconnect
            </Button>
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="border border-border rounded-xl bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Webhook className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Webhooks</h3>
              <p className="text-sm text-text-muted">Manage webhooks for real-time synchronization.</p>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg p-4 border border-border">
            <p className="text-sm text-text-muted mb-4">Webhooks are automatically managed by CodeSync when you import a repository. You can force sync or recreate webhooks if they are failing.</p>
            <Button variant="outline" size="sm">Sync All Webhooks</Button>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="border border-border rounded-xl bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">OAuth Permissions</h3>
              <p className="text-sm text-text-muted">Review the permissions granted to CodeSync.</p>
            </div>
          </div>
          
          <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
            <li>Read access to code and metadata</li>
            <li>Read and write access to issues and pull requests</li>
            <li>Read access to actions and deployments</li>
            <li>Read and write access to repository webhooks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
