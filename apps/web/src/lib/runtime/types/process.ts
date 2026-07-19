export type ProcessStatus = 'running' | 'stopped' | 'crashed' | 'restarting';

export interface RuntimeProcess {
  id: string;
  name: string;
  command: string;
  pid: number;
  status: ProcessStatus;
  port?: number;
  cpuPercent: number;
  memoryMb: number;
  startedAt: number;
  logs: string[];
  autoRestart: boolean;
}
