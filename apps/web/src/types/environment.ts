export type EnvironmentVariableType = 'plain' | 'secret';
export type EnvironmentTarget = 'production' | 'preview' | 'development' | 'all';

export interface EnvironmentVariable {
  id: string;
  projectId: string;
  key: string;
  value: string; // If secret, this might be masked in UI
  type: EnvironmentVariableType;
  targets: EnvironmentTarget[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string; // User ID
  isDecrypted?: boolean; // UI only flag
}
