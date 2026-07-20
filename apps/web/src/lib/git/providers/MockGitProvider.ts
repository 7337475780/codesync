import { GitProvider, GitFileChange, GitCommit, GitBranch } from '../types';

export class MockGitProvider implements GitProvider {
  name = 'Mock Git';
  
  private files: GitFileChange[] = [
    { path: 'src/app/page.tsx', status: 'modified', staged: false },
    { path: 'src/components/button.tsx', status: 'modified', staged: true },
    { path: 'package.json', status: 'modified', staged: false },
    { path: 'src/utils/helpers.ts', status: 'untracked', staged: false },
    { path: 'src/styles/globals.css', status: 'added', staged: true }
  ];
  
  private commits: GitCommit[] = [
    { hash: 'a1b2c3d', message: 'Initial commit', author: 'User', email: 'user@example.com', timestamp: Date.now() - 86400000 }
  ];

  async init(): Promise<void> {
    return Promise.resolve();
  }

  async status(): Promise<GitFileChange[]> {
    return [...this.files];
  }

  async stage(paths: string[]): Promise<void> {
    this.files = this.files.map(f => 
      paths.includes(f.path) ? { ...f, staged: true } : f
    );
  }

  async unstage(paths: string[]): Promise<void> {
    this.files = this.files.map(f => 
      paths.includes(f.path) ? { ...f, staged: false } : f
    );
  }

  async commit(message: string): Promise<string> {
    const stagedFiles = this.files.filter(f => f.staged);
    if (stagedFiles.length === 0) {
      throw new Error("Nothing to commit");
    }
    
    // Remove staged files from tracking list (simulating they are now clean)
    this.files = this.files.filter(f => !f.staged);
    
    const hash = Math.random().toString(16).substr(2, 7);
    this.commits.unshift({
      hash,
      message,
      author: 'User',
      email: 'user@example.com',
      timestamp: Date.now()
    });
    
    return hash;
  }

  async branches(): Promise<GitBranch[]> {
    return [
      { name: 'main', isCurrent: true, isRemote: false },
      { name: 'feature/auth', isCurrent: false, isRemote: false }
    ];
  }

  async history(): Promise<GitCommit[]> {
    return [...this.commits];
  }

  async checkout(branch: string): Promise<void> {
    return Promise.resolve();
  }
  
  async clone(url: string, path: string, shallow?: boolean): Promise<void> { return Promise.resolve(); }
  async push(): Promise<void> { return Promise.resolve(); }
  async pull(): Promise<void> { return Promise.resolve(); }
  async merge(branch: string): Promise<void> { return Promise.resolve(); }
  async tags(): Promise<string[]> { return []; }
  async diff(base?: string, head?: string): Promise<string> { return ''; }
  async cherryPick(commitHash: string): Promise<void> { return Promise.resolve(); }
  async stash(): Promise<void> { return Promise.resolve(); }
  async rebase(branch: string): Promise<void> { return Promise.resolve(); }

  async remotes(): Promise<any> { return []; }
  async addRemote(name: string, url: string): Promise<void> { return Promise.resolve(); }
  async removeRemote(name: string): Promise<void> { return Promise.resolve(); }
  async blame(path: string): Promise<any> { return []; }
  async conflicts(): Promise<string[]> { return []; }
  async resolveConflict(file: string, resolution: 'current' | 'incoming'): Promise<void> { return Promise.resolve(); }
  async repositoryInfo(): Promise<any> { return {}; }
  async activity(): Promise<any> { return []; }
  async aheadBehind(branch: string, remote?: string): Promise<{ahead: number, behind: number}> { return { ahead: 0, behind: 0 }; }
  async health(): Promise<any> { return {}; }

  // Method just for mocking local edits from the UI
  mockEditFile(path: string) {
    const existing = this.files.find(f => f.path === path);
    if (!existing) {
      this.files.push({ path, status: 'modified', staged: false });
    } else if (existing.staged) {
      // If it's staged and we edit it again, we might want both a staged and unstaged version. 
      // For simplicity, we just mark it unstaged or keep it as is.
    }
  }
}
