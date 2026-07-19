import { Deployment, DeploymentLog } from '../types/deployment';
import { TrafficDataPoint, PerformanceDataPoint } from '../types/analytics';

export interface DeploymentProvider {
  id: string;
  name: string;

  deploy(projectId: string, config: any): Promise<Deployment>;
  cancel(deploymentId: string): Promise<void>;
  rollback(deploymentId: string, toDeploymentId: string): Promise<Deployment>;
  restart(deploymentId: string): Promise<Deployment>;
  delete(deploymentId: string): Promise<void>;

  streamLogs(deploymentId: string, onLog: (log: DeploymentLog) => void): () => void; // Returns cleanup function
  streamMetrics(deploymentId: string, onMetric: (metric: TrafficDataPoint | PerformanceDataPoint) => void): () => void;
  streamStatus(deploymentId: string, onStatus: (status: Deployment) => void): () => void;

  createPreview(projectId: string, branch: string): Promise<Deployment>;
  promote(deploymentId: string): Promise<Deployment>;

  manageDomain(projectId: string, domain: string, action: 'add' | 'remove' | 'verify'): Promise<void>;
  manageEnvironment(projectId: string, variables: any[]): Promise<void>;
}
