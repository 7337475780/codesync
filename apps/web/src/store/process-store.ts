import { create } from 'zustand';
import { RuntimeProcess } from '@/lib/runtime/types/process';

interface ProcessState {
  processes: RuntimeProcess[];
  setProcesses: (processes: RuntimeProcess[]) => void;
  updateProcess: (id: string, update: Partial<RuntimeProcess>) => void;
}

export const useProcessStore = create<ProcessState>((set) => ({
  processes: [],
  setProcesses: (processes) => set({ processes }),
  updateProcess: (id, update) => set((state) => ({
    processes: state.processes.map(p => p.id === id ? { ...p, ...update } : p),
  })),
}));
