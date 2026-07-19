import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  query: string;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  query: '',
  setQuery: (q) => set({ query: q }),
}));
