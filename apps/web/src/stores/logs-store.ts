import { create } from 'zustand';
import { DeploymentLog } from '../types/deployment';

interface LogsState {
  logs: DeploymentLog[];
  isStreaming: boolean;
  
  addLog: (log: DeploymentLog) => void;
  clearLogs: () => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isStreaming: false,
  
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}));
