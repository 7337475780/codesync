export type TaskStatus = 'idle' | 'running' | 'success' | 'failed' | 'cancelled';

export interface Task {
  id: string;
  name: string;
  command: string;
  status: TaskStatus;
  output: string[];
  startedAt?: number;
  finishedAt?: number;
  duration?: number;
  isFavorite?: boolean;
}
