"use client";

import React, { useEffect, use } from 'react';
import { useGitDataStore } from '@/store/git-data-store';
import { BranchList } from '@/components/github/branch-list';
import { GithubLoading } from '@/components/github/github-loading';

export default function BranchesPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo } = use(params);
  const decodedRepo = decodeURIComponent(repo);
  const { branches, fetchBranches, isLoadingBranches } = useGitDataStore();

  useEffect(() => {
    fetchBranches(decodedRepo);
  }, [fetchBranches, decodedRepo]);

  if (isLoadingBranches) {
    return <GithubLoading text="Loading branches..." />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <BranchList branches={branches} />
    </div>
  );
}
