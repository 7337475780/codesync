import { create } from 'zustand';
import { EnvironmentVariable } from '../types/environment';

interface EnvironmentState {
  variables: EnvironmentVariable[];
  isLoading: boolean;
  
  setVariables: (variables: EnvironmentVariable[]) => void;
  addVariable: (variable: EnvironmentVariable) => void;
  removeVariable: (id: string) => void;
  updateVariable: (id: string, updates: Partial<EnvironmentVariable>) => void;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  variables: [],
  isLoading: false,
  
  setVariables: (variables) => set({ variables }),
  addVariable: (variable) => set((state) => ({ variables: [...state.variables, variable] })),
  removeVariable: (id) => set((state) => ({ variables: state.variables.filter(v => v.id !== id) })),
  updateVariable: (id, updates) => set((state) => ({
    variables: state.variables.map(v => v.id === id ? { ...v, ...updates } : v)
  })),
}));
