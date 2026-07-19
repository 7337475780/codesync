import { create } from 'zustand';
import type { Project } from '@prisma/client'; // Note: Prisma types must be exported from DB or we mock them for UI

export interface ProjectState {
  projects: Partial<Project>[];
  activeProjectId: string | null;
  isLoading: boolean;
  setProjects: (projects: Partial<Project>[]) => void;
  setActiveProject: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  activeProjectId: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  setActiveProject: (id) => set({ activeProjectId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
