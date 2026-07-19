import { RuntimeInfo, RuntimeMetrics } from '../types/runtime';
import { RuntimeProcess } from '../types/process';
import { ForwardedPort } from '../types/ports';
import { Task } from '../types/task';

export interface RuntimeProvider {
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  getInfo(): Promise<RuntimeInfo>;
  streamMetrics(onMetrics: (m: RuntimeMetrics) => void): () => void;
  listProcesses(): Promise<RuntimeProcess[]>;
  stopProcess(id: string): Promise<void>;
  restartProcess(id: string): Promise<void>;
  getProcessLogs(id: string): Promise<string[]>;
  listPorts(): Promise<ForwardedPort[]>;
  openPort(port: number): Promise<ForwardedPort>;
  closePort(id: string): Promise<void>;
  listTasks(): Promise<Task[]>;
  runTask(id: string, onOutput: (line: string) => void): Promise<void>;
  cancelTask(id: string): Promise<void>;
}
