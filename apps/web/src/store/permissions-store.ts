import { create } from 'zustand';
import { WorkspaceRole, WorkspacePermission } from '@/lib/collaboration/types/permissions';

interface PermissionsState {
  myRole: WorkspaceRole;
  permissions: WorkspacePermission[];
  setMyRole: (role: WorkspaceRole) => void;
  setPermissions: (permissions: WorkspacePermission[]) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
  myRole: 'owner', // Default for mock
  permissions: [],
  setMyRole: (myRole) => set({ myRole }),
  setPermissions: (permissions) => set({ permissions }),
}));
