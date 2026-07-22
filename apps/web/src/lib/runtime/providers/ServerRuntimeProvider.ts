import { RuntimeInfo, RuntimeMetrics } from '../types/runtime';
import { RuntimeProcess } from '../types/process';
import { ForwardedPort } from '../types/ports';
import { Task } from '../types/task';
import { RuntimeProvider } from './RuntimeProvider';

export class ServerRuntimeProvider implements RuntimeProvider {
  name = 'Server Runtime';
  private projectId: string;

  constructor(projectId: string = 'default') {
    this.projectId = projectId;
  }

  async start(): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/start`, { method: 'POST' });
  }

  async stop(): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/stop`, { method: 'POST' });
  }

  async restart(): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/restart`, { method: 'POST' });
  }

  async getInfo(): Promise<RuntimeInfo> {
    const res = await fetch(`/api/runtime/${this.projectId}/info`);
    if (!res.ok) throw new Error('Failed to get info');
    return await res.json();
  }

  async listProcesses(): Promise<RuntimeProcess[]> {
    const res = await fetch(`/api/runtime/${this.projectId}/processes`);
    if (!res.ok) return [];
    return await res.json();
  }

  async stopProcess(id: string): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/processes/${id}`, { method: 'DELETE' });
  }

  async restartProcess(id: string): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/processes/${id}/restart`, { method: 'POST' });
  }

  async getProcessLogs(id: string): Promise<string[]> {
    const res = await fetch(`/api/runtime/${this.projectId}/processes/${id}/logs`);
    if (!res.ok) return [];
    return await res.json();
  }

  async listPorts(): Promise<ForwardedPort[]> {
    const res = await fetch(`/api/runtime/${this.projectId}/ports`);
    if (!res.ok) return [];
    return await res.json();
  }

  async openPort(port: number): Promise<ForwardedPort> {
    const res = await fetch(`/api/runtime/${this.projectId}/ports`, {
      method: 'POST',
      body: JSON.stringify({ port }),
    });
    return await res.json();
  }

  async closePort(id: string): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/ports/${id}`, { method: 'DELETE' });
  }

  async listTasks(): Promise<Task[]> {
    const res = await fetch(`/api/runtime/${this.projectId}/tasks`);
    if (!res.ok) return [];
    return await res.json();
  }

  async runTask(id: string, onOutput: (line: string) => void): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/tasks/${id}/run`, { method: 'POST' });
  }
  
  async cancelTask(id: string): Promise<void> {
    await fetch(`/api/runtime/${this.projectId}/tasks/${id}/cancel`, { method: 'POST' });
  }

  streamMetrics(callback: (metrics: RuntimeMetrics) => void): () => void {
    // In a real implementation this would use WebSockets or Server-Sent Events
    const interval = setInterval(() => {
      fetch(`/api/runtime/${this.projectId}/metrics`)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }
}
