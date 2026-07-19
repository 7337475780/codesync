import { create } from 'zustand';
import { RuntimeInfo, RuntimeMetrics } from '@/lib/runtime/types/runtime';
import { RuntimeProvider } from '@/lib/runtime/providers/RuntimeProvider';

interface RuntimeState {
  provider: RuntimeProvider | null;
  info: RuntimeInfo | null;
  metrics: RuntimeMetrics[];
  maxMetricsHistory: number;
  setProvider: (p: RuntimeProvider) => void;
  setInfo: (info: RuntimeInfo) => void;
  addMetrics: (m: RuntimeMetrics) => void;
}

export const useRuntimeStore = create<RuntimeState>((set) => ({
  provider: null,
  info: null,
  metrics: [],
  maxMetricsHistory: 30,
  setProvider: (provider) => set({ provider }),
  setInfo: (info) => set({ info }),
  addMetrics: (m) => set((state) => ({
    metrics: [...state.metrics, m].slice(-state.maxMetricsHistory),
  })),
}));
