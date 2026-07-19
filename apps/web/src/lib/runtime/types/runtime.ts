export type RuntimeStatus = 'stopped' | 'starting' | 'running' | 'error';

export interface RuntimeInfo {
  status: RuntimeStatus;
  framework: string;
  nodeVersion: string;
  packageManager: string;
  uptimeMs: number;
  health: 'healthy' | 'degraded' | 'critical';
}

export interface RuntimeMetrics {
  cpu: number;       // 0-100
  memory: number;    // 0-100
  disk: number;      // 0-100
  networkIn: number; // kb/s
  networkOut: number;// kb/s
  fps: number;
  timestamp: number;
}
