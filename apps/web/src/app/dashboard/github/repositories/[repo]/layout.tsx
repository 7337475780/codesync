"use client";

import React, { useEffect, use, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRepositoryStore } from '@/store/repository-store';
import { GithubLoading } from '@/components/github/github-loading';
import { GithubEmptyState } from '@/components/github/github-empty-state';
import { BookMarked, GitBranch, GitCommit, GitPullRequest, Users, Settings, Activity, BarChart } from 'lucide-react';

export default function RepositoryLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ repo: string }>;
}) {
  const { repo } = use(params);
  const decodedRepo = decodeURIComponent(repo);
  const pathname = usePathname();
  const { currentRepository, fetchRepository, isLoading, error } = useRepositoryStore();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchRepository(decodedRepo);
  }, [fetchRepository, decodedRepo]);

  if (isLoading) {
    return <GithubLoading text="Loading repository..." />;
  }

  if (error || !currentRepository) {
    return (
      <GithubEmptyState 
        icon={BookMarked}
        title="Repository not found"
        description="The repository you are looking for does not exist or you don't have access to it."
        actionText="Back to Repositories"
        onAction={() => window.location.href = '/dashboard/github/repositories'}
      />
    );
  }

  const navItems = [
    { name: 'Overview', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}`, icon: Activity, exact: true },
    { name: 'Branches', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/branches`, icon: GitBranch },
    { name: 'Commits', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/commits`, icon: GitCommit },
    { name: 'Pull Requests', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/pull-requests`, icon: GitPullRequest },
    { name: 'Contributors', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/contributors`, icon: Users },
    { name: 'Insights', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/insights`, icon: BarChart },
    { name: 'Settings', href: `/dashboard/github/repositories/${encodeURIComponent(decodedRepo)}/settings`, icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <div className={`w-12 h-12 shrink-0 rounded-lg border border-border flex items-center justify-center overflow-hidden ${imageError || !currentRepository.owner.avatarUrl ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
          {!imageError && currentRepository.owner.avatarUrl ? (
            <img 
              src={currentRepository.owner.avatarUrl} 
              alt={currentRepository.owner.login} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="font-bold text-xl">{currentRepository.owner.login.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{currentRepository.name}</h2>
          <p className="text-text-muted flex items-center gap-2">
            <span>{currentRepository.owner.login}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wide ${currentRepository.private ? 'border-warning/30 text-warning bg-warning/10' : 'border-success/30 text-success bg-success/10'}`}>
              {currentRepository.private ? 'Private' : 'Public'}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-end gap-2 border-b border-border overflow-x-auto scrollbar-hide shrink-0 pt-2">
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 mb-[-1px] transition-colors whitespace-nowrap text-sm font-medium ${
                isActive 
                  ? 'border-primary text-text-primary' 
                  : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
