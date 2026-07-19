import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Key, Copy, Plus } from 'lucide-react';

export const metadata = {
  title: 'API Keys | CodeSync',
};

export default function ApiKeysSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="API Keys" 
        description="Manage your API keys for programmatic access to CodeSync."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Personal Access Tokens</h3>
              <p className="text-sm text-muted-foreground mt-1">Tokens you have generated that can be used to access the CodeSync API.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate new token
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Key className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">CLI Development</p>
                  <p className="text-xs text-muted-foreground">Created yesterday • Never used</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground font-mono">
                  cs_live_*************
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive h-8">
                  Revoke
                </Button>
              </div>
            </div>
            
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Key className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">CI/CD Pipeline Token</p>
                  <p className="text-xs text-muted-foreground">Created 2 months ago • Last used 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground font-mono">
                  cs_live_*************
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive h-8">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
