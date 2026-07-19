"use client";

import React, { useEffect, useState } from 'react';
import { useGithubStore } from '@/store/github-store';
import { useRepositoryStore } from '@/store/repository-store';
import { GithubLoading } from '@/components/github/github-loading';
import { GithubEmptyState } from '@/components/github/github-empty-state';
import { RepositoryGrid } from '@/components/github/repository-grid';
import { BookMarked, Search, Filter } from 'lucide-react';
import { Input } from '@codesync/ui/components/ui/input';

export default function RepositoriesPage() {
  const { account, activeOrganizationId, isLoading: isAuthLoading } = useGithubStore();
  const { repositories, fetchRepositories, isLoading: isReposLoading } = useRepositoryStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // If activeOrganizationId is null, fetch user repos. Else org repos.
    if (!isAuthLoading) {
      fetchRepositories(activeOrganizationId || undefined);
    }
  }, [fetchRepositories, activeOrganizationId, isAuthLoading]);

  if (isAuthLoading || isReposLoading) {
    return <GithubLoading text="Loading repositories..." />;
  }

  if (!account) {
    return (
      <GithubEmptyState 
        icon={BookMarked}
        title="Connect GitHub"
        description="Connect your GitHub account to manage repositories."
        actionText="Connect Account"
        onAction={() => window.location.href = '/dashboard/github/connect'}
      />
    );
  }

  const filteredRepos = repositories.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 pb-12 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Repositories</h2>
          <p className="text-text-muted">Manage, sync, and launch workspaces from your GitHub repositories.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search repositories..." 
            aria-label="Search repositories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-surface"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-surface text-sm font-medium hover:bg-muted/50 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {filteredRepos.length > 0 ? (
        <RepositoryGrid repositories={filteredRepos} />
      ) : (
        <GithubEmptyState 
          icon={BookMarked}
          title="No repositories found"
          description={searchQuery ? "No repositories match your search query." : "You don't have any repositories yet."}
        />
      )}
    </div>
  );
}
