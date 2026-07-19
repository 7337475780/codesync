import { create } from 'zustand';
import { CustomDomain } from '../types/domain';

interface DomainsState {
  domains: CustomDomain[];
  isLoading: boolean;
  
  setDomains: (domains: CustomDomain[]) => void;
  addDomain: (domain: CustomDomain) => void;
  removeDomain: (id: string) => void;
  updateDomain: (id: string, updates: Partial<CustomDomain>) => void;
}

export const useDomainsStore = create<DomainsState>((set) => ({
  domains: [],
  isLoading: false,
  
  setDomains: (domains) => set({ domains }),
  addDomain: (domain) => set((state) => ({ domains: [...state.domains, domain] })),
  removeDomain: (id) => set((state) => ({ domains: state.domains.filter(d => d.id !== id) })),
  updateDomain: (id, updates) => set((state) => ({
    domains: state.domains.map(d => d.id === id ? { ...d, ...updates } : d)
  })),
}));
