"use client";

import React from 'react';
import { GithubImportWizard } from '@/components/github/github-import-wizard';

export default function ImportPage() {
  return (
    <div className="flex flex-col space-y-6 pb-12 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Import Repository</h2>
          <p className="text-text-muted">Import a repository from GitHub to configure and launch a new workspace.</p>
        </div>
      </div>

      <GithubImportWizard />
    </div>
  );
}
