import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';
import { Rocket, Plus, Trash } from 'lucide-react';

export const metadata = {
  title: 'Deployments Settings | CodeSync',
};

export default function DeploymentsSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Deployments" 
        description="Configure your deployment providers and environment variables."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Deployment Providers</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 flex flex-col justify-between h-[150px]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white">
                  <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-lg">Vercel</h4>
              </div>
              <Button variant="outline" className="w-full">Connect</Button>
            </div>

            <div className="border rounded-lg p-4 flex flex-col justify-between h-[150px]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#00C7B7] rounded-full flex items-center justify-center text-white">
                  <Rocket className="h-4 w-4" />
                </div>
                <h4 className="font-semibold text-lg">Netlify</h4>
              </div>
              <Button variant="outline" className="w-full">Connect</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Environment Variables</h3>
              <p className="text-sm text-muted-foreground mt-1">Shared environment variables for all deployments.</p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Variable
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input defaultValue="NEXT_PUBLIC_API_URL" className="font-mono flex-1" />
              <Input type="password" defaultValue="https://api.codesync.dev" className="font-mono flex-1" />
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Input defaultValue="DATABASE_URL" className="font-mono flex-1" />
              <Input type="password" defaultValue="postgres://..." className="font-mono flex-1" />
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="pt-4 flex justify-end">
              <Button>Save variables</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
