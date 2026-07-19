import { create } from 'zustand';
import { Branch, Commit, PullRequest, Contributor } from '@/lib/github/types';
import { mockGitProvider } from '@/lib/github/mock-provider';

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
      const branches = await mockGitProvider.getBranches(fullName);
      set({ branches, isLoadingBranches: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingBranches: false });
    }
  },

  fetchCommits: async (fullName, branch) => {
    set({ isLoadingCommits: true, error: null });
    try {
      const commits = await mockGitProvider.getCommits(fullName, branch);
      set({ commits, isLoadingCommits: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingCommits: false });
    }
  },

  fetchPullRequests: async (fullName) => {
    set({ isLoadingPullRequests: true, error: null });
    try {
      const prs = await mockGitProvider.getPullRequests(fullName);
      set({ pullRequests: prs, isLoadingPullRequests: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingPullRequests: false });
    }
  },

  fetchContributors: async (fullName) => {
    set({ isLoadingContributors: true, error: null });
    try {
      const contributors = await mockGitProvider.getContributors(fullName);
      set({ contributors, isLoadingContributors: false });
    } catch (err: any) {
      set({ error: err.message, isLoadingContributors: false });
    }
  }
}));
