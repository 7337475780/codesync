"use client";

import React, { useEffect, use } from 'react';
import { useGitDataStore } from '@/store/git-data-store';
import { CommitTimeline } from '@/components/github/commit-timeline';
import { GithubLoading } from '@/components/github/github-loading';

export default function CommitsPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = use(params);
  const decodedRepo = decodeURIComponent(repo);
  const { commits, fetchCommits, isLoadingCommits } = useGitDataStore();

  useEffect(() => {
    fetchCommits(decodedRepo);
  }, [fetchCommits, decodedRepo]);

  if (isLoadingCommits) {
    return <GithubLoading text="Loading commits..." />;
  }

  return (
    <div className="max-w-5xl space-y-6">
      <h3 className="text-xl font-bold">Commit History</h3>
      <CommitTimeline commits={commits} />
    </div>
  );
}
