"use client";

import React from 'react';
import { Settings, Save } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export default function DeploymentsSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold">Deployment Settings</h2>
        <p className="text-sm text-text-muted mt-1">Configure build commands, root directories, and node versions.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label className="block font-medium">Build Command</label>
            <p className="text-xs text-text-muted mb-2">The command your framework uses to build your app.</p>
            <input 
              type="text" 
              defaultValue="npm run build"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Output Directory</label>
            <p className="text-xs text-text-muted mb-2">The directory in which your compiled frontend will be located.</p>
            <input 
              type="text" 
              defaultValue=".next"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Install Command</label>
            <p className="text-xs text-text-muted mb-2">The command that is used to install your Project's software dependencies.</p>
            <input 
              type="text" 
              defaultValue="npm install"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <label className="block font-medium">Node.js Version</label>
            <p className="text-xs text-text-muted mb-2">The Node.js version to be used by the build container.</p>
            <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
              <option value="20.x">20.x (Latest)</option>
              <option value="18.x">18.x (LTS)</option>
              <option value="16.x">16.x</option>
            </select>
          </div>

        </div>
        <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
          <Button>
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
