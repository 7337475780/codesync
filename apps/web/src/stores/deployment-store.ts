import { create } from 'zustand';
import { Deployment } from '../types/deployment';

interface DeploymentState {
  deployments: Deployment[];
  currentDeployment: Deployment | null;
  isLoading: boolean;
  error: string | null;
  
  setDeployments: (deployments: Deployment[]) => void;
  addDeployment: (deployment: Deployment) => void;
  updateDeployment: (id: string, updates: Partial<Deployment>) => void;
  setCurrentDeployment: (deployment: Deployment | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchDeployments: (projectId: string) => void;
}

export const useDeploymentStore = create<DeploymentState>((set) => ({
  deployments: [],
  currentDeployment: null,
  isLoading: false,
  error: null,
  
  setDeployments: (deployments) => set({ deployments }),
  addDeployment: (deployment) => set((state) => ({ deployments: [deployment, ...state.deployments] })),
  updateDeployment: (id, updates) => set((state) => ({
    deployments: state.deployments.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    currentDeployment: state.currentDeployment?.id === id ? { ...state.currentDeployment, ...updates } : state.currentDeployment,
  })),
  setCurrentDeployment: (currentDeployment) => set({ currentDeployment }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  fetchDeployments: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/projects/${projectId}/deployments`);
      const data = await res.json();
      if (data.success && data.deployments) {
        set({ deployments: data.deployments, isLoading: false });
      } else {
        set({ error: data.error || 'Failed to fetch', isLoading: false });
      }
    } catch (e: any) {
      set({ error: e.message, isLoading: false });
    }
  },
}));
