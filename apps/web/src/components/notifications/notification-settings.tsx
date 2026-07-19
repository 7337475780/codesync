"use client";

import React, { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export const NotificationSettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setOpen(true)}>
        <Settings2 className="w-4 h-4" />
        <span className="hidden sm:inline">Preferences</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-[425px] rounded-xl border border-border bg-card p-6 shadow-lg sm:rounded-lg">
            <button 
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            
            <div className="flex flex-col space-y-1.5 mb-4 text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Notification Preferences</h2>
              <p className="text-sm text-text-muted">Choose what you want to be notified about.</p>
            </div>
            
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="mentions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mentions</label>
                  <span className="text-xs text-text-muted">Notify when someone mentions you.</span>
                </div>
                <input type="checkbox" id="mentions" defaultChecked className="w-4 h-4 rounded border-border" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="deployments" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Deployments</label>
                  <span className="text-xs text-text-muted">Status of your active deployments.</span>
                </div>
                <input type="checkbox" id="deployments" defaultChecked className="w-4 h-4 rounded border-border" />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ai" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">AI Insights</label>
                  <span className="text-xs text-text-muted">Automated code reviews and suggestions.</span>
                </div>
                <input type="checkbox" id="ai" defaultChecked className="w-4 h-4 rounded border-border" />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="github" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">GitHub Activity</label>
                  <span className="text-xs text-text-muted">Pull requests, issues, and merges.</span>
                </div>
                <input type="checkbox" id="github" defaultChecked className="w-4 h-4 rounded border-border" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
