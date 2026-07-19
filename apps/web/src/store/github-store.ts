import { create } from 'zustand';
import { GithubAccount, GithubOrganization } from '@/lib/github/types';
import { mockGitProvider } from '@/lib/github/mock-provider';

interface GithubState {
  account: GithubAccount | null;
  organizations: GithubOrganization[];
  isLoading: boolean;
  error: string | null;
  activeOrganizationId: string | null;
  
  fetchAccount: () => Promise<void>;
  fetchOrganizations: () => Promise<void>;
  setActiveOrganization: (id: string | null) => void;
}

export const useGithubStore = create<GithubState>((set, get) => ({
  account: null,
  organizations: [],
  isLoading: false,
  error: null,
  activeOrganizationId: null,

  fetchAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      const account = await mockGitProvider.getAccount();
      set({ account, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchOrganizations: async () => {
    set({ isLoading: true, error: null });
    try {
      const orgs = await mockGitProvider.getOrganizations();
      set({ organizations: orgs, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setActiveOrganization: (id) => set({ activeOrganizationId: id }),
}));
