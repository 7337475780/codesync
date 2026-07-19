export type WorkspaceRole = 'owner' | 'admin' | 'developer' | 'viewer' | 'guest';

export interface WorkspacePermission {
  userId: string;
  role: WorkspaceRole;
}

export interface WorkspaceInvite {
  id: string;
  email?: string;
  role: WorkspaceRole;
  expiresAt: number;
  token: string;
}
