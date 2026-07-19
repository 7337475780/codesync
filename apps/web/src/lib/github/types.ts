export interface GithubAccount {
  id: string;
  username: string;
  avatarUrl: string;
  email: string;
  isConnected: boolean;
  connectedAt?: string;
}

export interface GithubOrganization {
  id: string;
  login: string;
  avatarUrl: string;
  description?: string;
  role: 'admin' | 'member';
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  owner: {
    login: string;
    avatarUrl: string;
    type: 'User' | 'Organization';
  };
  private: boolean;
  description: string | null;
  language: string | null;
  framework: string | null;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  defaultBranch: string;
  pushedAt: string;
  updatedAt: string;
  url: string;
  deploymentStatus: 'success' | 'building' | 'failed' | 'none';
  syncStatus: 'synced' | 'syncing' | 'failed' | 'out_of_sync';
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  isDefault?: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
    avatarUrl?: string;
  };
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
  files: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
  }[];
  verified: boolean;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  state: 'open' | 'closed' | 'merged';
  author: {
    login: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  mergedAt: string | null;
  labels: { name: string; color: string }[];
  mergeable: boolean | null;
  mergeableState: 'clean' | 'dirty' | 'unstable' | 'unknown';
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  contributions: number;
  linesChanged: number;
  reviews: number;
  pullRequests: number;
  status: 'online' | 'offline';
  activityScore: number; // 0-100
}

export interface GitProvider {
  getAccount(): Promise<GithubAccount>;
  getOrganizations(): Promise<GithubOrganization[]>;
  getRepositories(org?: string): Promise<Repository[]>;
  getRepository(fullName: string): Promise<Repository>;
  getBranches(fullName: string): Promise<Branch[]>;
  getCommits(fullName: string, branch?: string): Promise<Commit[]>;
  getPullRequests(fullName: string): Promise<PullRequest[]>;
  getContributors(fullName: string): Promise<Contributor[]>;
}
