"use client";

import React, { useEffect, use } from 'react';
import { useGitDataStore } from '@/store/git-data-store';
import { ContributorGrid } from '@/components/github/contributor-grid';
import { GithubLoading } from '@/components/github/github-loading';

export default function ContributorsPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = use(params);
  const decodedRepo = decodeURIComponent(repo);
  const { contributors, fetchContributors, isLoadingContributors } = useGitDataStore();

  useEffect(() => {
    fetchContributors(decodedRepo);
  }, [fetchContributors, decodedRepo]);

  if (isLoadingContributors) {
    return <GithubLoading text="Loading contributors..." />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Contributors</h3>
      <ContributorGrid contributors={contributors} />
    </div>
  );
}
