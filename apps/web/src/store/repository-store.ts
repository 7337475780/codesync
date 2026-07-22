import { create } from 'zustand';
import { Repository } from '@/lib/github/types';

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
      const url = org ? `/api/repositories?org=${org}` : '/api/repositories';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const repos = await res.json();
      set({ repositories: repos, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchRepository: async (fullName) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/repositories?fullName=${fullName}`);
      if (!res.ok) throw new Error('Failed to fetch repository');
      const repos = await res.json();
      const repo = repos[0];
      if (!repo) throw new Error('Repository not found');
      set({ currentRepository: repo, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
