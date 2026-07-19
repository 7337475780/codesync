import { create } from 'zustand';
import { ProvisionLogEntry, LogLevel } from '@/lib/provisioning/types';

interface WorkspaceLogState {
  logs: ProvisionLogEntry[];
  filterLevel: LogLevel | 'ALL';
  searchQuery: string;
  isPaused: boolean;
  addLog: (log: ProvisionLogEntry) => void;
  setFilterLevel: (level: LogLevel | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  togglePause: () => void;
  clearLogs: () => void;
}

export const useWorkspaceLogStore = create<WorkspaceLogState>((set, get) => ({
  logs: [],
  filterLevel: 'ALL',
  searchQuery: '',
  isPaused: false,
  
  addLog: (log) => {
    if (!get().isPaused) {
      set((state) => ({ logs: [...state.logs, log] }));
    }
  },
  
  setFilterLevel: (filterLevel) => set({ filterLevel }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  clearLogs: () => set({ logs: [] }),
}));
