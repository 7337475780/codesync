import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const res = await fetch('/api/workspaces');
      if (!res.ok) throw new Error('Failed to fetch workspaces');
      const data = await res.json();
      return data.workspaces;
    }
  });
}

export function useWorkspace(id: string) {
  return useQuery({
    queryKey: ['workspaces', id],
    queryFn: async () => {
      const res = await fetch(`/api/workspaces/${id}`);
      if (!res.ok) throw new Error('Failed to fetch workspace');
      const data = await res.json();
      return data.workspace;
    },
    enabled: !!id
  });
}
