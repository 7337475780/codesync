import { create } from 'zustand';

export interface EnvironmentVariable {
  id: string;
  name: string;
  value: string;
  environment: 'development' | 'production' | 'preview';
  isSecret: boolean;
}

interface WorkspaceEnvironmentState {
  variables: EnvironmentVariable[];
  setVariables: (variables: EnvironmentVariable[]) => void;
  addVariable: (variable: EnvironmentVariable) => void;
  removeVariable: (id: string) => void;
}

export const useWorkspaceEnvironmentStore = create<WorkspaceEnvironmentState>((set) => ({
  variables: [],
  setVariables: (variables) => set({ variables }),
  addVariable: (variable) => set((state) => ({ variables: [...state.variables, variable] })),
  removeVariable: (id) => set((state) => ({ variables: state.variables.filter(v => v.id !== id) })),
}));
