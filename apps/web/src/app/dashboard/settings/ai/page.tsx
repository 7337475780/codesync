'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AISettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updatePreferences(data);
      if (result.success) {
        toast.success(result.message || 'AI preferences updated');
      } else {
        toast.error('Failed to update AI preferences');
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
        title="AI Assistant" 
        description="Configure your AI coding assistant preferences and models."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Model</label>
                <select name="aiModel" className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm max-w-md">
                  <option value="gpt-4o">GPT-4o (Default)</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                  <option value="gemini-1-5-pro">Gemini 1.5 Pro</option>
                </select>
                <p className="text-[0.8rem] text-muted-foreground">
                  This model will be used for chat and inline code generation.
                </p>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <input name="autocomplete" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Enable AI Autocomplete</label>
                    <p className="text-sm text-muted-foreground">Provide inline code suggestions as you type.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input name="contextSharing" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none">Share workspace context</label>
                    <p className="text-sm text-muted-foreground">Allow AI to index your workspace files for better suggestions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : 'Save AI settings'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
