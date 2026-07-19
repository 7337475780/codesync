export type GitFileStatus = 'modified' | 'added' | 'deleted' | 'renamed' | 'untracked' | 'ignored' | 'conflict';

export interface GitFileChange {
  path: string;
  originalPath?: string;
  status: GitFileStatus;
  staged: boolean;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  email: string;
  timestamp: number;
}

export interface GitBranch {
  name: string;
  isCurrent: boolean;
  isRemote: boolean;
}

export interface GitProvider {
  name: string;
  
  init(): Promise<void>;
  status(): Promise<GitFileChange[]>;
  stage(paths: string[]): Promise<void>;
  unstage(paths: string[]): Promise<void>;
  commit(message: string): Promise<string>;
  branches(): Promise<GitBranch[]>;
  history(): Promise<GitCommit[]>;
  checkout(branch: string): Promise<void>;
}
