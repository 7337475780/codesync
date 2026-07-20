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
  
  init(projectId?: string): Promise<void>;
  status(): Promise<GitFileChange[]>;
  stage(paths: string[]): Promise<void>;
  unstage(paths: string[]): Promise<void>;
  commit(message: string): Promise<string>;
  branches(): Promise<GitBranch[]>;
  history(): Promise<GitCommit[]>;
  checkout(branch: string): Promise<void>;
  clone(url: string, path: string, shallow?: boolean): Promise<void>;
  push(): Promise<void>;
  pull(): Promise<void>;
  merge(branch: string): Promise<void>;
  tags(): Promise<string[]>;
  diff(base?: string, head?: string): Promise<string>;
  cherryPick(commitHash: string): Promise<void>;
  stash(): Promise<void>;
  rebase(branch: string): Promise<void>;
  remotes(): Promise<any>;
  addRemote(name: string, url: string): Promise<void>;
  removeRemote(name: string): Promise<void>;
  blame(path: string): Promise<any>;
  conflicts(): Promise<string[]>;
  resolveConflict(file: string, resolution: 'current' | 'incoming'): Promise<void>;
  repositoryInfo(): Promise<any>;
  activity(): Promise<any>;
  aheadBehind(branch: string, remote?: string): Promise<{ahead: number, behind: number}>;
  health(): Promise<any>;
}
