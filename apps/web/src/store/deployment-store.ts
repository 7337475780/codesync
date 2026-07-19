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
}

const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: 'dpl_123456789',
    projectId: 'prj_1',
    status: 'READY',
    environment: 'Production',
    url: 'codesync.dev',
    branch: 'main',
    commitMessage: 'feat: new deployment center',
    commitHash: 'a1b2c3d',
    creator: { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice' },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    buildingAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 5).toISOString(),
    readyAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 65).toISOString(),
    duration: 60,
  },
  {
    id: 'dpl_987654321',
    projectId: 'prj_1',
    status: 'BUILDING',
    environment: 'Preview',
    url: 'feat-ai-assistant-codesync.vercel.app',
    branch: 'feat/ai-assistant',
    commitMessage: 'feat: add ai store and layout',
    commitHash: 'e5f6g7h',
    creator: { name: 'Bob', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bob' },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    buildingAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: 'dpl_112233445',
    projectId: 'prj_1',
    status: 'ERROR',
    environment: 'Preview',
    url: 'fix-nav-codesync.vercel.app',
    branch: 'fix/navigation',
    commitMessage: 'fix: resolving circular dependency',
    commitHash: 'i9j0k1l',
    creator: { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice' },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    buildingAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 5).toISOString(),
    duration: 120,
  }
];

const MOCK_DOMAINS: Domain[] = [
  { id: 'dom_1', name: 'codesync.dev', status: 'Active', type: 'Primary', ssl: 'Active', createdAt: new Date().toISOString() },
  { id: 'dom_2', name: 'www.codesync.dev', status: 'Active', type: 'Redirect', target: 'codesync.dev', ssl: 'Active', createdAt: new Date().toISOString() },
  { id: 'dom_3', name: 'api.codesync.dev', status: 'Pending', type: 'Alias', ssl: 'Pending', createdAt: new Date().toISOString() },
];

const MOCK_ENV_VARS: EnvVar[] = [
  { id: 'env_1', key: 'DATABASE_URL', value: 'postgres://***', environments: ['Production', 'Preview'], createdAt: new Date().toISOString() },
  { id: 'env_2', key: 'NEXT_PUBLIC_SUPABASE_URL', value: 'https://***.supabase.co', environments: ['Production', 'Preview'], createdAt: new Date().toISOString() },
  { id: 'env_3', key: 'STRIPE_SECRET_KEY', value: 'sk_test_***', environments: ['Preview'], createdAt: new Date().toISOString() },
];

export const useDeploymentStore = create<DeploymentState>((set) => ({
  deployments: MOCK_DEPLOYMENTS,
  domains: MOCK_DOMAINS,
  envVars: MOCK_ENV_VARS,
  activeDeploymentId: MOCK_DEPLOYMENTS[0].id,

  setActiveDeployment: (id) => set({ activeDeploymentId: id }),

  triggerRedeploy: (id) => set((state) => {
    const deployment = state.deployments.find(d => d.id === id);
    if (!deployment) return state;
    
    const newDeployment: Deployment = {
      ...deployment,
      id: `dpl_${Date.now()}`,
      status: 'QUEUED',
      createdAt: new Date().toISOString(),
      buildingAt: undefined,
      readyAt: undefined,
      duration: undefined,
    };
    
    return { deployments: [newDeployment, ...state.deployments] };
  }),

  cancelDeployment: (id) => set((state) => ({
    deployments: state.deployments.map(d => 
      d.id === id && (d.status === 'BUILDING' || d.status === 'QUEUED')
        ? { ...d, status: 'CANCELED' }
        : d
    )
  })),

  addDomain: (domain) => set((state) => ({
    domains: [...state.domains, { ...domain, id: `dom_${Date.now()}`, status: 'Pending', ssl: 'Pending', createdAt: new Date().toISOString() }]
  })),

  removeDomain: (id) => set((state) => ({
    domains: state.domains.filter(d => d.id !== id)
  })),

  addEnvVar: (envVar) => set((state) => ({
    envVars: [...state.envVars, { ...envVar, id: `env_${Date.now()}`, createdAt: new Date().toISOString() }]
  })),

  removeEnvVar: (id) => set((state) => ({
    envVars: state.envVars.filter(e => e.id !== id)
  })),
}));
