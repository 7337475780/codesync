import { create } from 'zustand';
import { Repository } from '@/lib/github/types';
import { mockGitProvider } from '@/lib/github/mock-provider';

interface RepositoryState {
  repositories: Repository[];
  currentRepository: Repository | null;
  isLoading: boolean;
  error: string | null;
  
  fetchRepositories: (org?: string) => Promise<void>;
  fetchRepository: (fullName: string) => Promise<void>;
}

export const useRepositoryStore = create<RepositoryState>((set) => ({
  repositories: [],
  currentRepository: null,
  isLoading: false,
  error: null,

  fetchRepositories: async (org) => {
    set({ isLoading: true, error: null });
    try {
      const repos = await mockGitProvider.getRepositories(org);
      set({ repositories: repos, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchRepository: async (fullName) => {
    set({ isLoading: true, error: null });
    try {
      const repo = await mockGitProvider.getRepository(fullName);
      set({ currentRepository: repo, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
