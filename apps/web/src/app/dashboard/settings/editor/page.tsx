'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditorSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await updatePreferences(data);
      if (result.success) {
        toast.success(result.message || 'Editor preferences updated');
      } else {
        toast.error('Failed to update editor preferences');
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
        title="Editor" 
        description="Configure your IDE experience, including font size, formatting, and behavior."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Family</label>
                <select name="fontFamily" className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-md">
                  <option value="fira-code">Fira Code</option>
                  <option value="jetbrains-mono">JetBrains Mono</option>
                  <option value="cascadia-code">Cascadia Code</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size (px)</label>
                <input name="fontSize" type="number" defaultValue={14} className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm max-w-[100px]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tab Size</label>
                <select name="tabSize" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm max-w-[100px]">
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input name="formatOnSave" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <label className="text-sm font-medium leading-none">Format on save</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input name="minimap" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                  <label className="text-sm font-medium leading-none">Show minimap</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input name="wordWrap" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" />
                  <label className="text-sm font-medium leading-none">Enable word wrap</label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : 'Save editor settings'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
