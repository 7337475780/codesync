import { create } from 'zustand';

export interface EditorTab {
  id: string;
  path: string;
  title: string;
  isDirty?: boolean;
  isPinned?: boolean;
}

interface EditorTabsState {
  tabs: EditorTab[];
  activeTabId: string | null;
  
  openTab: (tab: EditorTab) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  setTabDirty: (id: string, isDirty: boolean) => void;
  togglePin: (id: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
}

export const useEditorTabsStore = create<EditorTabsState>((set) => ({
  tabs: [
    { id: 'welcome', path: 'welcome', title: 'Welcome', isPinned: true },
    { id: '1', path: 'src/app/page.tsx', title: 'page.tsx' },
    { id: '2', path: 'src/lib/utils.ts', title: 'utils.ts' }
  ],
  activeTabId: '1',
  
  openTab: (newTab) => set((state) => {
    const exists = state.tabs.find(t => t.id === newTab.id);
    if (exists) {
      return { activeTabId: newTab.id };
    }
    return { 
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id
    };
  }),
  
  closeTab: (id) => set((state) => {
    const newTabs = state.tabs.filter(t => t.id !== id);
    let newActiveId = state.activeTabId;
    if (newActiveId === id) {
      newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
    }
    return { tabs: newTabs, activeTabId: newActiveId };
  }),
  
  setActiveTab: (id) => set({ activeTabId: id }),
  
  setTabDirty: (id, isDirty) => set((state) => ({
    tabs: state.tabs.map(t => t.id === id ? { ...t, isDirty } : t)
  })),
  
  togglePin: (id) => set((state) => ({
    tabs: state.tabs.map(t => t.id === id ? { ...t, isPinned: !t.isPinned } : t).sort((a, b) => {
      // Pinned tabs always come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    })
  })),
  
  reorderTabs: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.tabs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { tabs: result };
  }),
}));
