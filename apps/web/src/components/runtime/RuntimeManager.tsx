import React, { useEffect } from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { useProcessStore } from '@/store/process-store';
import { usePortsStore } from '@/store/ports-store';
import { useTasksStore } from '@/store/tasks-store';
import { MockRuntimeProvider } from '@/lib/runtime/providers/MockRuntimeProvider';

export function RuntimeManager() {
  const { provider, setProvider, setInfo, addMetrics } = useRuntimeStore();
  const { setProcesses } = useProcessStore();
  const { setPorts } = usePortsStore();
  const { setTasks } = useTasksStore();

  useEffect(() => {
    if (provider) return;

    const mock = new MockRuntimeProvider();
    setProvider(mock);

    mock.getInfo().then(setInfo);
    mock.listProcesses().then(setProcesses);
    mock.listPorts().then(setPorts);
    mock.listTasks().then(setTasks);

    const stopMetrics = mock.streamMetrics(addMetrics);
    return () => stopMetrics();
  }, [provider, setProvider, setInfo, addMetrics, setProcesses, setPorts, setTasks]);

  return null;
}
