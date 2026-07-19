export type TerminalState = 'idle' | 'running' | 'error' | 'disconnected';

export interface TerminalInstance {
  id: string;
  name: string;
  cwd: string;
  state: TerminalState;
  output: string;
  pid?: number;
}

export interface RuntimeMetrics {
  cpu: number;
  memory: number;
  network: number;
  disk: number;
  processes: number;
  uptime: number;
}

export interface RuntimeProvider {
  name: string;
  
  // Lifecycle
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  
  // Execution
  execute(command: string, onData: (data: string) => void): Promise<void>;
  kill(pid?: number): Promise<void>;
  
  // Terminal binding
  resize(cols: number, rows: number): void;
  
  // Status
  getStatus(): TerminalState;
  getMetrics(): Promise<RuntimeMetrics>;
}
