"use client";

import React from 'react';
import { useRepositoryStore } from '@/store/repository-store';
import { Star, GitFork, Eye, CircleDot, Box, Code2, Clock } from 'lucide-react';
import { Button } from '@codesync/ui/components/ui/button';

export default function RepositoryOverviewPage() {
  const { currentRepository: repo } = useRepositoryStore();

  if (!repo) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Code2 className="w-4 h-4 text-text-muted" /> README.md
            </div>
          </div>
          <div className="p-8 prose prose-invert max-w-none">
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
            <hr />
            <h2>Quick Start</h2>
            <pre><code>git clone {repo.url}.git{'\n'}cd {repo.name}{'\n'}npm install{'\n'}npm run dev</code></pre>
            <p>This is a simulated README preview for the repository.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl shadow-sm p-5 space-y-6">
          <Button className="w-full h-10">
            Import to Workspace
          </Button>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">About</h3>
            <p className="text-sm text-text-muted">{repo.description || 'No description provided.'}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-text-secondary">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-text-muted" /> {repo.stargazersCount} stars</span>
              <span className="flex items-center gap-2"><Eye className="w-4 h-4 text-text-muted" /> {repo.watchersCount} watching</span>
              <span className="flex items-center gap-2"><GitFork className="w-4 h-4 text-text-muted" /> {repo.forksCount} forks</span>
              <span className="flex items-center gap-2"><CircleDot className="w-4 h-4 text-text-muted" /> {repo.openIssuesCount} issues</span>
            </div>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="font-semibold mb-3 text-sm">Environment</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Language</span>
                <span className="font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {repo.language || 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Framework</span>
                <span className="font-medium flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-text-muted" />
                  {repo.framework || 'None'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Default Branch</span>
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                  {repo.defaultBranch}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="font-semibold mb-3 text-sm">Activity</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between text-text-muted">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Updated</span>
                <span>{new Date(repo.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
