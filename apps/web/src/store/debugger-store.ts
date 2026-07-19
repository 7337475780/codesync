import { create } from 'zustand';
import { Breakpoint, CallFrame, DebugVariable, WatchExpression, DebuggerState } from '@/lib/runtime/types/debugger';
import { nanoid } from 'nanoid';

interface DebuggerStoreState {
  state: DebuggerState;
  breakpoints: Breakpoint[];
  callStack: CallFrame[];
  variables: DebugVariable[];
  watchExpressions: WatchExpression[];
  consoleOutput: string[];
  setState: (s: DebuggerState) => void;
  addBreakpoint: (filePath: string, line: number) => void;
  removeBreakpoint: (id: string) => void;
  toggleBreakpoint: (id: string) => void;
  setCallStack: (frames: CallFrame[]) => void;
  setVariables: (vars: DebugVariable[]) => void;
  addWatchExpression: (expr: string) => void;
  removeWatchExpression: (id: string) => void;
  addConsoleOutput: (line: string) => void;
  clearConsole: () => void;
}

export const useDebuggerStore = create<DebuggerStoreState>((set) => ({
  state: 'idle',
  breakpoints: [
    { id: 'bp1', filePath: 'src/app/page.tsx', line: 12, enabled: true },
    { id: 'bp2', filePath: 'src/components/editor/panel-layout.tsx', line: 30, enabled: false },
  ],
  callStack: [],
  variables: [],
  watchExpressions: [],
  consoleOutput: [],
  setState: (state) => set({ state }),
  addBreakpoint: (filePath, line) => set((s) => ({
    breakpoints: [...s.breakpoints, { id: nanoid(), filePath, line, enabled: true }]
  })),
  removeBreakpoint: (id) => set((s) => ({ breakpoints: s.breakpoints.filter(b => b.id !== id) })),
  toggleBreakpoint: (id) => set((s) => ({
    breakpoints: s.breakpoints.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b)
  })),
  setCallStack: (callStack) => set({ callStack }),
  setVariables: (variables) => set({ variables }),
  addWatchExpression: (expression) => set((s) => ({
    watchExpressions: [...s.watchExpressions, { id: nanoid(), expression }]
  })),
  removeWatchExpression: (id) => set((s) => ({
    watchExpressions: s.watchExpressions.filter(w => w.id !== id)
  })),
  addConsoleOutput: (line) => set((s) => ({ consoleOutput: [...s.consoleOutput, line].slice(-200) })),
  clearConsole: () => set({ consoleOutput: [] }),
}));
