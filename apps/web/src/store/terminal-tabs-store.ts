import { create } from 'zustand';

export interface TerminalTab {
  id: string;
  title: string;
  icon?: string;
  isRunning?: boolean;
}

interface TerminalTabsState {
  tabs: TerminalTab[];
  activeTabId: string | null;
  
  addTab: (tab?: Partial<TerminalTab>) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<TerminalTab>) => void;
}

let nextTerminalId = 1;

export const useTerminalTabsStore = create<TerminalTabsState>((set) => ({
  tabs: [{ id: 'term-1', title: 'bash' }],
  activeTabId: 'term-1',

  addTab: (tab) => set((state) => {
    nextTerminalId++;
    const newId = `term-${nextTerminalId}`;
    const newTab: TerminalTab = {
      id: newId,
      title: 'bash',
      ...tab
    };
    return {
      tabs: [...state.tabs, newTab],
      activeTabId: newId
    };
  }),

  removeTab: (id) => set((state) => {
    const newTabs = state.tabs.filter(t => t.id !== id);
    let newActiveId = state.activeTabId;
    if (newActiveId === id) {
      newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
    }
    return {
      tabs: newTabs,
      activeTabId: newActiveId
    };
  }),

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTab: (id, updates) => set((state) => ({
    tabs: state.tabs.map(t => t.id === id ? { ...t, ...updates } : t)
  }))
}));
