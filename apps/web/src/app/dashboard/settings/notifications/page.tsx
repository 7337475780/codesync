'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function NotificationsSettingsPage() {
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
        toast.error('Failed to update notifications');
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
        title="Notifications" 
        description="Configure how you receive notifications."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium">Email Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">Communication emails</label>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                </div>
                <input name="email_comm" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">Marketing emails</label>
                  <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
                </div>
                <input name="email_marketing" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none">Security emails</label>
                  <p className="text-sm text-muted-foreground">Receive emails about your account security and usage.</p>
                </div>
                <input name="email_security" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked disabled />
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium leading-none">Direct messages</label>
                    <p className="text-sm text-muted-foreground">Get notified when someone sends you a message.</p>
                  </div>
                  <input name="push_dm" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium leading-none">Mentions</label>
                    <p className="text-sm text-muted-foreground">Get notified when someone mentions you in a PR or issue.</p>
                  </div>
                  <input name="push_mentions" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-start">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating</> : 'Update notifications'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
