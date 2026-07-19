'use client';

import React, { useState } from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { updatePreferences } from '@/actions/settings';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AppearanceSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await updatePreferences({ theme: selectedTheme });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to update appearance');
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
        title="Appearance" 
        description="Customize the look and feel of your dashboard. Switch between light and dark themes."
      />
      
      <div className="space-y-8">
        <Card className="p-6">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">Theme</label>
                <p className="text-[0.8rem] text-muted-foreground">
                  Select the theme for the dashboard.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <button type="button" onClick={() => setSelectedTheme('light')} className={`items-center rounded-md border-2 p-1 ${selectedTheme === 'light' ? 'border-primary' : 'border-muted hover:border-primary/50'}`}>
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal text-sm">Light</span>
                </button>
                <button type="button" onClick={() => setSelectedTheme('dark')} className={`items-center rounded-md border-2 bg-popover p-1 ${selectedTheme === 'dark' ? 'border-primary' : 'border-muted hover:border-primary/50'}`}>
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal text-sm">Dark</span>
                </button>
                <button type="button" onClick={() => setSelectedTheme('system')} className={`items-center rounded-md border-2 bg-popover p-1 ${selectedTheme === 'system' ? 'border-primary' : 'border-muted hover:border-primary/50'}`}>
                  <div className="space-y-2 rounded-sm bg-slate-100 p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-200" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal text-sm">System</span>
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-start">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating</> : 'Update preferences'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
