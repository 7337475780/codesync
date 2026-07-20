export class ServerTerminalProvider {
  name = 'Server Terminal';
  private terminalId: string | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private onDataCallback?: (data: string) => void;
  private pendingResize: { cols: number, rows: number } | null = null;
  private projectId: string;

  constructor(projectId: string) {
    this.projectId = projectId;
  }

  async start(cols: number, rows: number): Promise<void> {
    const res = await fetch('/api/terminal/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cols, rows, projectId: this.projectId })
    });
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API did not return JSON. The server might be compiling or encountered an error.');
    }
    
    const data = await res.json();
    
    if (res.ok) {
      this.terminalId = data.terminalId;
      if (this.pendingResize) {
        this.resize(this.pendingResize.cols, this.pendingResize.rows);
        this.pendingResize = null;
      }
      this.startPolling();
    } else {
      throw new Error(data.error || 'Failed to create terminal');
    }
  }

  private startPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    
    this.pollInterval = setInterval(async () => {
      if (!this.terminalId) return;
      
      try {
        const res = await fetch(`/api/terminal/output?terminalId=${this.terminalId}`);
        const contentType = res.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (res.ok && data.output && this.onDataCallback) {
            this.onDataCallback(data.output);
          }
        }
      } catch (err) {
        // Ignore poll errors, terminal might be closed or network hiccup
      }
    }, 100);
  }

  onData(cb: (data: string) => void) {
    this.onDataCallback = cb;
  }

  async write(data: string): Promise<void> {
    if (!this.terminalId) return;
    
    await fetch('/api/terminal/input', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terminalId: this.terminalId, data })
    });
  }

  async resize(cols: number, rows: number): Promise<void> {
    if (!this.terminalId) {
      this.pendingResize = { cols, rows };
      return;
    }
    
    await fetch('/api/terminal/resize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terminalId: this.terminalId, cols, rows })
    });
  }

  async kill(): Promise<void> {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    
    if (this.terminalId) {
      await fetch('/api/terminal/kill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terminalId: this.terminalId })
      });
      this.terminalId = null;
    }
  }

  dispose() {
    this.kill();
  }
}
