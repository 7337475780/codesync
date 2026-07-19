import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Github, Link as LinkIcon, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'GitHub Settings | CodeSync',
};

export default function GithubSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="GitHub Integration" 
        description="Connect your GitHub account to sync repositories and manage deployments."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-3 rounded-full">
                <Github className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Connected to GitHub</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connected as <strong>@tharun</strong>
                </p>
              </div>
            </div>
            <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive">
              Disconnect
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg">Connected Repositories</h4>
              <Button size="sm">
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect Repository
              </Button>
            </div>

            <div className="rounded-md border divide-y">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <a href="#" className="font-medium text-primary hover:underline flex items-center gap-1">
                    codesync/web-client
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Last synced 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <a href="#" className="font-medium text-primary hover:underline flex items-center gap-1">
                    codesync/api-server
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Last synced 5 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
