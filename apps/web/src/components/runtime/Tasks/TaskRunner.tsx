import React from 'react';
import { useTasksStore } from '@/store/tasks-store';
import { useRuntimeStore } from '@/store/runtime-store';
import { Play, Square, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Task } from '@/lib/runtime/types/task';
import { cn } from '@codesync/ui/utils/cn';

function TaskStatusIcon({ status }: { status: Task['status'] }) {
  switch (status) {
    case 'running': return <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />;
    case 'success': return <CheckCircle className="w-3.5 h-3.5 text-green-400" />;
    case 'failed': return <XCircle className="w-3.5 h-3.5 text-red-400" />;
    default: return <Clock className="w-3.5 h-3.5 text-gray-500" />;
  }
}

function TaskCard({ task }: { task: Task }) {
  const { provider } = useRuntimeStore();
  const { updateTask, appendTaskOutput } = useTasksStore();

  const runTask = async () => {
    if (!provider) return;
    updateTask(task.id, { status: 'running', output: [], startedAt: Date.now() });
    await provider.runTask(task.id, (line) => appendTaskOutput(task.id, line));
    updateTask(task.id, { status: 'success', finishedAt: Date.now() });
  };

  const duration = task.finishedAt && task.startedAt ? ((task.finishedAt - task.startedAt) / 1000).toFixed(1) : null;

  return (
    <div className={cn('flex items-center gap-3 px-3 py-2 rounded-md border border-[#2d2d2d] bg-[#252526] hover:bg-[#2a2a2a] transition-colors', task.isFavorite && 'border-yellow-500/30')}>
      <TaskStatusIcon status={task.status} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-200">{task.name}</span>
          {task.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
        </div>
        <span className="text-[11px] text-gray-500 font-mono">{task.command}</span>
        {task.output.length > 0 && <div className="text-[10px] text-gray-600 mt-1 font-mono truncate">{task.output[task.output.length - 1]}</div>}
      </div>
      {duration && <span className="text-[10px] text-gray-500 shrink-0">{duration}s</span>}
      <div className="flex items-center gap-1 shrink-0">
        {task.status !== 'running' ? (
          <button onClick={runTask} className="p-1 text-gray-400 hover:text-green-400 rounded hover:bg-white/10" title="Run"><Play className="w-3.5 h-3.5" /></button>
        ) : (
          <button onClick={() => { provider?.cancelTask(task.id); updateTask(task.id, { status: 'cancelled' }); }} className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10" title="Cancel"><Square className="w-3.5 h-3.5" /></button>
        )}
      </div>
    </div>
  );
}

export function TaskRunner() {
  const { tasks } = useTasksStore();
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Tasks</span>
      {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      {tasks.length === 0 && <div className="text-center text-gray-500 text-sm py-6">No tasks configured</div>}
    </div>
  );
}
