import { create } from 'zustand';

interface TerminalState {
  activePanelTab: 'TERMINAL' | 'OUTPUT' | 'PROBLEMS' | 'DEBUG_CONSOLE';
  setActivePanelTab: (tab: 'TERMINAL' | 'OUTPUT' | 'PROBLEMS' | 'DEBUG_CONSOLE') => void;
  
  logs: { id: string; timestamp: number; message: string; type: 'info' | 'error' | 'warn' }[];
  addLog: (message: string, type?: 'info' | 'error' | 'warn') => void;
  clearLogs: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  activePanelTab: 'TERMINAL',
  setActivePanelTab: (tab) => set({ activePanelTab: tab }),
  
  logs: [
    { id: '1', timestamp: Date.now(), message: 'CodeSync Terminal Ready.', type: 'info' }
  ],
  
  addLog: (message, type = 'info') => set((state) => ({
    logs: [...state.logs, { id: Math.random().toString(), timestamp: Date.now(), message, type }]
  })),
  
  clearLogs: () => set({ logs: [] }),
}));
