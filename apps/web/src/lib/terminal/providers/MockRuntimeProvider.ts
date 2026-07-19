import { RuntimeProvider, RuntimeMetrics, TerminalState } from '../types';

export class MockRuntimeProvider implements RuntimeProvider {
  name = 'Mock Runtime';
  private state: TerminalState = 'idle';
  private cwd = '/home/user/project';
  private currentProcessTimeout?: NodeJS.Timeout;
  private onDataCallback?: (data: string) => void;

  async start(): Promise<void> {
    this.state = 'idle';
  }

  async stop(): Promise<void> {
    this.state = 'disconnected';
    if (this.currentProcessTimeout) {
      clearTimeout(this.currentProcessTimeout);
    }
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  async execute(command: string, onData: (data: string) => void): Promise<void> {
    this.onDataCallback = onData;
    this.state = 'running';
    
    // Echo the command
    onData(`\r\n\x1b[32muser@codesync\x1b[0m:\x1b[34m${this.cwd}\x1b[0m$ ${command}\r\n`);
    
    const args = command.trim().split(/\s+/);
    const cmd = args[0];
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    switch (cmd) {
      case 'pwd':
        onData(`${this.cwd}\r\n`);
        break;
      case 'ls':
        onData(`src  public  package.json  tsconfig.json  README.md\r\n`);
        break;
      case 'cd':
        const target = args[1] || '/home/user';
        if (target.startsWith('/')) {
          this.cwd = target;
        } else {
          this.cwd = `${this.cwd}/${target}`.replace(/\/\//g, '/');
        }
        break;
      case 'npm':
      case 'pnpm':
        if (args[1] === 'install' || args[1] === 'i') {
          onData(`Installing dependencies...\r\n`);
          for (let i = 0; i <= 100; i += 20) {
            onData(`[${i}%] Resolving packages...\r\n`);
            await new Promise(r => setTimeout(r, 200));
          }
          onData(`\x1b[32mSuccessfully installed packages.\x1b[0m\r\n`);
        } else if (args[1] === 'run' || args[1] === 'dev') {
          onData(`\x1b[36m> codesync@0.1.0 dev\x1b[0m\r\n`);
          onData(`\x1b[36m> next dev\x1b[0m\r\n\r\n`);
          onData(`  ▲ Next.js 14.0.0\r\n`);
          onData(`  - Local:        http://localhost:3000\r\n\r\n`);
          onData(` ✓ Ready in 1250ms\r\n`);
          // Stay running
          return;
        } else {
          onData(`Usage: ${cmd} <command>\r\n`);
        }
        break;
      case 'clear':
        onData('\x1b[2J\x1b[3J\x1b[H');
        break;
      case 'echo':
        onData(`${args.slice(1).join(' ')}\r\n`);
        break;
      case '':
        break;
      default:
        onData(`\x1b[31m${cmd}: command not found\x1b[0m\r\n`);
        break;
    }
    
    this.state = 'idle';
    // Print next prompt
    this.printPrompt();
  }
  
  printPrompt() {
    if (this.onDataCallback) {
      this.onDataCallback(`\x1b[32muser@codesync\x1b[0m:\x1b[34m${this.cwd}\x1b[0m$ `);
    }
  }

  async kill(pid?: number): Promise<void> {
    if (this.currentProcessTimeout) {
      clearTimeout(this.currentProcessTimeout);
    }
    this.state = 'idle';
    if (this.onDataCallback) {
      this.onDataCallback(`\r\n\x1b[31m^C\x1b[0m\r\n`);
      this.printPrompt();
    }
  }

  resize(cols: number, rows: number): void {
    // Mock resize logic
  }

  getStatus(): TerminalState {
    return this.state;
  }

  async getMetrics(): Promise<RuntimeMetrics> {
    return {
      cpu: Math.random() * 20,
      memory: 256 + Math.random() * 512,
      network: Math.random() * 10,
      disk: 1024,
      processes: 5 + Math.floor(Math.random() * 5),
      uptime: Date.now()
    };
  }
}
