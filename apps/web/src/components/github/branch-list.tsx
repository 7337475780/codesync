import React from 'react';
import { Branch } from '@/lib/github/types';
import { GitBranch, Shield, GitCommit } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export const BranchList = ({ branches }: { branches: Branch[] }) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
        <h3 className="font-semibold">Branches</h3>
        <Button size="sm">New Branch</Button>
      </div>
      <div className="divide-y divide-border">
        {branches.map(branch => (
          <div key={branch.name} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{branch.name}</span>
                  {branch.isDefault && (
                    <span className="px-2 py-0.5 rounded-full border border-border bg-muted text-[10px] font-medium uppercase">
                      Default
                    </span>
                  )}
                  {branch.protected && (
                    <span className="flex items-center text-xs text-text-muted" title="Protected branch">
                      <Shield className="w-3 h-3 mr-1" /> Protected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                  <GitCommit className="w-3 h-3" />
                  <span className="font-mono">{branch.commit.sha.substring(0, 7)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">Switch</Button>
              {!branch.isDefault && (
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Delete</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
