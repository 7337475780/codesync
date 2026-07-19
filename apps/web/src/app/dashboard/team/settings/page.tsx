'use client';

import React from 'react';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { AlertTriangle, Building2, Upload } from 'lucide-react';

export default function OrganizationSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organization Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your organization profile, billing email, and domains.</p>
        </div>
      </div>
      
      <div className="space-y-8">
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-bold mb-6 border-b border-border/50 pb-4">General Profile</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-secondary rounded-xl flex items-center justify-center border border-border">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">Recommended size: 256x256px</p>
              </div>
            </div>
            
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">Organization Name</label>
              <input type="text" defaultValue="Acme Corp" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">Billing Email</label>
              <input type="email" defaultValue="billing@acme.corp" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm" />
              <p className="text-xs text-muted-foreground">Invoices will be sent to this email.</p>
            </div>
            
            <div>
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-6 border-b border-destructive/10 pb-4">
            Irreversible and destructive actions for your organization.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Transfer Ownership</h4>
                <p className="text-sm text-muted-foreground">Transfer this organization to another user.</p>
              </div>
              <Button variant="outline">Transfer</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Delete Organization</h4>
                <p className="text-sm text-muted-foreground">Permanently delete this organization and all data.</p>
              </div>
              <Button variant="destructive">Delete Organization</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
