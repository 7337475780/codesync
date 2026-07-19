'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function DeploymentsSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updatePreferences(data);
      if (result.success) {
        toast.success(result.message || 'Deployment settings updated');
      } else {
        toast.error('Failed to update deployment settings');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Deployments" 
        description="Configure auto-deployment rules and default branch settings."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="pt-2 space-y-4">
                <div className="flex items-start space-x-3">
                  <input name="autoDeploy" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Auto-deploy on push</label>
                    <p className="text-sm text-muted-foreground">Automatically trigger a deployment when pushing to production branches.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input name="previewEnvs" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Preview Environments</label>
                    <p className="text-sm text-muted-foreground">Automatically create preview deployments for pull requests.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                <label className="text-sm font-medium">Production Branch</label>
                <select name="productionBranch" className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm max-w-md">
                  <option value="main">main</option>
                  <option value="master">master</option>
                  <option value="production">production</option>
                </select>
                <p className="text-[0.8rem] text-muted-foreground">
                  The branch that serves the live production deployment.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : 'Save settings'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
