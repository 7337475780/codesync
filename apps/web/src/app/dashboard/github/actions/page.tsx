"use client";

import React, { useEffect, useState } from 'react';
import { useGithubStore } from '@/store/github-store';
import { PlayCircle, CheckCircle, XCircle } from 'lucide-react';
import { GithubLoading } from '@/components/github/github-loading';

export default function GlobalActionsPage() {
  const { account, fetchAccount } = useGithubStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount().finally(() => setLoading(false));
  }, [fetchAccount]);

  if (loading) return <GithubLoading text="Loading Actions..." />;
  
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <PlayCircle className="w-16 h-16 text-text-muted mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect GitHub</h2>
        <p className="text-text-muted max-w-md mb-6">You need to connect your GitHub account to view actions.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary" />
            Global Actions
          </h2>
          <p className="text-text-muted">CI/CD workflows across all your connected repositories</p>
        </div>
      </div>
      
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        <div className="p-12 text-center text-text-muted flex flex-col items-center">
          <PlayCircle className="w-12 h-12 mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-text-primary mb-1">No recent workflows</h3>
          <p>We couldn't find any recent workflow runs in your connected repositories.</p>
        </div>
      </div>
    </div>
  );
}
