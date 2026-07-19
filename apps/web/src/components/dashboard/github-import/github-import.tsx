import React from 'react';
import { useGitHubImportStore } from '@/store/github-import-store';
import { Button } from '@codesync/ui/components/ui/button';
import { Github } from 'lucide-react';

export const GitHubImport = () => {
  const { currentStep, setStep, isOpen, setIsOpen } = useGitHubImportStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border p-8 text-center">
        
        {currentStep === 'connect' && (
          <div className="space-y-6 py-12">
            <Github className="w-16 h-16 mx-auto text-muted-foreground" />
            <h2 className="text-3xl font-bold">Import from GitHub</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connect your GitHub account to import repositories into CodeSync. We'll automatically detect your framework and configure the optimal runtime environment.
            </p>
            <Button size="lg" onClick={() => setStep('select_org')}>
              <Github className="mr-2 h-5 w-5" />
              Connect GitHub Account
            </Button>
          </div>
        )}

        {currentStep === 'select_org' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-left">Select Organization</h3>
            {/* List of orgs would go here */}
            <div className="grid gap-4">
              <Button variant="outline" className="justify-start h-16" onClick={() => setStep('select_repo')}>
                <img src="https://github.com/tharu.png" alt="Avatar" className="w-8 h-8 rounded-full mr-4" />
                Personal Account
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'select_repo' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-left">Select Repository</h3>
            <div className="grid gap-4 text-left">
              <Button variant="outline" className="justify-start h-16 flex-col items-start p-4" onClick={() => setStep('configure')}>
                <span className="font-semibold">codesync-web</span>
                <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'configure' && (
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold">Configure Workspace</h3>
            <div className="bg-muted p-4 rounded-xl space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Detected Framework</span>
                <p className="text-lg">Next.js</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Branch</span>
                <p className="text-lg">main</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setStep('importing')}>Import & Create Workspace</Button>
            </div>
          </div>
        )}

        {currentStep === 'importing' && (
          <div className="space-y-6 py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <h3 className="text-2xl font-bold">Provisioning Workspace...</h3>
            <p className="text-muted-foreground">Analyzing code, resolving dependencies, and preparing your IDE.</p>
          </div>
        )}

      </div>
    </div>
  );
};
