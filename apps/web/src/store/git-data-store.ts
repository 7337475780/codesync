import { create } from 'zustand';
import { Branch, Commit, PullRequest, Contributor } from '@/lib/github/types';

interface GitDataState {
  branches: Branch[];
  commits: Commit[];
  pullRequests: PullRequest[];
  contributors: Contributor[];
  
  isLoadingBranches: boolean;
  isLoadingCommits: boolean;
  isLoadingPullRequests: boolean;
  isLoadingContributors: boolean;
  
  error: string | null;
  
  fetchBranches: (fullName: string) => Promise<void>;
  fetchCommits: (fullName: string, branch?: string) => Promise<void>;
  fetchPullRequests: (fullName: string) => Promise<void>;
  fetchContributors: (fullName: string) => Promise<void>;
}

export const useGitDataStore = create<GitDataState>((set) => ({
  branches: [],
  commits: [],
  pullRequests: [],
  contributors: [],

  isLoadingBranches: false,
  isLoadingCommits: false,
  isLoadingPullRequests: false,
  isLoadingContributors: false,

  error: null,

  fetchBranches: async (fullName) => {
    set({ isLoadingBranches: true, error: null });
    try {
      const res = await fetch(`/api/github/branches?fullName=${fullName}`);
      if (!res.ok) throw new Error('Failed to fetch branches');
      const branches = await res.json();
      set({ branches, isLoadingBranches: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingBranches: false });
    }
  },

  fetchCommits: async (fullName, branch) => {
    set({ isLoadingCommits: true, error: null });
    try {
      const url = branch 
        ? `/api/github/commits?fullName=${fullName}&branch=${branch}`
        : `/api/github/commits?fullName=${fullName}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch commits');
      const commits = await res.json();
      set({ commits, isLoadingCommits: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingCommits: false });
    }
  },

  fetchPullRequests: async (fullName) => {
    set({ isLoadingPullRequests: true, error: null });
    try {
      const res = await fetch(`/api/github/pulls?fullName=${fullName}`);
      if (!res.ok) throw new Error('Failed to fetch pull requests');
      const prs = await res.json();
      set({ pullRequests: prs, isLoadingPullRequests: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingPullRequests: false });
    }
  },

  fetchContributors: async (fullName) => {
    set({ isLoadingContributors: true, error: null });
    try {
      const res = await fetch(`/api/github/contributors?fullName=${fullName}`);
      if (!res.ok) throw new Error('Failed to fetch contributors');
      const contributors = await res.json();
      set({ contributors, isLoadingContributors: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingContributors: false });
    }
  }
}));
