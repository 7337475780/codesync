import React, { useEffect } from 'react';
import { useRuntimeStore } from '@/store/runtime-store';
import { useProcessStore } from '@/store/process-store';
import { usePortsStore } from '@/store/ports-store';
import { useTasksStore } from '@/store/tasks-store';
import { ServerRuntimeProvider } from '@/lib/runtime/providers/ServerRuntimeProvider';

export function RuntimeManager() {
  const { provider, setProvider, setInfo, addMetrics } = useRuntimeStore();
  const { setProcesses } = useProcessStore();
  const { setPorts } = usePortsStore();
  const { setTasks } = useTasksStore();

  useEffect(() => {
    if (provider) return;

    const serverProvider = new ServerRuntimeProvider('default');
    setProvider(serverProvider);

    serverProvider.getInfo().then(setInfo).catch(() => {});
    serverProvider.listProcesses().then(setProcesses).catch(() => {});
    serverProvider.listPorts().then(setPorts).catch(() => {});
    serverProvider.listTasks().then(setTasks).catch(() => {});

    const stopMetrics = serverProvider.streamMetrics(addMetrics);
    return () => stopMetrics();
  }, [provider, setProvider, setInfo, addMetrics, setProcesses, setPorts, setTasks]);

  return null;
}
