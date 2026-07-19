import React from 'react';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Card } from '@codesync/ui/components/ui/card';
import { Button } from '@codesync/ui/components/ui/button';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'AI Settings | CodeSync',
};

export default function AiSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="AI Settings" 
        description="Configure your AI assistant preferences and models."
      />
      
      <div className="space-y-8">
        <Card className="p-6 border-primary/50 bg-primary/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">CodeSync Autopilot Active</h3>
              <p className="text-sm text-muted-foreground">You are using the Pro plan features.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Model Selection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 relative">
                  <div className="absolute top-2 right-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-lg">GPT-4 Turbo</h4>
                  <p className="text-sm text-muted-foreground mt-2">Best for complex reasoning and architecture planning. Highest quality generation.</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-primary/50 cursor-pointer transition-colors">
                  <h4 className="font-semibold text-lg">Claude 3.5 Sonnet</h4>
                  <p className="text-sm text-muted-foreground mt-2">Fastest generation, excellent for standard boilerplate and refactoring.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-medium">Privacy & Context</h3>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1 max-w-[80%]">
                  <label className="text-sm font-medium leading-none">Share analytics data</label>
                  <p className="text-sm text-muted-foreground">Allow CodeSync to use your prompts and generated code to improve the AI models (anonymized).</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1 max-w-[80%]">
                  <label className="text-sm font-medium leading-none">Global context</label>
                  <p className="text-sm text-muted-foreground">Allow the AI to read all files in your workspace for better contextual suggestions.</p>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-border/50">
              <Button>Save AI preferences</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
