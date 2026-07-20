import os from 'os';
import fs from 'fs';
import path from 'path';

export interface TerminalSession {
  ptyProcess: any;
  outputBuffer: string;
  cwd: string;
  command: string;
  args: string[];
}

class ServerTerminalManager {
  private terminals = new Map<string, TerminalSession>();

  private getDefaultShell(): string {
    if (os.platform() === "win32") {
      return process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe";
    }
    return process.env.SHELL || "/bin/bash";
  }

  createTerminal(id: string, cwd: string = process.cwd(), cols: number = 80, rows: number = 24): void {
    if (this.terminals.has(id)) {
      this.killTerminal(id);
    }

    let workingDir = path.resolve(cwd);

    if (!fs.existsSync(workingDir)) {
      try {
        fs.mkdirSync(workingDir, { recursive: true });
      } catch (e) {
        console.error("Failed to create working directory:", e);
      }
    }

    if (!fs.existsSync(workingDir)) {
      throw new Error(`Working directory does not exist: ${workingDir}`);
    }

    const shell = this.getDefaultShell();
    const args = shell.includes('powershell') ? ['-NoLogo'] : [];

    let pty;
    try {
      pty = require('node-pty');
    } catch (e) {
      console.warn('node-pty not available, using mock fallback', e);
      pty = {
        spawn: () => ({
          onData: (cb: any) => { 
            setTimeout(() => cb('\x1b[31mTerminal unavailable: node-pty native module not built.\x1b[0m\r\n'), 100); 
          },
          onExit: (cb: any) => {},
          write: () => {},
          resize: () => {},
          kill: () => {},
        })
      };
    }

    const spawnEnv = process.env as any;

    console.log({
      shell,
      cwd: workingDir,
      exists: fs.existsSync(workingDir),
      cols,
      rows,
    });

    let ptyProcess;
    try {
      ptyProcess = pty.spawn(shell, args, {
        name: 'xterm-256color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: workingDir,
        env: spawnEnv,
        useConpty: true
      });
    } catch (err) {
      console.error("PTY Spawn Failed", {
        shell,
        cwd: workingDir,
        exists: fs.existsSync(workingDir),
        error: err,
      });
      throw err;
    }

    const session: TerminalSession = {
      ptyProcess,
      outputBuffer: '',
      cwd: workingDir,
      command: shell,
      args: []
    };

    ptyProcess.onData((data: string) => {
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
