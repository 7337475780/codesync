import { ProvisionProvider, ProvisionLogEntry, ProvisionStatus, WorkspaceMetrics, LogLevel } from './types';

const PIPELINE_STEPS: { status: ProvisionStatus; duration: number; logs: { msg: string; level: LogLevel }[] }[] = [
  {
    status: 'QUEUED',
    duration: 1000,
    logs: [{ msg: 'Job added to provisioning queue', level: 'INFO' }]
  },
  {
    status: 'ALLOCATING_VM',
    duration: 1500,
    logs: [
      { msg: 'Requesting computing resources in us-east-1...', level: 'INFO' },
      { msg: 'VM allocated: 2 vCPUs, 4GB RAM', level: 'SUCCESS' }
    ]
  },
  {
    status: 'PREPARING_FILESYSTEM',
    duration: 1200,
    logs: [
      { msg: 'Attaching NVMe block storage...', level: 'INFO' },
      { msg: 'Filesystem mounted at /workspace', level: 'SUCCESS' }
    ]
  },
  {
    status: 'DOWNLOADING_BASE_IMAGE',
    duration: 2000,
    logs: [
      { msg: 'Pulling codesync/base:latest...', level: 'INFO' },
      { msg: 'Extracting image layers...', level: 'DEBUG' },
      { msg: 'Base image ready', level: 'SUCCESS' }
    ]
  },
  {
    status: 'INITIALIZING_RUNTIME',
    duration: 1000,
    logs: [
      { msg: 'Starting containerd runtime...', level: 'INFO' },
      { msg: 'Runtime initialized successfully', level: 'SUCCESS' }
    ]
  },
  {
    status: 'CLONING_REPOSITORY',
    duration: 2500,
    logs: [
      { msg: 'Authenticating with GitHub...', level: 'DEBUG' },
      { msg: 'Cloning repository tharu/codesync-web...', level: 'INFO' },
      { msg: 'Resolving deltas...', level: 'DEBUG' },
      { msg: 'Repository cloned successfully', level: 'SUCCESS' }
    ]
  },
  {
    status: 'SCANNING_REPOSITORY',
    duration: 1500,
    logs: [
      { msg: 'Scanning for configuration files...', level: 'INFO' },
      { msg: 'Found package.json', level: 'DEBUG' },
      { msg: 'Found next.config.ts', level: 'DEBUG' },
      { msg: 'Scan complete', level: 'SUCCESS' }
    ]
  },
  {
    status: 'DETECTING_FRAMEWORK',
    duration: 1000,
    logs: [
      { msg: 'Analyzing project structure...', level: 'INFO' },
      { msg: 'Next.js detected with 98% confidence', level: 'SUCCESS' }
    ]
  },
  {
    status: 'INSTALLING_DEPENDENCIES',
    duration: 4000,
    logs: [
      { msg: 'Detecting package manager (pnpm)...', level: 'INFO' },
      { msg: 'Running pnpm install...', level: 'INFO' },
      { msg: 'Resolving packages...', level: 'DEBUG' },
      { msg: 'WARN: peer dependency conflict ignored', level: 'WARNING' },
      { msg: 'Dependencies installed', level: 'SUCCESS' }
    ]
  },
  {
    status: 'GENERATING_AI_CONTEXT',
    duration: 2000,
    logs: [
      { msg: 'Building AST for repository...', level: 'INFO' },
      { msg: 'Generating architectural embeddings...', level: 'DEBUG' },
      { msg: 'AI context generation complete', level: 'SUCCESS' }
    ]
  },
  {
    status: 'BUILDING_PROJECT',
    duration: 3500,
    logs: [
      { msg: 'Running build scripts...', level: 'INFO' },
      { msg: 'Compiling assets...', level: 'DEBUG' },
      { msg: 'Build successful', level: 'SUCCESS' }
    ]
  },
  {
    status: 'RUNNING_HEALTH_CHECKS',
    duration: 1500,
    logs: [
      { msg: 'Pinging dev server on port 3000...', level: 'INFO' },
      { msg: 'Health check passed', level: 'SUCCESS' }
    ]
  },
  {
    status: 'STARTING_SERVICES',
    duration: 1000,
    logs: [
      { msg: 'Exposing port 3000 to preview proxy...', level: 'INFO' },
      { msg: 'Services started', level: 'SUCCESS' }
    ]
  },
  {
    status: 'READY',
    duration: 0,
    logs: [
      { msg: 'Workspace is ready', level: 'SUCCESS' }
    ]
  }
];

