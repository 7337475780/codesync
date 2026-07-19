export type DebuggerState = 'idle' | 'running' | 'paused' | 'stopped';

export interface Breakpoint {
  id: string;
  filePath: string;
  line: number;
  enabled: boolean;
  condition?: string;
  hitCount?: number;
}

export interface CallFrame {
  id: string;
  functionName: string;
  filePath: string;
  line: number;
  column: number;
}

export interface DebugVariable {
  name: string;
  value: string;
  type: string;
  children?: DebugVariable[];
  expandable?: boolean;
}

export interface WatchExpression {
  id: string;
  expression: string;
  value?: string;
  error?: string;
}
