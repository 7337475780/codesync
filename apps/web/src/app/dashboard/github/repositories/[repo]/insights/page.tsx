"use client";

import React, { useEffect } from 'react';
import { useRepositoryStore } from '@/store/repository-store';
import { ContributionGraph } from '@/components/github/insights/contribution-graph';
import { LanguageBreakdown } from '@/components/github/insights/language-breakdown';
import { Shield, GitCommit } from 'lucide-react';
import { GithubLoading } from '@/components/github/github-loading';

export default function RepositoryInsightsPage({ params }: { params: { repo: string } }) {
  const decodedRepo = decodeURIComponent(params.repo);
  const { currentRepository, fetchRepository, isLoading } = useRepositoryStore();

  useEffect(() => {
    if (!currentRepository || currentRepository.fullName !== decodedRepo) {
      fetchRepository(decodedRepo);
    }
  }, [decodedRepo, currentRepository, fetchRepository]);

  if (isLoading || !currentRepository) {
    return <GithubLoading text="Loading Insights..." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContributionGraph />
          
          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>
            <div className="text-center py-8 text-text-muted">
              <p>Activity timeline will appear here.</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <LanguageBreakdown />
          
          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              Code Owners
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">/src/components/*</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-text-muted">@frontend-team</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">/src/api/*</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-text-muted">@backend-team</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">*</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-text-muted">@sarah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
