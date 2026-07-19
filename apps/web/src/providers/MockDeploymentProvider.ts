import { DeploymentProvider } from './DeploymentProvider';
import { Deployment, DeploymentLog } from '../types/deployment';
import { TrafficDataPoint, PerformanceDataPoint } from '../types/analytics';

export class MockDeploymentProvider implements DeploymentProvider {
  id = 'mock';
  name = 'Mock Provider';

  async deploy(projectId: string, config: any): Promise<Deployment> {
    console.log('Mock: Deploying project', projectId);
    return this.createMockDeployment(projectId);
  }

  async cancel(deploymentId: string): Promise<void> {
    console.log('Mock: Canceling deployment', deploymentId);
  }

  async rollback(deploymentId: string, toDeploymentId: string): Promise<Deployment> {
    console.log('Mock: Rolling back', deploymentId, 'to', toDeploymentId);
    return this.createMockDeployment('mock-project');
  }

  async restart(deploymentId: string): Promise<Deployment> {
    console.log('Mock: Restarting deployment', deploymentId);
    return this.createMockDeployment('mock-project');
  }

  async delete(deploymentId: string): Promise<void> {
    console.log('Mock: Deleting deployment', deploymentId);
  }

  streamLogs(deploymentId: string, onLog: (log: DeploymentLog) => void): () => void {
    const interval = setInterval(() => {
      onLog({
        id: Math.random().toString(),
        deploymentId,
        timestamp: new Date().toISOString(),
        message: `Mock log entry ${Math.random()}`,
        level: 'info',
        source: 'runtime'
      });
    }, 2000);
    return () => clearInterval(interval);
  }

  streamMetrics(deploymentId: string, onMetric: (metric: TrafficDataPoint | PerformanceDataPoint) => void): () => void {
    const interval = setInterval(() => {
      onMetric({
        timestamp: new Date().toISOString(),
        visitors: Math.floor(Math.random() * 100),
        requests: Math.floor(Math.random() * 1000),
        bandwidth: Math.floor(Math.random() * 1000000)
      } as TrafficDataPoint);
    }, 5000);
    return () => clearInterval(interval);
  }

  streamStatus(deploymentId: string, onStatus: (status: Deployment) => void): () => void {
    const interval = setInterval(() => {
      onStatus(this.createMockDeployment('mock-project'));
    }, 10000);
    return () => clearInterval(interval);
  }

  async createPreview(projectId: string, branch: string): Promise<Deployment> {
    return this.createMockDeployment(projectId, 'preview');
  }

  async promote(deploymentId: string): Promise<Deployment> {
    return this.createMockDeployment('mock-project', 'production');
  }

  async manageDomain(projectId: string, domain: string, action: 'add' | 'remove' | 'verify'): Promise<void> {
    console.log('Mock: Managing domain', domain, action);
  }

  async manageEnvironment(projectId: string, variables: any[]): Promise<void> {
    console.log('Mock: Managing environment variables');
  }

  private createMockDeployment(projectId: string, environment: 'production' | 'preview' | 'development' = 'production'): Deployment {
    return {
      id: Math.random().toString(36).substr(2, 9),
      projectId,
      url: `https://mock-${Math.random().toString(36).substr(2, 5)}.codesync.dev`,
      status: 'READY',
      environment,
      commitSha: 'a1b2c3d4',
      commitMessage: 'Update styles',
      branch: 'main',
      authorName: 'John Doe',
      authorEmail: 'john@example.com',
      createdAt: new Date().toISOString(),
      buildingAt: new Date(Date.now() - 60000).toISOString(),
      readyAt: new Date().toISOString(),
      errorAt: null,
      errorMessage: null,
      buildDuration: 45,
      deployDuration: 10,
      provider: 'mock',
      version: '1.0.0'
    };
  }
}
