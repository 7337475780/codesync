'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AccessibilitySettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updatePreferences(data);
      if (result.success) {
        toast.success(result.message || 'Accessibility preferences updated');
      } else {
        toast.error('Failed to update preferences');
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
        title="Accessibility" 
        description="Configure CodeSync to be more accessible and comfortable for you."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="pt-2 space-y-4">
                <div className="flex items-start space-x-3">
                  <input name="reduceMotion" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Reduce motion</label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions throughout the interface.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input name="highContrast" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">High contrast mode</label>
                    <p className="text-sm text-muted-foreground">Increase the contrast of borders, text, and active elements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input name="screenReader" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Screen reader optimization</label>
                    <p className="text-sm text-muted-foreground">Optimize the IDE output for screen readers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : 'Save preferences'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
