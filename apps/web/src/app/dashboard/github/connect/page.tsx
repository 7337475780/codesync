import React from 'react';
import { Github, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export default function GithubConnectPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-card border border-border rounded-xl p-10 max-w-lg w-full shadow-sm text-center">
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
            <span className="font-bold text-3xl text-primary">C</span>
          </div>
          <LinkIcon className="w-6 h-6 text-text-muted" />
          <div className="w-16 h-16 bg-surface-elevated border border-border rounded-2xl flex items-center justify-center">
            <Github className="w-8 h-8 text-text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">Connect your GitHub Account</h2>
        <p className="text-text-muted mb-8">
          By connecting your GitHub account, you can easily import repositories, manage branches, and launch workspaces directly from your codebase.
        </p>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-success" />
            </div>
            <span className="text-sm text-text-secondary">Read and write access to your repositories</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-success" />
            </div>
            <span className="text-sm text-text-secondary">Access to organizations where you are a member</span>
          </div>
        </div>

        <Button className="w-full h-12 text-base font-semibold" onClick={() => window.location.href = '/dashboard/github'}>
          <Github className="w-5 h-5 mr-2" /> Authorize CodeSync
        </Button>
      </div>
    </div>
  );
}
