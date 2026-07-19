import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';

export const metadata = {
  title: 'Editor Settings | CodeSync',
};

export default function EditorSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Editor Settings" 
        description="Configure how the code editor behaves across your workspace."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Family</label>
                <Input defaultValue="'Fira Code', 'JetBrains Mono', monospace" />
                <p className="text-[0.8rem] text-muted-foreground">The font family used for code.</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size</label>
                <Input type="number" defaultValue="14" />
                <p className="text-[0.8rem] text-muted-foreground">Controls the font size in pixels.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tab Size</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option>2</option>
                  <option>4</option>
                  <option>8</option>
                </select>
                <p className="text-[0.8rem] text-muted-foreground">The number of spaces a tab is equal to.</p>
              </div>

              <div className="space-y-2 flex flex-col justify-center pt-6">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <label className="text-sm font-medium leading-none">Format on save</label>
                </div>
              </div>
              
              <div className="space-y-2 flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <label className="text-sm font-medium leading-none">Minimap enabled</label>
                </div>
              </div>
              
              <div className="space-y-2 flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" />
                  <label className="text-sm font-medium leading-none">Word wrap</label>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-border/50">
              <Button>Save editor settings</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
