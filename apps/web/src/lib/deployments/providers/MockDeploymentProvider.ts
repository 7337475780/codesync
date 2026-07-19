import { DeploymentProvider } from './DeploymentProvider';
import { Deployment, Domain, EnvVar } from '@/store/deployment-store';
import { nanoid } from 'nanoid';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const MOCK_LOG_LINES = [
  '[00:00] Cloning repository...',
  '[00:01] Installing dependencies with pnpm...',
  '[00:03] Running tests...',
  '[00:04] ✓ All tests passed (23 passed, 0 failed)',
  '[00:05] Building Next.js application...',
  '[00:08] ✓ Compiled successfully',
  '[00:09] Collecting page data...',
  '[00:10] Generating static pages...',
  '[00:11] ✓ Build completed in 6.2s',
  '[00:12] Optimizing bundle...',
  '[00:13] Uploading build artifacts...',
  '[00:14] Assigning domains...',
  '[00:15] ✓ Deployment live at https://codesync.dev',
];

export class MockDeploymentProvider implements DeploymentProvider {
  async deploy(projectId: string, branch: string): Promise<Deployment> {
    await delay(400);
    return {
      id: `dpl_${nanoid(8)}`,
      projectId,
      status: 'BUILDING',
      environment: branch === 'main' ? 'Production' : 'Preview',
      url: branch === 'main' ? 'codesync.dev' : `${branch.replace(/\//g, '-')}-codesync.vercel.app`,
      branch,
      commitMessage: `chore: manual deploy from ${branch}`,
      commitHash: nanoid(7),
      creator: { name: 'You', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=You' },
      createdAt: new Date().toISOString(),
      buildingAt: new Date().toISOString(),
    };
  }

  async cancel(deploymentId: string): Promise<void> { await delay(200); }
  async rollback(deploymentId: string): Promise<void> { await delay(600); }

  streamLogs(deploymentId: string, onLine: (line: string) => void): () => void {
    let cancelled = false;
    (async () => {
      for (const line of MOCK_LOG_LINES) {
        if (cancelled) break;
        await delay(600 + Math.random() * 400);
        onLine(line);
      }
    })();
    return () => { cancelled = true; };
  }

  async createPreview(branch: string): Promise<Deployment> {
    return this.deploy('prj_1', branch);
  }

  async promote(deploymentId: string): Promise<void> { await delay(500); }

  async addDomain(domain: Omit<Domain, 'id' | 'createdAt' | 'status' | 'ssl'>): Promise<Domain> {
    return { ...domain, id: `dom_${nanoid()}`, status: 'Pending', ssl: 'Pending', createdAt: new Date().toISOString() };
  }

  async removeDomain(id: string): Promise<void> { await delay(200); }

  async addEnvVar(envVar: Omit<EnvVar, 'id' | 'createdAt'>): Promise<EnvVar> {
    return { ...envVar, id: `env_${nanoid()}`, createdAt: new Date().toISOString() };
  }

  async removeEnvVar(id: string): Promise<void> { await delay(200); }
}
