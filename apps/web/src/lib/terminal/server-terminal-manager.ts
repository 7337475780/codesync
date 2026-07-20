import * as pty from 'node-pty';
import os from 'os';

export interface TerminalSession {
  ptyProcess: pty.IPty;
  outputBuffer: string;
  cwd: string;
  command: string;
  args: string[];
}

class ServerTerminalManager {
  private terminals = new Map<string, TerminalSession>();

  private getDefaultShell(): string {
    if (os.platform() === 'win32') {
      return 'cmd.exe';
    }
    return process.env.SHELL || 'bash';
  }

  createTerminal(id: string, cwd: string = process.cwd(), cols: number = 80, rows: number = 24): void {
    if (this.terminals.has(id)) {
      this.killTerminal(id);
    }

    const shell = this.getDefaultShell();
    const args = shell.includes('powershell') ? ['-NoLogo'] : [];

    const ptyProcess = pty.spawn(shell, args, {
      name: 'xterm-color',
      cols: cols || 80,
      rows: rows || 24,
      cwd: cwd,
      env: process.env as any,
      useConpty: true
    });

    const session: TerminalSession = {
      ptyProcess,
      outputBuffer: '',
      cwd,
      command: shell,
      args: []
    };

    ptyProcess.onData((data) => {
      session.outputBuffer += data;
    });

    ptyProcess.onExit(() => {
      this.terminals.delete(id);
    });

    this.terminals.set(id, session);
  }

  writeToTerminal(id: string, data: string): void {
    const session = this.terminals.get(id);
    if (session) {
      session.ptyProcess.write(data);
    } else {
      throw new Error(`Terminal ${id} not found`);
    }
  }

  readTerminalOutput(id: string): string {
    const session = this.terminals.get(id);
    if (session) {
      const output = session.outputBuffer;
      session.outputBuffer = ''; // Clear buffer after reading
      return output;
    }
    throw new Error(`Terminal ${id} not found`);
  }

  resizeTerminal(id: string, cols: number, rows: number): void {
    const session = this.terminals.get(id);
    if (session) {
      session.ptyProcess.resize(cols, rows);
    } else {
      throw new Error(`Terminal ${id} not found`);
    }
  }

  killTerminal(id: string): void {
    const session = this.terminals.get(id);
    if (session) {
      session.ptyProcess.kill();
      this.terminals.delete(id);
    }
  }

  hasTerminal(id: string): boolean {
    return this.terminals.has(id);
  }
}

// Global instance to persist across API requests during development
const globalForTerminal = global as unknown as { terminalManager: ServerTerminalManager };
export const terminalManager = globalForTerminal.terminalManager || new ServerTerminalManager();

if (process.env.NODE_ENV !== 'production') {
  globalForTerminal.terminalManager = terminalManager;
}
