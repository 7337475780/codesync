'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Input } from '@codesync/ui/components/ui/input';
import { Button } from '@codesync/ui/components/ui/button';
import { updateSecurity } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updateSecurity(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to update security settings');
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
        title="Security" 
        description="Manage your password, two-factor authentication, and active sessions."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input name="currentPassword" type="password" placeholder="••••••••" className="max-w-md" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input name="newPassword" type="password" placeholder="••••••••" className="max-w-md" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input name="confirmPassword" type="password" placeholder="••••••••" className="max-w-md" required />
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating</> : 'Update password'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
