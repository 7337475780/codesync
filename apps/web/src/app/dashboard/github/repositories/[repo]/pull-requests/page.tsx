"use client";

import React, { useEffect, use } from 'react';
import { useGitDataStore } from '@/store/git-data-store';
import { PullRequestList } from '@/components/github/pull-request-list';
import { GithubLoading } from '@/components/github/github-loading';

export default function PullRequestsPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = use(params);
  const decodedRepo = decodeURIComponent(repo);
  const { pullRequests, fetchPullRequests, isLoadingPullRequests } = useGitDataStore();

  useEffect(() => {
    fetchPullRequests(decodedRepo);
  }, [fetchPullRequests, decodedRepo]);

  if (isLoadingPullRequests) {
    return <GithubLoading text="Loading pull requests..." />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <PullRequestList pullRequests={pullRequests} />
    </div>
  );
}
