import { GitProvider, GitFileChange, GitCommit, GitBranch } from '../types';

export class ServerGitProvider implements GitProvider {
  name = 'Server Git';
  projectId: string = '';

  async init(projectId?: string): Promise<void> {
    if (projectId) {
      this.projectId = projectId;
    }
  }

  private async fetchApi(endpoint: string, payload: any) {
    const res = await fetch(`/api/git${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: this.projectId, ...payload })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Git operation failed');
    return data;
  }

  async status(): Promise<GitFileChange[]> {
    const data = await this.fetchApi('', { action: 'status' });
    const statusResult = data.data;
    const changes: GitFileChange[] = [];
    
    statusResult.files.forEach((file: any) => {
      changes.push({
        path: file.path,
        status: file.index === 'A' ? 'added' : file.index === 'D' ? 'deleted' : file.index === 'M' ? 'modified' : 'untracked',
        staged: file.index !== ' ' && file.index !== '?'
      });
    });
    
    return changes;
  }

  async stage(paths: string[]): Promise<void> {}
  async unstage(paths: string[]): Promise<void> {}

  async commit(message: string): Promise<string> {
    const data = await this.fetchApi('/commit', { message, files: [] });
    return data.commit;
  }

  async branches(): Promise<GitBranch[]> {
    const data = await this.fetchApi('', { action: 'branches' });
    const branches = data.data.branches;
    return Object.keys(branches).map(name => ({
      name,
      isCurrent: branches[name].current,
      isRemote: name.startsWith('remotes/')
    }));
  }

  async history(): Promise<GitCommit[]> {
    const res = await fetch(`/api/git/history?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Git operation failed');
    return data.history.map((c: any) => ({
      hash: c.hash,
      message: c.message,
      author: c.author_name,
      email: c.author_email,
      timestamp: new Date(c.date).getTime()
    }));
  }

  async checkout(branch: string): Promise<void> {
    await this.fetchApi('', { action: 'checkout', payload: { branch } });
  }

  async clone(url: string, path: string, shallow?: boolean): Promise<void> {
    await this.fetchApi('/clone', { url, path, shallow });
  }

  async push(): Promise<void> {
    await this.fetchApi('/push', {});
  }

  async pull(): Promise<void> {
    await this.fetchApi('/pull', {});
  }

  async merge(branch: string): Promise<void> {
    await this.fetchApi('', { action: 'merge', payload: { branch } });
  }

  async tags(): Promise<string[]> {
    const data = await this.fetchApi('', { action: 'tags' });
    return data.data.all;
  }

  async diff(base?: string, head?: string): Promise<string> {
    if (base && head) {
      const res = await fetch(`/api/git/compare?projectId=${this.projectId}&base=${encodeURIComponent(base)}&head=${encodeURIComponent(head)}`);
      const data = await res.json();
      return data.diff;
    }
    const data = await this.fetchApi('', { action: 'diff' });
    return data.data;
  }

  async cherryPick(commitHash: string): Promise<void> {
    await this.fetchApi('', { action: 'cherry-pick', payload: { commitHash } });
  }

  async stash(): Promise<void> {
    await this.fetchApi('', { action: 'stash' });
  }

  async rebase(branch: string): Promise<void> {
    await this.fetchApi('', { action: 'rebase', payload: { branch } });
  }

  async remotes(): Promise<any> {
    const res = await fetch(`/api/git/remotes?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.remotes;
  }

  async addRemote(name: string, url: string): Promise<void> {
    await this.fetchApi('/remotes', { name, url });
  }

  async removeRemote(name: string): Promise<void> {
    const res = await fetch(`/api/git/remotes`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: this.projectId, name })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  }

  async blame(path: string): Promise<any> {
    const res = await fetch(`/api/git/blame?projectId=${this.projectId}&path=${encodeURIComponent(path)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.blame;
  }

  async conflicts(): Promise<string[]> {
    const res = await fetch(`/api/git/conflicts?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.conflicts;
  }

  async resolveConflict(file: string, resolution: 'current' | 'incoming'): Promise<void> {
    await this.fetchApi('/resolve', { file, resolution });
  }

  async repositoryInfo(): Promise<any> {
    const res = await fetch(`/api/git/repository?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.repository;
  }

  async activity(): Promise<any> {
    const res = await fetch(`/api/git/activity?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.activities;
  }

  async aheadBehind(branch: string, remote?: string): Promise<{ahead: number, behind: number}> {
    const url = `/api/git/ahead-behind?projectId=${this.projectId}&branch=${encodeURIComponent(branch)}${remote ? `&remote=${encodeURIComponent(remote)}` : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return { ahead: data.ahead, behind: data.behind };
  }

  async health(): Promise<any> {
    const res = await fetch(`/api/git/health?projectId=${this.projectId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.health;
  }
}
