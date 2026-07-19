import { create } from 'zustand';

interface ExplorerState {
  expandedFolders: Set<string>;
  selectedPath: string | null;
  
  toggleFolder: (path: string) => void;
  expandFolder: (path: string) => void;
  collapseFolder: (path: string) => void;
  setSelectedPath: (path: string | null) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  expandedFolders: new Set(['/', '/src', '/src/app']),
  selectedPath: null,

  toggleFolder: (path) => set((state) => {
    const next = new Set(state.expandedFolders);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    return { expandedFolders: next };
  }),

  expandFolder: (path) => set((state) => {
    const next = new Set(state.expandedFolders);
    next.add(path);
    return { expandedFolders: next };
  }),

  collapseFolder: (path) => set((state) => {
    const next = new Set(state.expandedFolders);
    next.delete(path);
    return { expandedFolders: next };
  }),

  setSelectedPath: (path) => set({ selectedPath: path }),
}));
