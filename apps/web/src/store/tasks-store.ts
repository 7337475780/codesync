import { create } from 'zustand';
import { Task } from '@/lib/runtime/types/task';

interface TasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (id: string, update: Partial<Task>) => void;
  appendTaskOutput: (id: string, line: string) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTask: (id, update) => set((s) => ({
    tasks: s.tasks.map(t => t.id === id ? { ...t, ...update } : t),
  })),
  appendTaskOutput: (id, line) => set((s) => ({
    tasks: s.tasks.map(t => t.id === id ? { ...t, output: [...t.output, line] } : t),
  })),
}));
