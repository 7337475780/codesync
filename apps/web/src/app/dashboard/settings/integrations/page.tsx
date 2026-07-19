'use client';

import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Slack, Webhook, Database, LayoutDashboard } from 'lucide-react';

const integrations = [
  { name: 'Slack', description: 'Receive deployment notifications in your channels.', icon: Slack, connected: false },
  { name: 'Linear', description: 'Link issues to your branches and commits.', icon: LayoutDashboard, connected: true },
  { name: 'PlanetScale', description: 'Sync database schemas across environments.', icon: Database, connected: false },
  { name: 'Webhooks', description: 'Trigger custom endpoints on workspace events.', icon: Webhook, connected: true },
];

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Integrations" 
        description="Connect CodeSync with your favorite third-party services."
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {integrations.map((app, i) => (
          <Card key={i} className="p-6 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-secondary p-3 rounded-lg border border-border/50">
                <app.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{app.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              {app.connected ? (
                <Button variant="outline" className="text-muted-foreground">Manage</Button>
              ) : (
                <Button>Connect</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
