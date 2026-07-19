import { DeploymentProvider } from './DeploymentProvider';
import { Deployment, DeploymentLog } from '../types/deployment';
import { TrafficDataPoint, PerformanceDataPoint } from '../types/analytics';

export class NetlifyProvider implements DeploymentProvider {
  id = 'netlify';
  name = 'Netlify';

  async deploy(projectId: string, config: any): Promise<Deployment> {
    throw new Error('Not implemented');
  }
  async cancel(deploymentId: string): Promise<void> {
    throw new Error('Not implemented');
  }
  async rollback(deploymentId: string, toDeploymentId: string): Promise<Deployment> {
    throw new Error('Not implemented');
  }
  async restart(deploymentId: string): Promise<Deployment> {
    throw new Error('Not implemented');
  }
  async delete(deploymentId: string): Promise<void> {
    throw new Error('Not implemented');
  }
  streamLogs(deploymentId: string, onLog: (log: DeploymentLog) => void): () => void {
    return () => {};
  }
  streamMetrics(deploymentId: string, onMetric: (metric: TrafficDataPoint | PerformanceDataPoint) => void): () => void {
    return () => {};
  }
  streamStatus(deploymentId: string, onStatus: (status: Deployment) => void): () => void {
    return () => {};
  }
  async createPreview(projectId: string, branch: string): Promise<Deployment> {
    throw new Error('Not implemented');
  }
  async promote(deploymentId: string): Promise<Deployment> {
    throw new Error('Not implemented');
  }
  async manageDomain(projectId: string, domain: string, action: 'add' | 'remove' | 'verify'): Promise<void> {
    throw new Error('Not implemented');
  }
  async manageEnvironment(projectId: string, variables: any[]): Promise<void> {
    throw new Error('Not implemented');
  }
}
