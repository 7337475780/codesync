import { create } from 'zustand';

export type DeploymentStatus = 'READY' | 'BUILDING' | 'ERROR' | 'QUEUED' | 'CANCELED';
export type DeploymentEnvironment = 'Production' | 'Preview';

export interface Deployment {
  id: string;
  projectId: string;
  status: DeploymentStatus;
  environment: DeploymentEnvironment;
  url: string;
  branch: string;
  commitMessage: string;
  commitHash: string;
  creator: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  buildingAt?: string;
  readyAt?: string;
  duration?: number; // in seconds
}

export interface Domain {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Error';
  type: 'Primary' | 'Alias' | 'Redirect';
  target?: string; // e.g. Redirect target
  createdAt: string;
  ssl: 'Active' | 'Pending' | 'Failed';
}

export interface EnvVar {
  id: string;
  key: string;
  value: string;
  environments: DeploymentEnvironment[];
  createdAt: string;
}

interface DeploymentState {
  deployments: Deployment[];
  domains: Domain[];
  envVars: EnvVar[];
  activeDeploymentId: string | null;
  
  // Actions
  setActiveDeployment: (id: string | null) => void;
  triggerRedeploy: (id: string) => void;
  cancelDeployment: (id: string) => void;
  addDomain: (domain: Omit<Domain, 'id' | 'createdAt' | 'status' | 'ssl'>) => void;
  removeDomain: (id: string) => void;
  addEnvVar: (envVar: Omit<EnvVar, 'id' | 'createdAt'>) => void;
  removeEnvVar: (id: string) => void;
  fetchDeployments: (projectId?: string) => Promise<void>;
  fetchEnvironments: (projectId?: string) => Promise<void>;
  fetchDomains: (projectId: string) => Promise<void>;
}

export const useDeploymentStore = create<DeploymentState>((set, get) => ({
  deployments: [],
  domains: [],
  envVars: [],
  activeDeploymentId: null,

  setActiveDeployment: (id) => set({ activeDeploymentId: id }),

  fetchDeployments: async (projectId?: string) => {
    try {
      const url = projectId ? `/api/projects/${projectId}/deployments` : `/api/deployments`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        set({ deployments: data.deployments });
      }
    } catch (e) {
      console.error(e);
    }
  },

  fetchEnvironments: async (projectId?: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/environments`);
      const data = await res.json();
      if (data.success) {
        set({ envVars: data.environments });
      }
    } catch (e) {
      console.error(e);
    }
  },

  fetchDomains: async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/domains`);
      const data = await res.json();
      if (data.success) {
        set({ domains: data.domains });
      }
    } catch (e) {
      console.error(e);
    }
  },

  triggerRedeploy: async (id) => {
    try {
      const res = await fetch(`/api/deployments/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'redeploy' })
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({ deployments: [data.deployment, ...state.deployments] }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  cancelDeployment: async (id) => {
    try {
      const res = await fetch(`/api/deployments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' })
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          deployments: state.deployments.map(d => d.id === id ? { ...d, status: 'CANCELED' } : d)
        }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  addDomain: async (domain) => {
    const projectId = get().deployments[0]?.projectId || 'demo';
    try {
      const res = await fetch(`/api/projects/${projectId}/domains`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(domain)
      });
      const data = await res.json();
      if (data.success) {
        set((s) => ({ domains: [...s.domains, data.domain] }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  removeDomain: async (id) => {
    const projectId = get().deployments[0]?.projectId || 'demo';
    try {
      const res = await fetch(`/api/projects/${projectId}/domains/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        set((s) => ({ domains: s.domains.filter(d => d.id !== id) }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  addEnvVar: async (envVar) => {
    const projectId = get().deployments[0]?.projectId || 'demo';
    try {
      const res = await fetch(`/api/projects/${projectId}/environments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envVar)
      });
      const data = await res.json();
      if (data.success) {
        set((s) => ({ envVars: [...s.envVars, data.envVar] }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  removeEnvVar: async (id) => {
    const projectId = get().deployments[0]?.projectId || 'demo';
    try {
      const res = await fetch(`/api/projects/${projectId}/environments/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        set((s) => ({ envVars: s.envVars.filter(e => e.id !== id) }));
      }
    } catch (e) {
      console.error(e);
    }
  },
}));
