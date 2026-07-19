export type DeploymentStatus = 
  | 'QUEUED' 
  | 'BUILDING' 
  | 'DEPLOYING' 
  | 'READY' 
  | 'ERROR' 
  | 'CANCELED' 
  | 'ROLLING_BACK';

export type DeploymentEnvironment = 'production' | 'preview' | 'development';

export interface Deployment {
  id: string;
  projectId: string;
  url: string | null;
  status: DeploymentStatus;
  environment: DeploymentEnvironment;
  commitSha: string | null;
  commitMessage: string | null;
  branch: string | null;
  authorName: string | null;
  authorEmail: string | null;
  createdAt: string;
  buildingAt: string | null;
  readyAt: string | null;
  errorAt: string | null;
  errorMessage: string | null;
  buildDuration: number | null; // in seconds
  deployDuration: number | null; // in seconds
  provider: 'vercel' | 'railway' | 'netlify' | 'docker' | 'mock';
  version: string;
}

export interface DeploymentLog {
  id: string;
  deploymentId: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  source: 'build' | 'deploy' | 'runtime';
}
