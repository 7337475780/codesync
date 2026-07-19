import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProjectFilterState {
  searchQuery: string;
  frameworks: string[];
  tags: string[];
  visibility: 'ALL' | 'PUBLIC' | 'PRIVATE';
  isAiEnabled: boolean | null;
  setSearchQuery: (query: string) => void;
  setFrameworks: (frameworks: string[]) => void;
  setTags: (tags: string[]) => void;
  setVisibility: (visibility: 'ALL' | 'PUBLIC' | 'PRIVATE') => void;
  setIsAiEnabled: (enabled: boolean | null) => void;
  resetFilters: () => void;
}

export const useProjectFilterStore = create<ProjectFilterState>()(
  persist(
    (set) => ({
      searchQuery: '',
      frameworks: [],
      tags: [],
      visibility: 'ALL',
      isAiEnabled: null,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFrameworks: (frameworks) => set({ frameworks }),
      setTags: (tags) => set({ tags }),
      setVisibility: (visibility) => set({ visibility }),
      setIsAiEnabled: (enabled) => set({ isAiEnabled: enabled }),
      resetFilters: () => set({
        searchQuery: '',
        frameworks: [],
        tags: [],
        visibility: 'ALL',
        isAiEnabled: null,
      }),
    }),
    {
      name: 'project-filters',
    }
  )
);
