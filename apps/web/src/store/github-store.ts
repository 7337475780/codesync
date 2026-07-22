import { create } from 'zustand';
import { GithubAccount, GithubOrganization } from '@/lib/github/types';

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
      const res = await fetch('/api/github/account');
      if (!res.ok) throw new Error('Failed to fetch account');
      const account = await res.json();
      set({ account, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchOrganizations: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/github/organizations');
      if (!res.ok) throw new Error('Failed to fetch organizations');
      const orgs = await res.json();
      set({ organizations: orgs, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setActiveOrganization: (id) => set({ activeOrganizationId: id }),
}));
