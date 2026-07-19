"use client";

import React, { useState } from 'react';
import { Button } from '@codesync/ui/components/ui/button';
import { Input } from '@codesync/ui/components/ui/input';
import { Github, Link as LinkIcon, Settings, CheckCircle2 } from 'lucide-react';

export const GithubImportWizard = () => {
  const [step, setStep] = useState(1);
  const [repoUrl, setRepoUrl] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm max-w-2xl mx-auto overflow-hidden">
      <div className="flex border-b border-border bg-muted/50">
        {[
          { num: 1, label: 'Select Source' },
          { num: 2, label: 'Configure' },
          { num: 3, label: 'Analyze' },
          { num: 4, label: 'Ready' }
        ].map(s => (
          <div key={s.num} className={`flex-1 py-4 text-center text-sm font-medium border-b-2 ${step >= s.num ? 'border-primary text-primary bg-muted' : 'border-transparent text-text-muted'}`}>
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full mr-2 text-xs ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-text-muted'}`}>
              {s.num}
            </span>
            {s.label}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Import a Git Repository</h3>
            <p className="text-text-muted text-sm mb-4">Paste a URL from GitHub, GitLab, or Bitbucket, or search your connected organizations.</p>
            
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input 
                  placeholder="https://github.com/organization/repo" 
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="pl-9"
                  aria-label="Repository URL"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl">
              <Github className="w-8 h-8 text-text-muted mb-3" />
              <p className="text-sm font-medium">Browse connected GitHub account</p>
              <Button variant="link" className="text-primary mt-1">Select from your repositories</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Configure Workspace</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-primary">Workspace Name</label>
                <Input 
                  placeholder="e.g., my-awesome-project" 
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  aria-label="Workspace Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-primary">Framework Preset</label>
                  <select className="w-full h-10 px-3 py-2 bg-surface border border-border rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Framework Preset">
                    <option>Auto-detect (Next.js)</option>
                    <option>React</option>
                    <option>Vue</option>
                    <option>Node.js</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-primary">Root Directory</label>
                  <Input placeholder="./" defaultValue="./" aria-label="Root Directory" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h3 className="text-xl font-bold">Analyzing Repository...</h3>
            <p className="text-text-muted text-sm">We are scanning the codebase to determine the best environment settings, required dependencies, and optimal build commands.</p>
            <div className="max-w-xs mx-auto space-y-2 mt-6 text-left">
              <div className="flex items-center gap-2 text-sm text-success"><CheckCircle2 className="w-4 h-4" /> Found Next.js configuration</div>
              <div className="flex items-center gap-2 text-sm text-success"><CheckCircle2 className="w-4 h-4" /> Detected pnpm-lock.yaml</div>
              <div className="flex items-center gap-2 text-sm text-success"><CheckCircle2 className="w-4 h-4" /> Node 20.x environment required</div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold">Ready to Provision</h3>
            <p className="text-text-muted text-sm">Your repository has been successfully analyzed and is ready to be launched into a cloud workspace.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-muted/30 flex justify-between">
        <Button variant="ghost" onClick={handleBack} disabled={step === 1 || step === 4}>Back</Button>
        {step < 4 ? (
          <Button onClick={handleNext} disabled={step === 1 && !repoUrl}>
            {step === 3 ? 'Complete Analysis' : 'Next Step'}
          </Button>
        ) : (
          <Button className="bg-success text-success-foreground hover:bg-success/90">Launch Workspace</Button>
        )}
      </div>
    </div>
  );
};
