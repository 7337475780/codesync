'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';
import { updateProfile } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updateProfile(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to update profile');
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
        title="Profile" 
        description="This is how others will see you on the site."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">Username</label>
              <Input id="username" name="username" defaultValue="tharun" className="max-w-md" required />
              <p className="text-[0.8rem] text-muted-foreground">
                This is your public display name. It can be your real name or a pseudonym.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" defaultValue="tharun@codesync.dev" className="max-w-md" required />
              <p className="text-[0.8rem] text-muted-foreground">
                You can manage verified email addresses in your email settings.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="bio">Bio</label>
              <textarea 
                id="bio"
                name="bio"
                className="flex min-h-[100px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xl"
                placeholder="Tell us a little bit about yourself"
                defaultValue="Building the future of development at CodeSync."
              />
            </div>

            <div className="pt-4 flex justify-end border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update profile'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
