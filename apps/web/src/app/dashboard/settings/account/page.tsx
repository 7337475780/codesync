'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { DangerZone } from '@/components/settings/danger-zone';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences, deleteAccount } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AccountSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updatePreferences(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to update account');
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
        title="Account" 
        description="Update your account settings. Set your preferred language and timezone."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <select name="language" className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[200px]">
                <option>English</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
              <p className="text-[0.8rem] text-muted-foreground">
                This is the language that will be used in the dashboard.
              </p>
            </div>

            <div className="pt-4 flex justify-start">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating</> : 'Update account'}
              </Button>
            </div>
          </form>
        </Card>

        <DangerZone 
          actions={[
            {
              title: 'Delete Account',
              description: 'Permanently delete your account and all associated data. This action cannot be undone.',
              buttonText: 'Delete Account',
              actionFn: deleteAccount
            }
          ]} 
        />
      </div>
    </div>
  );
}
