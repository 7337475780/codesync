export type ProvisionStatus =
  | 'QUEUED'
  | 'ALLOCATING_VM'
  | 'PREPARING_FILESYSTEM'
  | 'DOWNLOADING_BASE_IMAGE'
  | 'INITIALIZING_RUNTIME'
  | 'CLONING_REPOSITORY'
  | 'SCANNING_REPOSITORY'
  | 'DETECTING_FRAMEWORK'
  | 'INSTALLING_DEPENDENCIES'
  | 'GENERATING_AI_CONTEXT'
  | 'BUILDING_PROJECT'
  | 'RUNNING_HEALTH_CHECKS'
  | 'STARTING_SERVICES'
  | 'READY'
  | 'FAILED'
  | 'STOPPED';

export type LogLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'DEBUG';

export interface ProvisionLogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

export interface WorkspaceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkUsage: number; // MB/s
  provisionTime: number; // seconds
}

export interface ProvisionProvider {
  /** Starts or resumes the provisioning process for a workspace */
  start(workspaceId: string): Promise<void>;
  /** Cancels an ongoing provisioning job */
  cancel(workspaceId: string): Promise<void>;
  /** Restarts a provisioned workspace */
  restart(workspaceId: string): Promise<void>;
  /** Subscribes to log stream. In a real environment, this might use WebSockets */
  streamLogs(workspaceId: string, onLog: (log: ProvisionLogEntry) => void): () => void;
  /** Subscribes to status updates */
  streamStatus(workspaceId: string, onStatus: (status: ProvisionStatus) => void): () => void;
  /** Retrieves point-in-time metrics */
  getMetrics(workspaceId: string): Promise<WorkspaceMetrics>;
}
