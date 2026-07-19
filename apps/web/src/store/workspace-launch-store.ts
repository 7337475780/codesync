import { create } from 'zustand';
import { ProvisionStatus, ProvisionLogEntry, WorkspaceMetrics } from '@/lib/provisioning/types';

interface WorkspaceLaunchState {
  workspaceId: string | null;
  status: ProvisionStatus;
  metrics: WorkspaceMetrics | null;
  setWorkspaceId: (id: string) => void;
  setStatus: (status: ProvisionStatus) => void;
  setMetrics: (metrics: WorkspaceMetrics) => void;
  reset: () => void;
}

export const useWorkspaceLaunchStore = create<WorkspaceLaunchState>((set) => ({
  workspaceId: null,
  status: 'QUEUED',
  metrics: null,
  setWorkspaceId: (id) => set({ workspaceId: id }),
  setStatus: (status) => set({ status }),
  setMetrics: (metrics) => set({ metrics }),
  reset: () => set({ workspaceId: null, status: 'QUEUED', metrics: null }),
}));
