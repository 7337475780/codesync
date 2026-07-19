import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Blocks } from 'lucide-react';

export const metadata = {
  title: 'Integrations | CodeSync',
};

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Integrations" 
        description="Connect CodeSync with your favorite tools."
      />
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[#4A154B] rounded-md flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Slack</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications in Slack</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Automatically send deployment status and code review requests to your team's Slack channels.
              </p>
            </div>
            <Button variant="outline" className="w-full">Connect</Button>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[#0052CC] rounded-md flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Jira</h3>
                  <p className="text-sm text-muted-foreground">Issue tracking</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Link commits and PRs to Jira issues automatically by referencing the issue key.
              </p>
            </div>
            <Button variant="outline" className="w-full">Connect</Button>
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[#5865F2] rounded-md flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Discord</h3>
                  <p className="text-sm text-muted-foreground">Community notifications</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Send webhooks to Discord channels for repository events.
              </p>
            </div>
            <Button variant="outline" className="w-full">Connect</Button>
          </Card>

          <Card className="p-6 flex flex-col justify-between border-dashed border-2 bg-transparent">
            <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Blocks className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Request an Integration</h3>
                <p className="text-sm text-muted-foreground mt-1">Don't see your favorite tool?</p>
              </div>
              <Button variant="ghost">Let us know</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
