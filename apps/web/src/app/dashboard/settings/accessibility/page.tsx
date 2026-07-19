import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';

export const metadata = {
  title: 'Accessibility Settings | CodeSync',
};

export default function AccessibilitySettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Accessibility" 
        description="Customize your accessibility preferences."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">Reduce Motion</label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions across the application.</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">High Contrast Mode</label>
                  <p className="text-sm text-muted-foreground">Increase contrast of colors for better readability.</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">Screen Reader Support</label>
                  <p className="text-sm text-muted-foreground">Optimize the interface for screen readers.</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              </div>
            </div>

            <div className="pt-4 flex justify-start">
              <Button>Save preferences</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
