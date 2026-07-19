'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Github } from 'lucide-react';

export default function GitHubSettingsPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
    toast.success('Successfully connected to GitHub');
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsConnected(false);
    setIsConnecting(false);
    toast.success('Disconnected from GitHub');
  };

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="GitHub Integration" 
        description="Manage your GitHub connection to import repositories and sync commits."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-secondary p-3 rounded-full">
                <Github className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-medium">GitHub Account</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Connect your GitHub account to enable automatic deployments and repository syncing.
                </p>
                {isConnected && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Connected as <strong className="text-foreground">@tharun</strong>
                  </div>
                )}
              </div>
            </div>

            <div>
              {isConnected ? (
                <Button variant="outline" onClick={handleDisconnect} disabled={isConnecting}>
                  {isConnecting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Disconnecting</> : 'Disconnect'}
                </Button>
              ) : (
                <Button onClick={handleConnect} disabled={isConnecting}>
                  {isConnecting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting</> : 'Connect GitHub'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
