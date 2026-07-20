import { create } from 'zustand';
import { GitProvider, GitFileChange, GitCommit, GitBranch } from '@/lib/git/types';
import { ServerGitProvider } from '@/lib/git/providers/ServerGitProvider';

interface GitState {
  provider: GitProvider;
  changes: GitFileChange[];
  commits: GitCommit[];
  branches: GitBranch[];
  isRefreshing: boolean;
  
  initialize: (projectId?: string) => Promise<void>;
  refresh: () => Promise<void>;
  stage: (paths: string[]) => Promise<void>;
  unstage: (paths: string[]) => Promise<void>;
  commit: (message: string) => Promise<void>;
}

const serverProvider = new ServerGitProvider();

export const useGitStore = create<GitState>((set, get) => ({
  provider: serverProvider,
  changes: [],
  commits: [],
  branches: [],
  isRefreshing: false,

  initialize: async (projectId?: string) => {
    const { provider, refresh } = get();
    await provider.init(projectId);
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
