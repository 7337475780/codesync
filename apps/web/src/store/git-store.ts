import { create } from 'zustand';
import { GitProvider, GitFileChange, GitCommit, GitBranch } from '@/lib/git/types';
import { MockGitProvider } from '@/lib/git/providers/MockGitProvider';

interface GitState {
  provider: GitProvider;
  changes: GitFileChange[];
  commits: GitCommit[];
  branches: GitBranch[];
  isRefreshing: boolean;
  
  initialize: () => Promise<void>;
  refresh: () => Promise<void>;
  stage: (paths: string[]) => Promise<void>;
  unstage: (paths: string[]) => Promise<void>;
  commit: (message: string) => Promise<void>;
}

const mockProvider = new MockGitProvider();

export const useGitStore = create<GitState>((set, get) => ({
  provider: mockProvider,
  changes: [],
  commits: [],
  branches: [],
  isRefreshing: false,

  initialize: async () => {
    const { provider, refresh } = get();
    await provider.init();
    await refresh();
  },

  refresh: async () => {
    set({ isRefreshing: true });
    try {
      const { provider } = get();
      const [changes, commits, branches] = await Promise.all([
        provider.status(),
        provider.history(),
        provider.branches()
      ]);
      set({ changes, commits, branches });
    } finally {
      set({ isRefreshing: false });
    }
  },

  stage: async (paths) => {
    await get().provider.stage(paths);
    await get().refresh();
  },

  unstage: async (paths) => {
    await get().provider.unstage(paths);
    await get().refresh();
  },

  commit: async (message) => {
    await get().provider.commit(message);
    await get().refresh();
  }
}));
