export interface BuildConfiguration {
  id: string;
  projectId: string;
  framework: 'nextjs' | 'react' | 'vite' | 'vue' | 'angular' | 'node' | 'docker' | 'static' | 'other';
  buildCommand: string | null;
  outputDirectory: string | null;
  installCommand: string | null;
  nodeVersion: string;
  autoDeploy: boolean;
  deployBranches: string[];
}
