import { 
  GitProvider, 
  GithubAccount, 
  GithubOrganization, 
  Repository, 
  Branch, 
  Commit, 
  PullRequest, 
  Contributor 
} from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_ACCOUNT: GithubAccount = {
  id: 'usr_1',
  username: 'codesync-dev',
  avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CodeSync',
  email: 'dev@codesync.dev',
  isConnected: true,
  connectedAt: new Date().toISOString(),
};

const MOCK_ORGS: GithubOrganization[] = [
  { id: 'org_1', login: 'codesync-corp', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Corp', role: 'admin' },
  { id: 'org_2', login: 'open-source-contrib', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=OpenSource', role: 'member' }
];

const MOCK_REPOS: Repository[] = [
  {
    id: 'repo_1',
    name: 'codesync-core',
    fullName: 'codesync-corp/codesync-core',
    owner: { login: 'codesync-corp', avatarUrl: MOCK_ORGS[0].avatarUrl, type: 'Organization' },
    private: true,
    description: 'The core monorepo for CodeSync.',
    language: 'TypeScript',
    framework: 'Next.js',
    stargazersCount: 42,
    forksCount: 2,
    watchersCount: 15,
    openIssuesCount: 12,
    defaultBranch: 'main',
    pushedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: 'https://github.com/codesync-corp/codesync-core',
    deploymentStatus: 'success',
    syncStatus: 'synced',
  },
  {
    id: 'repo_2',
    name: 'landing-page',
    fullName: 'codesync-corp/landing-page',
    owner: { login: 'codesync-corp', avatarUrl: MOCK_ORGS[0].avatarUrl, type: 'Organization' },
    private: false,
    description: 'Public marketing site.',
    language: 'TypeScript',
    framework: 'Next.js',
    stargazersCount: 120,
    forksCount: 14,
    watchersCount: 45,
    openIssuesCount: 3,
    defaultBranch: 'main',
    pushedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    url: 'https://github.com/codesync-corp/landing-page',
    deploymentStatus: 'building',
    syncStatus: 'syncing',
  },
  {
    id: 'repo_3',
    name: 'auth-service',
    fullName: 'codesync-corp/auth-service',
    owner: { login: 'codesync-corp', avatarUrl: MOCK_ORGS[0].avatarUrl, type: 'Organization' },
    private: true,
    description: 'Go microservice for auth.',
    language: 'Go',
    framework: null,
    stargazersCount: 5,
    forksCount: 0,
    watchersCount: 2,
    openIssuesCount: 0,
    defaultBranch: 'master',
    pushedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    url: 'https://github.com/codesync-corp/auth-service',
    deploymentStatus: 'failed',
    syncStatus: 'out_of_sync',
  }
];

export class MockGitProvider implements GitProvider {
  async getAccount(): Promise<GithubAccount> {
    await delay(300);
    return MOCK_ACCOUNT;
  }

  async getOrganizations(): Promise<GithubOrganization[]> {
    await delay(300);
    return MOCK_ORGS;
  }

  async getRepositories(org?: string): Promise<Repository[]> {
    await delay(500);
    if (org) {
      return MOCK_REPOS.filter(r => r.owner.login === org);
    }
    return MOCK_REPOS;
  }

  async getRepository(fullName: string): Promise<Repository> {
    await delay(400);
    const repo = MOCK_REPOS.find(r => r.fullName === fullName);
    if (!repo) throw new Error('Repository not found');
    return repo;
  }

  async getBranches(fullName: string): Promise<Branch[]> {
    await delay(400);
    return [
      { name: 'main', commit: { sha: 'a1b2c3d', url: '' }, protected: true, isDefault: true },
      { name: 'feat/new-ui', commit: { sha: 'f1e2d3c', url: '' }, protected: false },
      { name: 'fix/auth-bug', commit: { sha: '9a8b7c6', url: '' }, protected: false },
    ];
  }

  async getCommits(fullName: string, branch?: string): Promise<Commit[]> {
    await delay(600);
    // Return mock commits
    return Array.from({ length: 20 }).map((_, i) => ({
      sha: `c${i}d${i * 2}e${i * 3}f4g5h6`.slice(0, 8),
      message: i === 0 ? 'feat: implement GitHub integration' : `fix: resolve issue #${100 - i}`,
      author: {
        name: i % 2 === 0 ? 'Alice Smith' : 'Bob Jones',
        email: i % 2 === 0 ? 'alice@codesync.dev' : 'bob@codesync.dev',
        date: new Date(Date.now() - i * 1000 * 60 * 60 * 2).toISOString(),
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${i % 2 === 0 ? 'Alice' : 'Bob'}`,
      },
      stats: { total: 10 + i * 2, additions: 8 + i, deletions: 2 + i },
      files: [{ filename: 'src/app/page.tsx', status: 'modified', additions: 8, deletions: 2, changes: 10 }],
      verified: i % 3 === 0,
    }));
  }

  async getPullRequests(fullName: string): Promise<PullRequest[]> {
    await delay(500);
    return [
      {
        id: 'pr_1',
        number: 42,
        title: 'Feature: New Dashboard layout',
        state: 'open',
        author: { login: 'alice-codesync', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        mergedAt: null,
        labels: [{ name: 'enhancement', color: '#a2eeef' }],
        mergeable: true,
        mergeableState: 'clean',
      },
      {
        id: 'pr_2',
        number: 41,
        title: 'Fix: Auth provider crash on logout',
        state: 'merged',
        author: { login: 'bob-codesync', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Bob' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        mergedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        labels: [{ name: 'bug', color: '#d73a4a' }],
        mergeable: null,
        mergeableState: 'unknown',
      }
    ];
  }

  async getContributors(fullName: string): Promise<Contributor[]> {
    await delay(400);
    return [
      { login: 'alice-codesync', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice', contributions: 142, linesChanged: 15400, reviews: 24, pullRequests: 12, status: 'online', activityScore: 92 },
      { login: 'bob-codesync', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Bob', contributions: 89, linesChanged: 8200, reviews: 15, pullRequests: 8, status: 'offline', activityScore: 75 },
    ];
  }
}

export const mockGitProvider = new MockGitProvider();
