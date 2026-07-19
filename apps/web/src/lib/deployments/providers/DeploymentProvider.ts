import { Deployment, Domain, EnvVar } from '@/store/deployment-store';

export interface DeploymentProvider {
  deploy(projectId: string, branch: string): Promise<Deployment>;
  cancel(deploymentId: string): Promise<void>;
  rollback(deploymentId: string): Promise<void>;
  streamLogs(deploymentId: string, onLine: (line: string) => void): () => void;
  createPreview(branch: string): Promise<Deployment>;
  promote(deploymentId: string): Promise<void>;
  addDomain(domain: Omit<Domain, 'id' | 'createdAt' | 'status' | 'ssl'>): Promise<Domain>;
  removeDomain(id: string): Promise<void>;
  addEnvVar(envVar: Omit<EnvVar, 'id' | 'createdAt'>): Promise<EnvVar>;
  removeEnvVar(id: string): Promise<void>;
}