export class MockProvisionProvider implements ProvisionProvider {
  private activeJobs: Set<string> = new Set();
  private logListeners: Map<string, Set<(log: ProvisionLogEntry) => void>> = new Map();
  private statusListeners: Map<string, Set<(status: ProvisionStatus) => void>> = new Map();
  private startTimeMap: Map<string, number> = new Map();

  async start(workspaceId: string): Promise<void> {
    if (this.activeJobs.has(workspaceId)) return;
    this.activeJobs.add(workspaceId);
    this.startTimeMap.set(workspaceId, Date.now());

    // Run the pipeline asynchronously
    this.runPipeline(workspaceId).catch(console.error);
  }

  async cancel(workspaceId: string): Promise<void> {
    this.activeJobs.delete(workspaceId);
    this.emitStatus(workspaceId, 'STOPPED');
    this.emitLog(workspaceId, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message: 'Provisioning cancelled by user'
    });
  }

  async restart(workspaceId: string): Promise<void> {
    await this.cancel(workspaceId);
    await this.start(workspaceId);
  }

  streamLogs(workspaceId: string, onLog: (log: ProvisionLogEntry) => void): () => void {
    if (!this.logListeners.has(workspaceId)) {
      this.logListeners.set(workspaceId, new Set());
    }
    this.logListeners.get(workspaceId)!.add(onLog);
    return () => {
      this.logListeners.get(workspaceId)?.delete(onLog);
    };
  }

  streamStatus(workspaceId: string, onStatus: (status: ProvisionStatus) => void): () => void {
    if (!this.statusListeners.has(workspaceId)) {
      this.statusListeners.set(workspaceId, new Set());
    }
    this.statusListeners.get(workspaceId)!.add(onStatus);
    return () => {
      this.statusListeners.get(workspaceId)?.delete(onStatus);
    };
  }

  async getMetrics(workspaceId: string): Promise<WorkspaceMetrics> {
    const elapsedMs = this.startTimeMap.get(workspaceId) 
      ? Date.now() - this.startTimeMap.get(workspaceId)! 
      : 0;

    return {
      cpuUsage: Math.random() * 30 + 10,
      memoryUsage: Math.random() * 2000 + 500,
      diskUsage: Math.random() * 5000 + 1000,
      networkUsage: Math.random() * 5 + 1,
      provisionTime: Math.floor(elapsedMs / 1000),
    };
  }

  private emitLog(workspaceId: string, log: ProvisionLogEntry) {
    const listeners = this.logListeners.get(workspaceId);
    if (listeners) {
      listeners.forEach(fn => fn(log));
    }
  }

  private emitStatus(workspaceId: string, status: ProvisionStatus) {
    const listeners = this.statusListeners.get(workspaceId);
    if (listeners) {
      listeners.forEach(fn => fn(status));
    }
  }

  private async runPipeline(workspaceId: string) {
    for (const step of PIPELINE_STEPS) {
      if (!this.activeJobs.has(workspaceId)) break;

      this.emitStatus(workspaceId, step.status);

      // Distribute logs evenly over the duration
      if (step.logs.length > 0) {
        const timePerLog = step.duration / step.logs.length;
        for (const log of step.logs) {
          if (!this.activeJobs.has(workspaceId)) break;
          this.emitLog(workspaceId, {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            level: log.level,
            message: log.msg
          });
          if (timePerLog > 0) {
            await new Promise(r => setTimeout(r, timePerLog));
          }
        }
      } else {
        await new Promise(r => setTimeout(r, step.duration));
      }
    }
  }
}

export const mockProvisionProvider = new MockProvisionProvider();
