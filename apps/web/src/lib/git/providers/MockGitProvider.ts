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
