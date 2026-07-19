import { RuntimeProvider } from './RuntimeProvider';
import { RuntimeInfo, RuntimeMetrics } from '../types/runtime';
import { RuntimeProcess } from '../types/process';
import { ForwardedPort } from '../types/ports';
import { Task } from '../types/task';
import { nanoid } from 'nanoid';

export class MockRuntimeProvider implements RuntimeProvider {
  private metricsInterval: ReturnType<typeof setInterval> | null = null;

  private mockProcesses: RuntimeProcess[] = [
    { id: 'p1', name: 'Next.js Dev Server', command: 'next dev', pid: 3000, status: 'running', port: 3000, cpuPercent: 12, memoryMb: 210, startedAt: Date.now() - 120000, logs: ['> Ready on http://localhost:3000', '✓ Compiled in 239ms'], autoRestart: true },
    { id: 'p2', name: 'TypeScript Watcher', command: 'tsc --watch', pid: 3001, status: 'running', cpuPercent: 3, memoryMb: 85, startedAt: Date.now() - 110000, logs: ['Starting compilation in watch mode...', 'Found 0 errors.'], autoRestart: false },
  ];

  private mockPorts: ForwardedPort[] = [
    { id: 'port-3000', port: 3000, protocol: 'http', visibility: 'private', localUrl: 'http://localhost:3000', isOpen: true, label: 'Next.js' },
    { id: 'port-5432', port: 5432, protocol: 'tcp', visibility: 'private', localUrl: 'localhost:5432', isOpen: true, label: 'PostgreSQL' },
  ];

  private mockTasks: Task[] = [
    { id: 't1', name: 'dev', command: 'pnpm dev', status: 'running', output: ['> Starting dev server...'], startedAt: Date.now() - 60000 },
    { id: 't2', name: 'build', command: 'pnpm build', status: 'idle', output: [] },
    { id: 't3', name: 'test', command: 'pnpm test', status: 'idle', output: [], isFavorite: true },
    { id: 't4', name: 'lint', command: 'pnpm lint', status: 'success', output: ['✓ 0 errors found'], startedAt: Date.now() - 300000, finishedAt: Date.now() - 290000, duration: 10000 },
  ];

  async start(): Promise<void> { await delay(800); }
  async stop(): Promise<void> { await delay(400); }
  async restart(): Promise<void> { await delay(1000); }

  async getInfo(): Promise<RuntimeInfo> {
    return { status: 'running', framework: 'Next.js 16', nodeVersion: 'v22.4.0', packageManager: 'pnpm 9.6', uptimeMs: Date.now() - (Date.now() - 120000), health: 'healthy' };
  }

  streamMetrics(onMetrics: (m: RuntimeMetrics) => void): () => void {
    let tick = 0;
    this.metricsInterval = setInterval(() => {
      tick++;
      onMetrics({
        cpu: 10 + Math.sin(tick * 0.3) * 8 + Math.random() * 5,
        memory: 45 + Math.sin(tick * 0.15) * 10 + Math.random() * 3,
        disk: 62,
        networkIn: Math.abs(Math.sin(tick * 0.5) * 80 + Math.random() * 20),
        networkOut: Math.abs(Math.cos(tick * 0.4) * 40 + Math.random() * 10),
        fps: 58 + Math.floor(Math.random() * 4),
        timestamp: Date.now(),
      });
    }, 1000);
    return () => { if (this.metricsInterval) clearInterval(this.metricsInterval); };
  }

  async listProcesses(): Promise<RuntimeProcess[]> { return [...this.mockProcesses]; }

  async stopProcess(id: string): Promise<void> {
    this.mockProcesses = this.mockProcesses.map(p => p.id === id ? { ...p, status: 'stopped' as const } : p);
  }

  async restartProcess(id: string): Promise<void> {
    this.mockProcesses = this.mockProcesses.map(p => p.id === id ? { ...p, status: 'running' as const } : p);
  }

  async getProcessLogs(id: string): Promise<string[]> {
    return this.mockProcesses.find(p => p.id === id)?.logs || [];
  }

  async listPorts(): Promise<ForwardedPort[]> { return [...this.mockPorts]; }

  async openPort(port: number): Promise<ForwardedPort> {
    const entry: ForwardedPort = { id: nanoid(), port, protocol: 'http', visibility: 'private', localUrl: `http://localhost:${port}`, isOpen: true };
    this.mockPorts.push(entry);
    return entry;
  }

  async closePort(id: string): Promise<void> {
    this.mockPorts = this.mockPorts.map(p => p.id === id ? { ...p, isOpen: false } : p);
  }

  async listTasks(): Promise<Task[]> { return [...this.mockTasks]; }

  async runTask(id: string, onOutput: (line: string) => void): Promise<void> {
    const task = this.mockTasks.find(t => t.id === id);
    if (!task) return;
    this.mockTasks = this.mockTasks.map(t => t.id === id ? { ...t, status: 'running' as const, startedAt: Date.now(), output: [] } : t);
    const lines = [`$ ${task.command}`, 'Starting...', '✓ Done in 2.1s'];
    for (const line of lines) { await delay(400); onOutput(line); }
    this.mockTasks = this.mockTasks.map(t => t.id === id ? { ...t, status: 'success' as const, finishedAt: Date.now() } : t);
  }

  async cancelTask(id: string): Promise<void> {
    this.mockTasks = this.mockTasks.map(t => t.id === id ? { ...t, status: 'cancelled' as const } : t);
  }
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
