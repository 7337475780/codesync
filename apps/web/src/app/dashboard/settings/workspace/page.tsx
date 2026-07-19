'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { DangerZone } from '@/components/settings/danger-zone';
import { Card } from '@codesync/ui/components/ui/card';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';
import { updateWorkspace } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function WorkspaceSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updateWorkspace(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to update workspace');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeaveWorkspace = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, message: 'You have left the workspace' };
  };

  const handleDeleteWorkspace = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, message: 'Workspace deleted successfully' };
  };

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Workspace" 
        description="Manage your workspace settings and team members."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace Name</label>
              <Input name="name" defaultValue="Acme Corp" className="max-w-md" required />
              <p className="text-[0.8rem] text-muted-foreground">
                This is your workspace's visible name within CodeSync.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace Slug</label>
              <Input name="slug" defaultValue="acme-corp" className="max-w-md" required />
              <p className="text-[0.8rem] text-muted-foreground">
                This is your workspace's URL namespace on CodeSync.
              </p>
            </div>

            <div className="pt-4 flex justify-end border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : 'Save changes'}
              </Button>
            </div>
          </form>
        </Card>

        <DangerZone 
          actions={[
            {
              title: 'Leave Workspace',
              description: 'Revoke your access to this workspace. Any resources you created will remain.',
              buttonText: 'Leave Workspace',
              actionFn: handleLeaveWorkspace
            },
            {
              title: 'Delete Workspace',
              description: 'Permanently remove your workspace and all of its contents from the CodeSync platform.',
              buttonText: 'Delete Workspace',
              actionFn: handleDeleteWorkspace
            }
          ]} 
        />
      </div>
    </div>
  );
}
