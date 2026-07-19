import { create } from 'zustand';
import { ForwardedPort } from '@/lib/runtime/types/ports';

interface PortsState {
  ports: ForwardedPort[];
  setPorts: (ports: ForwardedPort[]) => void;
  addPort: (port: ForwardedPort) => void;
  updatePort: (id: string, update: Partial<ForwardedPort>) => void;
}

export const usePortsStore = create<PortsState>((set) => ({
  ports: [],
  setPorts: (ports) => set({ ports }),
  addPort: (port) => set((s) => ({ ports: [...s.ports, port] })),
  updatePort: (id, update) => set((s) => ({
    ports: s.ports.map(p => p.id === id ? { ...p, ...update } : p),
  })),
}));
